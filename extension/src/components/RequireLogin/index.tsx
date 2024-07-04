import React from 'react';
import {useAuthContext} from "@src/context/AuthContext";
import LoginForm from "@src/components/LoginForm";

export default function RequireLogin({ children,}: { children: React.ReactNode; }) {
  const {authUser} = useAuthContext()

  if (!authUser) {
    return <LoginForm/>
  }
  return (
      <>{children}</>
  );
}
