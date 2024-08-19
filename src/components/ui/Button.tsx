import { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export function Button(args: ComponentProps<"button">) {
  return (
    <button
      {...args}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded border border-neutral-600 bg-neutral-300 hover:bg-neutral-500 transition text-neutral-800 disabled:bg-neutral-700",
        args.className
      )}
    />
  );
}
