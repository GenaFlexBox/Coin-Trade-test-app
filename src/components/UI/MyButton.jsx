import React from "react";

const MyButton = ({ children, type, styles, onClick, selected }) => {
  return (
    <button onClick={onClick} type={type} className={styles}>
      {children}
    </button>
  );
};

export default MyButton;
