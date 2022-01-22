import Head from 'next/head';
import type { NextPage } from 'next';
import { useAuth } from '../hooks/auth';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Warning } from '../components/Warning';
import { ButtonLogin } from '../components/Button/Login';

import styles from '../styles/pages/home.module.scss';

type SignInFormData = {
  email?: string;
  password?: string;
}

const Home: NextPage = () => {
  const { signIn, getRefreshToken } = useAuth();
  const { register, handleSubmit, formState } = useForm({});
  const [isVisibleMessageError, setIsVisibleMessageError] = useState<boolean>(false);

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    setIsVisibleMessageError(false);

    try {
      if (values.email && values.password) {
        await signIn({
          email: values.email,
          password: values.password,
        });
      }
    } catch (err) {
      console.log(err)
      setIsVisibleMessageError(true);
    }
  }

  useEffect(() => {
    getRefreshToken();
  }, [getRefreshToken])

  return (
    <>
      <Head>
        <title>ioasys Books | Login</title>
        <meta name='description' content='Faça login no site' />
        <meta property='og:title' content='ioasys Books - Sua loja de livros' />
      </Head>

      <div className={styles.container}>
        <main className={styles.content}>
          <Header />

          <form 
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Input 
              type='email' 
              label='Email'
              {...register('email')}
            />

            <Input 
              type='password' 
              label='Senha' 
              {...register('password')}
            />

            <ButtonLogin 
              type='submit' 
              label='Entrar'
              isLoading={formState.isSubmitting} 
            />

            <Warning 
              label='Email e/ou senha incorretos.' 
              isVisible={isVisibleMessageError} />
          </form>
        </main>
      </div>
    </>
  );
}

export default Home;
