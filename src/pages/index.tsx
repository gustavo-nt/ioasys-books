import Head from 'next/head';
import type { NextPage } from 'next';
import { useAuth } from '../hooks/auth';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Tooltip } from '../components/Tooltip';
import { ButtonLogin } from '../components/Button/Login';

import styles from '../styles/pages/home.module.scss';
import { Modal } from '../components/Modal';

type SignInFormData = {
  email?: string;
  password?: string;
}

const Home: NextPage = () => {
  const { signIn, getRefreshToken } = useAuth();
  const { register, handleSubmit, formState } = useForm({});

  const [isOpenModal, setIsOpenModal] = useState(true);
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
      setIsVisibleMessageError(true);
    }
  }

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  const handleCloseModal = () => {
    setIsOpenModal(false);
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
            noValidate
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

            <Tooltip 
              label='Email e/ou senha incorretos.' 
              isVisible={isVisibleMessageError} />
          </form>

          <Modal 
            isOpen={isOpenModal} 
            onRequestClose={handleCloseModal}
          />  
        </main>
      </div>
    </>
  );
}

export default Home;
