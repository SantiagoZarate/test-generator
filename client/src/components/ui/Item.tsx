import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export function Item({ children }: Props) {
  console.log("Rendering");

  return (
    <li className="relative group flex flex-col gap-8 hover:bg-neutral-700 p-2 rounded-md">
      <p className="first-letter:uppercase">{children}</p>
      <div className="hidden print:block border-t border-b border-neutral-500 h-12" />
    </li>
  );
}
