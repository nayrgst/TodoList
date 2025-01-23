"use client"
import { signIn, signOut, useSession } from 'next-auth/react';

const Dashboard = () => {
  const {data: session} = useSession();
  
  return (
    <>
      {session ? 
      ( 
        <>
          <h1>Bem-vindo! { session.user?.name }</h1>
          <button onClick={() => signOut()}>Sair</button>
        </>
      ) : (
        <>
          <h1>Você não está logado!</h1>
          <button onClick={() => signIn("google")}>Google</button>
          <button onClick={() => signIn("github")}>Github</button>
          <button onClick={() => signIn("linkedin")}>Linkedin</button>
        </> 

      )}
    </>
  )

}

export default Dashboard
