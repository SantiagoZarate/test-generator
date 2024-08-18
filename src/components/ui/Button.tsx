import { ComponentProps } from "react";

export function Button(args: ComponentProps<"button">) {
  return (
    <button
      {...args}
      className="flex items-center gap-2 px-4 py-2 rounded border border-neutral-600 bg-neutral-300 hover:bg-neutral-500 transition text-neutral-800 disabled:bg-neutral-700"
    />
  );
}
