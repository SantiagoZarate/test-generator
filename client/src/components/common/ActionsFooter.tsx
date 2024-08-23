import React from "react";
import { BinIcon } from "../icons/BinIcon";
import { ClipboardIcon } from "../icons/ClipboardIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { Button } from "../ui/Button";
import { PrintButton } from "../ui/PrintButton";

interface Props {
  onClearAll: () => void;
  dataToCopy: any[];
  onShare: () => void;
  loadingShare: boolean;
}

function ActionsFooter({
  dataToCopy,
  onClearAll,
  onShare,
  loadingShare,
}: Props) {
  return (
    <footer className="print:hidden flex gap-2 justify-end">
      <PrintButton />
      <Button
        onClick={() => {
          onClearAll();
        }}
      >
        Clear All
        <BinIcon />
      </Button>
      <Button
        onClick={async () => {
          let parsedQuestions: string = "Questions:\n";

          dataToCopy.forEach((q, index) => {
            parsedQuestions += "\t" + (index + 1) + " - " + q + "\n";
          });

          await navigator.clipboard.writeText(parsedQuestions);
        }}
      >
        Copy All
        <ClipboardIcon />
      </Button>
      <Button disabled={loadingShare} onClick={onShare}>
        Share
        <LinkIcon />
      </Button>
    </footer>
  );
}

export default React.memo(ActionsFooter);
