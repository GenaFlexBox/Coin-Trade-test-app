import React from "react";

const MyModal = ({ children, visible, setVisible }) => {
  return (
    <div
      onClick={() => setVisible(false)}
      className={
        visible
          ? "bg-opacity-50 bg-black fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center"
          : "bg-opacity-50 bg-black fixed top-0 bottom-0 right-0 left-0 hidden"
      }
    >
      <div
        className="flex  items-center p-5 bg-white rounded-2xl min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default MyModal;

//
//
