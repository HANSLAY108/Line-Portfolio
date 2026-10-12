type ImagePlaceholderProps = {
  label?: string;
  className?: string;
  aspect?: string;
};

export default function ImagePlaceholder({
  label = "Image placeholder",
  className = "",
  aspect,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8e4df] via-[#d9d4ce] to-[#cfc8c0] ${aspect ?? ""} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-8 top-6 h-40 w-40 rounded-full bg-white/50 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[#b8a99a]/40 blur-2xl" />
      </div>
      <span className="relative z-10 px-4 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a8178]">
        {label}
      </span>
    </div>
  );
}
