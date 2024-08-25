import { PropsWithChildren } from "react";

export function Item({ children }: PropsWithChildren) {
  console.log("Rendering");

  return (
    <li
      id="item"
      className="group relative flex flex-col gap-8 rounded-md p-2 hover:bg-neutral-700"
    >
      <p className="first-letter:uppercase">{children}</p>
      <div className="hidden h-12 border-y border-neutral-500 print:block" />
    </li>
  );
}
