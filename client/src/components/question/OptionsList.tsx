interface Props {
  options: {
    content: string;
    isCorrect: boolean;
  }[];
}

export function OptionsList({ options }: Props) {
  return (
    <ul className="flex flex-col gap-1">
      {options.map((option, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="hidden size-4 border border-neutral-600 print:block" />
          <p
            className={`text-sm capitalize ${
              option.isCorrect &&
              'text-green-600 underline print:font-normal print:no-underline'
            }`}
          >
            {option.content}
          </p>
        </li>
      ))}
    </ul>
  );
}
