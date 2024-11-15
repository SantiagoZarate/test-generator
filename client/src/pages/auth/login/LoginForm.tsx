import { IdentificationMicroIcon } from '@/components/icons/IdentificationMicroIcon';
import { KeyMicroIcon } from '@/components/icons/KeyMicroIcon';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  password: z.string().min(8, 'Password must be 8 characters at least'),
  username: z.string().min(6, 'Username must be 6 characters lenght at least'),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
    },
  });

  const handleSubmit = (data: FormSchema) => {
    console.log({ data });
  };

  return (
    <form
      action=""
      className="flex flex-col gap-4 border-b pb-8"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel htmlFor="username" className="flex items-center gap-2">
                <span id="identification-icon">
                  <IdentificationMicroIcon />
                </span>
                <p>Username</p>
              </FormLabel>
              <Input id="username" placeholder="LionelMessi" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel htmlFor="password" className="flex items-center gap-2">
                <span id="key-icon">
                  <KeyMicroIcon />
                </span>
                <p>Password</p>
              </FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Log in</Button>
      </Form>
    </form>
  );
}
