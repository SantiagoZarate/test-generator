import { PropsWithChildren } from "react";
import { CrossMicroIcon } from "../icons/CrossMicroIcon";

interface Props extends PropsWithChildren {
  onDelete: () => void;
}

export function Item({ onDelete, children }: Props) {
  console.log("Rendering");

  return (
    <li className="relative group flex flex-col gap-8 hover:bg-neutral-700 p-2 rounded-md">
      <button
        onClick={() => onDelete()}
        className="absolute group-hover:opacity-100 hover:bg-neutral-700 p-1 opacity-0 transition right-0 top-[20%] mx-2 rounded-md bg-neutral-900 border border-neutral-500"
      >
        <CrossMicroIcon />
      </button>
      <p className="capitalize">{children}</p>
      <div className="hidden print:block border-t border-b border-neutral-500 h-12" />
    </li>
  );
}
