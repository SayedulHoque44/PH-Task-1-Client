import React, { ReactNode } from "react";

const Container = ({ children }:{children:ReactNode}) => {
  return (
    <div className="max-w-[2530px] xl:px-28 lg:px-16  md:px-8 sm:px-4 px-2 mx-auto">
      {children}
    </div>
  );
};

export default Container;