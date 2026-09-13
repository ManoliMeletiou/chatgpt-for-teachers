import { useMemo } from "react";
import { encode } from "uqr";
import { cn } from "@/lib/utils";

export function QrCode({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const { size, path } = useMemo(() => {
    const qr = encode(value, { ecc: "M", border: 2 });
    const modules: string[] = [];
    for (let y = 0; y < qr.size; y += 1) {
      const row = qr.data[y]!;
      for (let x = 0; x < qr.size; x += 1) {
        if (row[x]) modules.push(`M${x} ${y}h1v1h-1z`);
      }
    }
    return { size: qr.size, path: modules.join("") };
  }, [value]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn("size-full text-ink", className)}
      role="img"
      aria-label={label ?? "QR code"}
      shapeRendering="crispEdges"
    >
      <rect width={size} height={size} className="fill-elevated" />
      <path d={path} fill="currentColor" />
    </svg>
  );
}
