/* eslint-disable react/prop-types */
import { HashLoader } from "react-spinners";
const Loading = ({ message, color = "#E8DA17" }) => {
  return (
    <div className="absolute top-0 right-0 z-50 flex flex-col items-center justify-center w-full min-h-screen gap-4 text-white bg-black/70 brightness-90">
      <HashLoader color={color} />
      {message && (
        <p className="text-lg italic font-semibold text-red-500">{message}</p>
      )}
    </div>
  );
};

export default Loading;
