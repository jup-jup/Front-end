import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// 버튼 크기와 테마에 대한 Tailwind CSS 클래스 정의
const buttonSize = {
  small: "text-xs",
  medium: "text-base",
  large: "text-lg",
};

const buttonTheme = {
  primary: "bg-primary text-black",
  secondary: "hover:bg-gray-400 text-black",
  border: "border border-transparent hover:saturate-10",
};

// 버튼 컴포넌트 정의
const Button = forwardRef(({
      children,
      size = "medium",
      theme = "primary",
      className = "",
      full = false,
      onClick,
      ...attr
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          `${buttonTheme[theme]} ${buttonSize[size]} inline-flex px-10 py-4 box-border cursor-pointer whitespace-pre rounded-4`,
          full && "w-full",
          className
        )}
        onClick={onClick}
        {...attr}
      >
        {children}
      </button>
    );
  }
);

export default Button;
