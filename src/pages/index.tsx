import Head from 'next/head';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/auth';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Tooltip } from '../components/Tooltip';
import { ButtonLogin } from '../components/Button/Login';

import styles from '../styles/pages/home.module.scss';

type SignInFormData = {
  email?: string;
  password?: string;
};

const Home: NextPage = () => {
  const router = useRouter();
  const { signIn, signOut, user } = useAuth();
  const { register, handleSubmit, formState } = useForm({});
  const [isVisibleMessageError, setIsVisibleMessageError] =
    useState<boolean>(false);

  const handleSignIn: SubmitHandler<SignInFormData> = async values => {
    setIsVisibleMessageError(false);

    try {
      if (values.email && values.password) {
        await signIn({
          email: values.email,
          password: values.password,
        });

        router.push('/home');
      }
    } catch (err) {
      setIsVisibleMessageError(true);
    }
  };

  useEffect(() => {
    function checkLogin() {
      try {
        user && router.push('/home');
      } catch (error) {
        signOut();
      }
    }
    checkLogin();
  }, [user]);

  return (
    <>
      <Head>
        <title>ioasys Books | Login</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.content}>
          <Header />

          <form noValidate onSubmit={handleSubmit(handleSignIn)}>
            <Input type="email" label="Email" {...register('email')} />

            <Input type="password" label="Senha" {...register('password')} />

            <ButtonLogin
              type="submit"
              label="Entrar"
              isLoading={formState.isSubmitting}
            />

            <Tooltip
              label="Email e/ou senha incorretos."
              isVisible={isVisibleMessageError}
            />
          </form>
        </main>
      </div>
    </>
  );
};

export default Home;
