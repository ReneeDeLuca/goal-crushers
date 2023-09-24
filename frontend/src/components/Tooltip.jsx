const Tooltip = ({ message, children }) => {
  return (
    // <span className="group relative">
    //     {children}
    //     <span className="absolute top-5 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{message}</span>
    // </span>

    <div className="has-tooltip">
      {children}
      <span className="tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8">
        {message}
      </span>
    </div>
  );
};

export default Tooltip;
