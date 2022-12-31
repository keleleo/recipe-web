import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import style from '../styles/LoginRegister.module.css';
import { IRegister } from '../models/auth/IRegister';
import { AuthService } from '../services/auth.service';

const schema = yup
  .object({
    userName: yup
      .string()
      .required('Nome de usuario é obrigatório')
      .min(6, 'Tamanho mínimo: 6')
      .max(20, 'Tamanho máximo: 20'),
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
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas estão diferentes')
      .required('Confirmar a Senha é obrigatório'),
  })
  .required();

export default function Register() {
  useEffect(() => {
    if (AuthService.isLogged()) Router.push('/');
  });
  const authService = new AuthService();
  const [registerError, setRegisterError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  async function onSubmit(data: IRegister) {
    setRegisterError('');
    const res = await authService.register(data);
    if (res == true) {
      Router.push('/login')
    } else {
      setRegisterError(res.message);
    }
  }

  return (
    <div className={style['form-container']}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.container}>
          <div className={style.title}>Registrar-se</div>

          <div className={style['input-container']}>
            <input
              type="text"
              placeholder="Nome de usuario..."
              {...register('userName')}
            />
              <div className={style['erro-message']}>
                {errors.userName?.message?.toString()}
              </div>
          </div>

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

          <div className={style['input-container']}>
            <input
              type="password"
              placeholder="Confirme a Senha..."
              {...register('passwordConfirm')}
            />
            <div className={style['erro-message']}>
              {errors.passwordConfirm?.message?.toString()}
            </div>
          </div>
          <div className={style.error}>{registerError}</div>
          <div>
            <input
              type="submit"
              value="Regsitrar"
              className={style.submit}
              disabled={!formState.isValid}
            />
          </div>
          <div className={style['register-link']}>
            <Link href="/login">Conectar-se</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
