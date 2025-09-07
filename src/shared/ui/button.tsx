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
  "flex justify-center gap-2 cursor-pointer whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "shadow-xs bg-[#1B1D29] flex items-center ",
        action: "grow !h-[40px] px-2 text-button-md bg-[#1B1D29] items-center",
        upgrade:
          "border-solid border-[#47bfe8] border-[1px] text-button-sm !px-[8px] max-w-fit flex items-center",
        get: "text-button-sm !p-1 bg-[#1B1D29] flex items-center",
        buyLevel: "bg-transparent border-none !p-0 mb-2 rounded-[12px] flex items-center",
        positiveDisabled: "bg-[#228b22]/40 !p-1 text-button-sm flex items-center",
        transparent: "bg-transparent border-none !p-0",
        page: "bg-[#1B1D29] border-[1px] border-solid border-[#18a7fb]",
        banned:
          "bg-[#1B1D29] border-[1px] border-solid border-[#18a7fb] text-white-heading flex items-center !h-[50px] w-full",
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
