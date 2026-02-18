export default function Loader({ size = "md" }) {
  const sizeClass = size === "sm" ? "w-5 h-5" : size === "lg" ? "w-10 h-10" : "w-7 h-7";

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClass} rounded-full border-2 border-transparent animate-spin`}
        style={{
          borderTopColor: "#facc15",
          borderRightColor: "#ec4899",
        }}
      />
    </div>
  );
}
