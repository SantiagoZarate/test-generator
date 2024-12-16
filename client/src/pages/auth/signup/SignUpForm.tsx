import { authAPI } from '@/api/auth/auth.api';
import { EnvelopeMicroIcon } from '@/components/icons/EnvelopeMicroIcon';
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

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be 8 characters at least'),
    confirmPassword: z.string(),
    username: z
      .string()
      .min(6, 'Username must be 6 characters lenght at least'),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: 'Confirmar password must be equal to password',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      email: '',
      username: '',
    },
  });

  const handleSubmit = (data: SignUpSchema) => {
    console.log({ data });
    authAPI.register(data).then(() => {
      form.reset();
    });
  };

  return (
    <form
      data-login
      action=""
      className="flex flex-col gap-4 border-b pb-8"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Form {...form}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel htmlFor="email" className="flex items-center gap-2">
                <span>
                  <EnvelopeMicroIcon />
                </span>
                <p>email</p>
              </FormLabel>
              <Input id="email" placeholder="validemail@gmail.com" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel htmlFor="username" className="flex items-center gap-2">
                <span>
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
                <span>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel
                htmlFor="confirmPassword"
                className="flex items-center gap-2"
              >
                <span>
                  <KeyMicroIcon />
                </span>
                <p>Confirm password</p>
              </FormLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Create account</Button>
      </Form>
    </form>
  );
}
