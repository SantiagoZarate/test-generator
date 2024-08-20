import { BinIcon } from "../icons/BinIcon";
import { ClipboardIcon } from "../icons/ClipboardIcon";
import { PrintIcon } from "../icons/PrintIcon";
import { Button } from "../ui/Button";
import React from "react";

interface Props {
  onClearAll: () => void;
  dataToCopy: any[];
}

function ActionsFooter({ dataToCopy, onClearAll }: Props) {
  return (
    <footer className="print:hidden flex gap-2 justify-end">
      <Button
        onClick={() => {
          window.print();
        }}
      >
        Print
        <PrintIcon />
      </Button>
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
    </footer>
  );
}

export default React.memo(ActionsFooter);
