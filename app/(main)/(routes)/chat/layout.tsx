import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <div className="ml-[225px] pl-2">{children}</div>;
}
