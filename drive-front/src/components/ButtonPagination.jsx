import React from "react";

function ButtonPagination({ content, onClick, active, disabled }) {
  return (
    <button
      className={`flex flex-col cursor-pointer items-center justify-center w-9 h-9 shadow-[0_4px_10px_rgba(0,0,0,0.03)] text-sm font-normal transition-colors rounded-lg
      ${active ? "bg-green-500 text-white dark:bg-green-500" : "text-green-500"}
      ${
        !disabled
          ? "bg-white hover:bg-green-500 hover:text-white  dark:bg-gray-800 dark:hover:bg-green-600 dark:hover:text-white"

          : "text-green-300 bg-white cursor-not-allowed  dark:bg-gray-800/20"
      }
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default ButtonPagination;
