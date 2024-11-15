import { LoginButon } from '@/components/common/header/LoginButon';
import { Text } from '@/components/ui/Text';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import './loginPage.css';
import { animation } from './loginSectionAnimation';

export function LoginPage() {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-8 px-12">
      <header>
        <Text variant={'title'}>Sign in with your credentials</Text>
      </header>
      <motion.section
        {...animation}
        className="flex w-full flex-col gap-8 rounded-lg bg-card p-6"
      >
        <LoginForm />
        <LoginButon />
      </motion.section>
      <footer>
        you don't have an account?{' '}
        <Link className="font-bold underline" to={'/auth/signup'}>
          sign up!
        </Link>
      </footer>
    </section>
  );
}
