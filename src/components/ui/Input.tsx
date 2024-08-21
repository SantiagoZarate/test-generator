import React, { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export const Input = React.forwardRef<
  HTMLInputElement,
  ComponentProps<"input">
>((args, ref) => (
  <input
    {...args}
    ref={ref}
    className={cn(
      "rounded-lg bg-card border border-border p-2 capitalize",
      args.className
    )}
  />
));
