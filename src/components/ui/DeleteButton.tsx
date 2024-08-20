import { cn } from "../../lib/cn";
import { CrossMicroIcon } from "../icons/CrossMicroIcon";

interface Props {
  onDelete: () => void;
  className?: string;
}

export function DeleteButton({ onDelete, className }: Props) {
  return (
    <button
      type="button"
      onClick={() => onDelete()}
      className={cn(
        "p-1 rounded-md bg-neutral-900 border border-neutral-500 hover:bg-neutral-700 transition",
        className
      )}
    >
      <CrossMicroIcon />
    </button>
  );
}
