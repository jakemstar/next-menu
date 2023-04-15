import { useSession } from "next-auth/react";
import { type ReactNode } from "react";
import Login from "./login";
import Navbar from "./navbar";

type LayoutProps = {
    children: ReactNode;
  }

export default function Layout({ children }: LayoutProps) {
  const { data, status } = useSession();
  
  if (status === 'loading') return <>Session loading</>

  return (
    status === 'authenticated' ?
    <>
      <Navbar session={data} />
      <main className="px-2 mx-auto sm:px-6 lg:px-8">{children}</main>
    </>: <Login />
  )
}