import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from '../ui/use-toast';

export function FooterForm() {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length < 5) return;
    fetch(
      `https://docs.google.com/forms/d/e/1FAIpQLSdUSarbRaANifMj4XDeQgAjRvd5nR6qX-kK7yWhlw9Ylt8-FQ/formResponse?submit=Submit&usp=pp_url&entry.1951521129=${value}`
    ).finally(() => {
      setValue('');
      toast({
        title: 'Suggestions succesfully submitted',
        description: 'Thanks for your collaboration',
      });
    });
  };

  return (
    <form
      className="flex flex-1 flex-col gap-2"
      onSubmit={handleSubmit}
      action=""
    >
      <label htmlFor="suggestion">
        Would you like to it to have more features?
      </label>
      <div className="flex gap-2">
        <Input
          className="flex-1 p-1 text-sm"
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="i want it to have ..."
          id="suggestion"
          value={value}
          type="text"
        />
        <Button className="w-fit self-end">send</Button>
      </div>
    </form>
  );
}
