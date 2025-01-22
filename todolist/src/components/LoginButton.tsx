"use client"
import { signIn, signOut, useSession } from 'next-auth/react';

const LoginButton = () => {
  const {data: session} = useSession();
  
  return (
    <>
      {session ? 
      ( 
        <>
          <h1>Bem-vindo!</h1>
          <button onClick={() => signOut()}>Sair</button>
        </>
      ) : (
        <>
          <h1>Você não está logado!</h1>
          <button onClick={() => signIn()}>Entrar</button>
        </> 

      )}
    </>
  )

}

export default LoginButton
