import { RegisterButton } from '@/components/common/header/RegisterButton';
import { Text } from '@/components/ui/Text';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { animation } from '../login/loginSectionAnimation';
import { SignUpForm } from './SignUpForm';

export function SignUpPage() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-8 px-12">
      <header>
        <Text variant={'title'}>Create a new account!</Text>
      </header>
      <motion.section
        {...animation}
        className="flex w-full flex-col gap-8 rounded-lg bg-card p-6"
      >
        <SignUpForm />
        <RegisterButton />
      </motion.section>
      <footer>
        already have an account?{' '}
        <Link className="font-bold underline" to={'/auth/login'}>
          log in!
        </Link>
      </footer>
    </section>
  );
}
