import { useState } from "react";
import { Button } from "../ui/Button";

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
    <footer className="print:hidden border-t border-neutral-600 pt-6 pb-20 flex">
      <section className="flex-1">
        made by <kbd>Santiago Zarate</kbd>
      </section>
      <section className="flex-1 flex flex-col gap-2">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit} action="">
          <label htmlFor="suggestion">
            would you like to it to have more features?
            <input
              className="w-full p-1 text-sm rounded-lg bg-neutral-900 border border-neutral-600 capitalize"
              onChange={(e) => setValue(e.currentTarget.value)}
              placeholder="i want it to have ..."
              id="suggestion"
              value={value}
              type="text"
            />
          </label>
          <Button className="self-end  w-fit">send</Button>
        </form>
      </section>
    </footer>
  );
}
