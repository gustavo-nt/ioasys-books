import Head from 'next/head';
import type { NextPage } from 'next';
import { SubmitHandler, useForm } from "react-hook-form";

import { Header } from '../components/Header';
import { Input } from '../components/Input';

import styles from '../styles/home.module.scss';

type SignInFormData = {
  email?: string;
  password?: string;
}

const Home: NextPage = () => {
  const { register, handleSubmit, formState } = useForm({});

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(values)
  }

  return (
    <>
      <Head>
        <title>ioasys Books | Login</title>
        <meta name="description" content="Faça login no site" />
        <meta property="og:title" content="ioasys Books - Sua loja de livros" />
      </Head>

      <div className={styles.container}>
        <main className={styles.content}>
          <Header />

          <form 
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Input 
              type="email" 
              label="Email"
              {...register('email')}
            />

            <Input 
              type="password" 
              label="Senha" 
              {...register('password')}
            />

            <button type='submit'>Entrar</button>
          </form>
        </main>
      </div>
    </>
  );
}

export default Home;
