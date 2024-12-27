import { BinIcon } from '../icons/BinIcon';
import { Button } from '../ui/Button';

interface Props {
  onDelete: () => void;
}

export function ProfileTestFooter({ onDelete }: Props) {
  return (
    <footer className="flex justify-end">
      <Button onClick={onDelete}>
        <BinIcon /> Delete test
      </Button>
    </footer>
  );
}
