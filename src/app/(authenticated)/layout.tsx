import { ReactNode } from "react";
import Navbar from "../components/navbar";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthLayout;
