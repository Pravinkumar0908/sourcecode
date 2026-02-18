"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../lib/helpers";

export default function BuyButton({ productId, productName, price }) {
  const [loading, setLoading] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { createClient } = await import("../../lib/supabase/client");
        const supabase = createClient();
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);
      } catch {}
      setCheckingAuth(false);
    }
    checkAuth();
  }, []);

  const handleBuy = async () => {
    setError("");

    // If not logged in, redirect to login
    if (!user) {
      router.push(`/login?redirectTo=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setPurchased(true);
          setError("");
        } else {
          setError(data.error || "Purchase failed. Please try again.");
        }
        setLoading(false);
        return;
      }

      setPurchased(true);
      // Redirect to purchases page after short delay
      setTimeout(() => {
        router.push("/dashboard/purchases");
        router.refresh();
      }, 1500);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      {error && (
        <div
          className="rounded-xl px-4 py-3 text-sm text-red-300 border border-red-500/20"
          style={{ background: "rgba(239,68,68,0.08)" }}
        >
          {error}
        </div>
      )}

      {purchased ? (
        <div
          className="w-full py-4 rounded-2xl text-base font-bold text-center text-green-400 border border-green-400/20"
          style={{ background: "rgba(74,222,128,0.08)" }}
        >
          ✓ Already Purchased — Go to{" "}
          <button
            onClick={() => router.push("/dashboard/purchases")}
            className="underline hover:text-green-300 transition-colors"
          >
            My Purchases
          </button>
        </div>
      ) : (
        <button
          onClick={handleBuy}
          disabled={loading || checkingAuth}
          className="w-full py-4 rounded-2xl text-base font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: "linear-gradient(135deg, #facc15, #f472b6, #ffffff)",
          }}
        >
          {checkingAuth
            ? "Loading..."
            : loading
            ? "Processing..."
            : !user
            ? `Login to Buy — ${formatPrice(price)}`
            : `Buy Now — ${formatPrice(price)}`}
        </button>
      )}
    </div>
  );
}
