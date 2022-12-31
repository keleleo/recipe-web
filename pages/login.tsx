import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from '../styles/LoginRegister.module.css';
import { ILogin } from '../models/auth/ILogin';
import { AuthService } from '../services/auth.service';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email é obrigatório')
      .email('Email com formato incorreto')
      .max(100, 'Tamanho máximo: 100'),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(8, 'Tamanho mínimo: 8')
      .max(100, 'Tamanho máximo: 100'),
  })
  .required();

export default function Login() {
  useEffect(() => {
    if (AuthService.isLogged()) Router.push('/');
  });
  const authService = new AuthService();
  const [loginError, setLoginError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
  } = useForm<ILogin>({ resolver: yupResolver(schema), mode: 'onBlur' });

  async function onSubmit(data: ILogin) {
    setLoginError('');
    const res = await authService.login(data);
    if (res == true) {
      Router.push('/');
    } else {
      setLoginError(res.message);
    }
  }

  return (
    <div className={style['form-container']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.container}>
          <div className={style.title}>Conectar-se</div>

          <div className={style['input-container']}>
            <input type="text" placeholder="Email..." {...register('email')} />
            <div className={style['erro-message']}>
              {errors.email?.message?.toString()}
            </div>
          </div>

          <div className={style['input-container']}>
            <input
              type="password"
              placeholder="Senha..."
              {...register('password')}
            />
            <div className={style['erro-message']}>
              {errors.password?.message?.toString()}
            </div>
          </div>

          <div className={style.error}>{loginError}</div>
          <div>
            <input
              type="submit"
              value="Entrar"
              className={style.submit}
              disabled={!formState.isValid}
            />
            <Link href="#">Recuperar senha</Link>
          </div>
          <div className={style['register-link']}>
            <Link href="/register">Registrar-se</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
