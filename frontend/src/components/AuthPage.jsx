import React from 'react';
import { useRecoilValue } from 'recoil';
import authScreenAtom from '../atoms/authAtom';
import Login from './Login';

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return (
    <>
      {authScreenState === 'login' ? <Login /> : ""}
    </>
  );
}

export default AuthPage;
