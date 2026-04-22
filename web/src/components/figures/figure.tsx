import type { TypeCode } from "@/lib/types";
import { TYPES } from "@/lib/types";

/**
 * 人格插画：使用 `/public/lgbit/{code}.png`（低多边形角色，1:1 透明背景）。
 * 仍保留 `size` / `className` 接口，便于在 TypeHero、NeighborTypes 等地方沿用。
 */
export function Figure({
  code,
  size = 200,
  className,
  priority = false,
  alt,
}: {
  code: TypeCode;
  size?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  const persona = TYPES[code];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/lgbit/${code}.png`}
      alt={alt ?? `${code} ${persona.en}`}
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
