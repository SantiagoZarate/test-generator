import React from 'react';
import { BinIcon } from '../icons/BinIcon';
import { LinkIcon } from '../icons/LinkIcon';
import { Button } from '../ui/Button';
import { PrintButton } from '../ui/PrintButton';

interface Props {
  onClearAll: () => void;
  onShare: () => void;
  loadingShare: boolean;
  isCreatingTest: boolean;
}

function ActionsFooter({
  onClearAll,
  onShare,
  loadingShare,
  isCreatingTest,
}: Props) {
  return (
    <footer className="flex justify-end gap-2 print:hidden">
      <PrintButton />
      <Button
        onClick={() => {
          onClearAll();
        }}
      >
        Clear All
        <BinIcon />
      </Button>
      <Button disabled={loadingShare || isCreatingTest} onClick={onShare}>
        {isCreatingTest ? 'Loading...' : 'Share'}
        <LinkIcon />
      </Button>
    </footer>
  );
}

export default React.memo(ActionsFooter);
