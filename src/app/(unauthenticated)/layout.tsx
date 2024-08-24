"use client";
import { ReactElement, ReactNode } from "react";

const UnauthenticatedLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  return <>{children}</>;
};

export default UnauthenticatedLayout;
