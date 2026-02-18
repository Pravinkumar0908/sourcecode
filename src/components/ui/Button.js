import Link from "next/link";

const variants = {
  primary: {
    background: "linear-gradient(135deg, #facc15, #f472b6, #ffffff)",
    color: "#000",
  },
  secondary: {
    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
  },
  outline: {
    background: "transparent",
    border: "1px solid rgba(250,204,21,0.3)",
    color: "#facc15",
  },
  ghost: {
    background: "transparent",
    color: "rgba(255,255,255,0.7)",
  },
};

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  size = "md",
  ...props
}) {
  const sizeClass =
    size === "sm"
      ? "px-4 py-2 text-xs"
      : size === "lg"
      ? "px-8 py-3.5 text-base"
      : "px-6 py-2.5 text-sm";

  const baseClass = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${sizeClass} ${className}`;

  const style = variants[variant] || variants.primary;

  if (href) {
    return (
      <Link href={href} className={baseClass} style={style} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClass} style={style} {...props}>
      {children}
    </button>
  );
}
