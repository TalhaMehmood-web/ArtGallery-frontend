import { HashLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="absolute top-0 right-0 z-50 flex items-center justify-center w-full min-h-screen text-white bg-black/70 brightness-90">
      <HashLoader color="#E8DA17" />
    </div>
  );
};

export default Loading;
