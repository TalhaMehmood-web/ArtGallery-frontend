/* eslint-disable react/prop-types */
import { HashLoader,SyncLoader } from "react-spinners";
const Loading = ({ message, color = "#E8DA17" }) => {
  return (
    <div className="absolute top-0 right-0 z-50 flex flex-col items-center justify-center w-full min-h-screen gap-4 text-white bg-black/70 brightness-90">
     
      {message ? (
        <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-xl italic font-bold text-red-500 uppercase">{message}</p>
        <SyncLoader color={color} />
        </div>
      ): <HashLoader color={color} />}
    </div>
  );
};

export default Loading;
