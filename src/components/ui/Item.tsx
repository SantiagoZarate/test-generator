import { PropsWithChildren } from "react";
import { DeleteButton } from "./DeleteButton";

interface Props extends PropsWithChildren {
  onDelete: () => void;
}

export function Item({ onDelete, children }: Props) {
  console.log("Rendering");

  return (
    <li className="relative group flex flex-col gap-8 hover:bg-neutral-700 p-2 rounded-md">
      <DeleteButton
        className="absolute group-hover:opacity-100 opacity-0 right-0 top-[20%] mx-2"
        onDelete={onDelete}
      />
      <p className="capitalize">{children}</p>
      <div className="hidden print:block border-t border-b border-neutral-500 h-12" />
    </li>
  );
}
