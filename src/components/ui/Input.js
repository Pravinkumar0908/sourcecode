import { glassInput } from "../../styles/theme";

export default function Input({
  label,
  type = "text",
  placeholder,
  className = "",
  textarea = false,
  ...props
}) {
  const inputClass = `w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all duration-300 ${className}`;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-white/60">{label}</label>
      )}
      {textarea ? (
        <textarea
          className={inputClass}
          style={glassInput}
          placeholder={placeholder}
          rows={5}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={inputClass}
          style={glassInput}
          placeholder={placeholder}
          {...props}
        />
      )}
    </div>
  );
}
