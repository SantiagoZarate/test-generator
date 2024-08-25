import { PrintIcon } from '../icons/PrintIcon';
import { Button } from './Button';

export function PrintButton() {
  return (
    <Button
      onClick={() => {
        window.print();
      }}
    >
      Print
      <PrintIcon />
    </Button>
  );
}
