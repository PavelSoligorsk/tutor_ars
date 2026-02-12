'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

import { signIn, signOut } from './auth';

export async function authenticate(
  _prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn('credentials', {
      password: formData.get('password'),
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return 'Неверный пароль';
      }
      return 'Произошла ошибка при входе';
    }
    throw error;
  }
  redirect('/');
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirect: false });
  redirect('/login');
}
