import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "gold";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[0.9rem] font-medium tracking-normal transition-all duration-300 ease-out focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-hi text-void hover:bg-white",
  gold: "bg-gold text-void hover:brightness-110",
  ghost:
    "text-hi border border-white/15 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05]",
};

const arrow = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="translate-x-0 transition-transform duration-500 ease-out group-hover:translate-x-1"
  >
    <path
      d="M2 8h11M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type CommonProps = {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  variant = "primary",
  withArrow = true,
  children,
  className = "",
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className"
  >) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {withArrow && arrow}
    </Link>
  );
}

export function Button({
  variant = "primary",
  withArrow = false,
  children,
  className = "",
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
      {withArrow && arrow}
    </button>
  );
}
