import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <>
      <img
        src="/logo-light-transparent.png"
        alt="VentiPure Logo"
        className={cn("block h-auto w-auto object-contain dark:hidden", className)}
        width={360}
        height={120}
      />
      <img
        src="/logo-dark-transparent.png"
        alt="VentiPure"
        className={cn("hidden h-auto w-auto object-contain dark:block", className)}
        width={360}
        height={120}
      />
    </>
  );
}
