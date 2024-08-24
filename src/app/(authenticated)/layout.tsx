import { ReactNode } from "react";
import Navbar from "../components/navbar";
import AuthWrapper from "./authWrapper";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Navbar />
      <AuthWrapper>{children}</AuthWrapper>
    </>
  );
};

export default AuthLayout;
