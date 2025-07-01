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

export function KraftHeinzLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      {...props}
    >
      <rect width="200" height="40" rx="5" fill="hsl(var(--primary))" />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="24" fontWeight="bold" fill="hsl(var(--primary-foreground))" fontFamily="Arial, sans-serif">
        KRAFT HEINZ
      </text>
    </svg>
  );
}

export function IndofoodLogo(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 40"
        {...props}
      >
        <rect width="200" height="40" rx="5" fill="hsl(var(--primary))" />
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="24" fontWeight="bold" fill="hsl(var(--primary-foreground))" fontFamily="Arial, sans-serif">
          INDOFOOD
        </text>
      </svg>
    );
  }
  
  export function JapfaLogo(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 40"
        {...props}
      >
        <rect width="200" height="40" rx="5" fill="hsl(var(--primary))" />
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="24" fontWeight="bold" fill="hsl(var(--primary-foreground))" fontFamily="Arial, sans-serif">
          JAPFA
        </text>
      </svg>
    );
  }
  
  export function MayoraLogo(props: SVGProps<SVGSVGElement>) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 40"
          {...props}
        >
          <rect width="200" height="40" rx="5" fill="hsl(var(--primary))" />
          <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="24" fontWeight="bold" fill="hsl(var(--primary-foreground))" fontFamily="Arial, sans-serif">
            MAYORA
          </text>
        </svg>
      );
    }
    
    export function BisiLogo(props: SVGProps<SVGSVGElement>) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 40"
          {...props}
        >
          <rect width="200" height="40" rx="5" fill="hsl(var(--primary))" />
          <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="24" fontWeight="bold" fill="hsl(var(--primary-foreground))" fontFamily="Arial, sans-serif">
            BISI
          </text>
        </svg>
      );
    }
    
    export function SangHyangSeriLogo(props: SVGProps<SVGSVGElement>) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 40"
          {...props}
        >
          <rect width="200" height="40" rx="5" fill="hsl(var(--primary))" />
          <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="20" fontWeight="bold" fill="hsl(var(--primary-foreground))" fontFamily="Arial, sans-serif">
            SANG HYANG SERI
          </text>
        </svg>
      );
    }