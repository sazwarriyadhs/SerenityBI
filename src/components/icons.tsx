import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
    >
      <rect width="100" height="100" rx="15" fill="hsl(var(--primary))" />
      <text x="50%" y="52%" dominantBaseline="central" textAnchor="middle" fontSize="50" fontWeight="bold" fill="hsl(var(--primary-foreground))">
        MS
      </text>
    </svg>
  );
}
