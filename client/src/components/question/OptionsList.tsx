interface Props {
  options: string[];
  correctOption: number;
}

export function OptionsList({ correctOption, options }: Props) {
  return (
    <ul className="flex flex-col gap-1">
      {options.map((option, index) => (
        <li key={index} className="flex gap-2 items-center">
          <span className="hidden print:block size-4 border border-neutral-600" />
          <p
            className={`capitalize text-sm ${
              correctOption === index &&
              "text-green-600 underline print:font-normal print:no-underline"
            }`}
          >
            {option}
          </p>
        </li>
      ))}
    </ul>
  );
}
