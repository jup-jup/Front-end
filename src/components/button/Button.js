import React from "react";
/**
 * 설명 블라블라
 * @param {enum} theme 테마/ primary, secondary
 * @returns 
 */
const Button = ({ children, theme }) => {
  return <div className={theme}>{children}</div>;
};

export default Button;
