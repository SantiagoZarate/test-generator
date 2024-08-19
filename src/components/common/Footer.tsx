import { useState } from "react";
import { Button } from "../ui/Button";
import { SparkelIcon } from "../icons/SparkelIcon";

export function Footer() {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(
      `https://docs.google.com/forms/d/e/1FAIpQLSdUSarbRaANifMj4XDeQgAjRvd5nR6qX-kK7yWhlw9Ylt8-FQ/formResponse?submit=Submit&usp=pp_url&entry.1951521129=${value}`
    );
    setValue("");
  };

  return (
    <footer className="print:hidden border-t border-neutral-600 pt-6 pb-20 flex items-start">
      <section className="flex-1 flex gap-1 items-center text-neutral-400">
        <SparkelIcon />
        made by{" "}
        <a
          target="_blank"
          className="hover:underline text-neutral-200"
          href="https://www.github.com/SantiagoZarate"
        >
          Santiago Zarate
        </a>{" "}
        powered by Vite
      </section>
      <section className="flex-1 flex flex-col gap-2">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} action="">
          <label htmlFor="suggestion">
            Would you like to it to have more features?
          </label>
          <div className="flex gap-2">
            <input
              className="flex-1 w-full p-1 text-sm rounded-lg bg-neutral-900 border border-neutral-600 capitalize"
              onChange={(e) => setValue(e.currentTarget.value)}
              placeholder="i want it to have ..."
              id="suggestion"
              value={value}
              type="text"
            />
            <Button className="self-end  w-fit">send</Button>
          </div>
        </form>
      </section>
    </footer>
  );
}
