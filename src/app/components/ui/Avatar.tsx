import { ImageWithFallback } from "../figma/ImageWithFallback";
import { BadgeCheck } from "lucide-react";

interface AvatarProps {
  src: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  verified?: boolean;
  openToWork?: boolean;
  className?: string;
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-24 h-24",
};

export function Avatar({ src, name, size = "md", verified, openToWork, className = "" }: AvatarProps) {
  const dim = size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 56 : 96;

  return (
    <div className={`relative shrink-0 ${className}`}>
      {openToWork && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(#00C853 0deg, #00C853 270deg, transparent 270deg, transparent 360deg)",
            padding: size === "xl" ? 3 : 2,
            zIndex: 1,
          }}
        >
          <div className="w-full h-full rounded-full bg-white" />
        </div>
      )}
      <ImageWithFallback
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-white relative z-[2]`}
      />
      {openToWork && (
        <div
          className={`absolute z-[3] bg-[#00C853] text-white text-center rounded-full flex items-center justify-center ${
            size === "xl"
              ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 px-2 py-0.5 text-[9px]"
              : size === "lg"
              ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 px-1.5 py-px text-[8px]"
              : "-bottom-1 left-1/2 -translate-x-1/2 px-1 py-px text-[7px]"
          }`}
          style={{ fontWeight: 700, letterSpacing: "0.02em" }}
        >
          #OpenToWork
        </div>
      )}
      {verified && !openToWork && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-px z-[3]">
          <BadgeCheck className={`${size === "xl" ? "w-6 h-6" : size === "lg" ? "w-5 h-5" : "w-4 h-4"} text-primary fill-primary stroke-white`} />
        </div>
      )}
    </div>
  );
}
