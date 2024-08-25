import { cn } from '../../lib/cn';
import { CrossMicroIcon } from '../icons/CrossMicroIcon';

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
        'rounded-md border border-neutral-500 bg-neutral-900 p-1 transition hover:bg-neutral-700',
        className
      )}
    >
      <CrossMicroIcon />
    </button>
  );
}
