/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";
import { Button } from "./button";

const LoaderButton = ({isLoading,type="button",text}) => {
  return (
    <Button
    className="text-yellow-500 bg-white/90 hover:bg-transparent hover:text-white"
    type={type}
    disabled={isLoading}
  >
 {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
    {text}
  </Button>
  );
}

export default LoaderButton;
