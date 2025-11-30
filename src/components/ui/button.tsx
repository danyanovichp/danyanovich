import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium rounded-xl backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary/90 text-primary-foreground backdrop-blur-xl border border-primary/20 hover:bg-primary hover:shadow-glass hover:scale-[1.02]",
        destructive: "bg-destructive/90 text-destructive-foreground backdrop-blur-xl border border-destructive/20 hover:bg-destructive hover:shadow-glass",
        outline: "bg-background/50 backdrop-blur-xl text-foreground border border-border/30 hover:bg-background/70 hover:shadow-glass",
        secondary: "bg-secondary/80 text-secondary-foreground backdrop-blur-xl border border-secondary/20 hover:bg-secondary hover:shadow-glass",
        ghost: "border-transparent hover:bg-muted/50 backdrop-blur-sm",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
