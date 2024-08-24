"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};
const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const userId = localStorage.getItem("userId");
  const router = useRouter();
  useEffect(() => {
    if (!userId) {
      router.push("/login");
    }
  });
  return <>{children}</>;
};
export default AuthWrapper;
