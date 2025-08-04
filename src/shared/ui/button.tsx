import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { hapticFeedback } from "@telegram-apps/sdk-react";

import { cn } from "@/shared/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  vibrate?: boolean;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "shadow-xs bg-[#1B1D29] hover:bg-[#1B1D29]/80",
        action: "grow !h-[40px] px-2 text-button-md bg-[#1B1D29]",
        upgrade: "border-solid border-[#47bfe8] border-[1px] text-button-sm !px-[8px] max-w-fit",
        get: "text-button-sm px-2 bg-[#1B1D29]",
        buyLevel: "bg-transparent border-none !p-0 mb-2 rounded-[12px]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        medium: "max-w-[120px]",
      },
      hover: {
        default: "hover:bg-[#1B1D29]/80",
        buyLevel: "hover:bg-[#1B1D29]/80 h-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "default",
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, onClick, asChild = false, vibrate = true, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-slot="button"
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (vibrate && hapticFeedback.isSupported()) {
          hapticFeedback.impactOccurred("light");
        }
        onClick?.(event);
      }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
