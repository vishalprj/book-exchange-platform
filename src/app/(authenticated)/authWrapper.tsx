"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};
const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  });
  return <>{children}</>;
};
export default AuthWrapper;
