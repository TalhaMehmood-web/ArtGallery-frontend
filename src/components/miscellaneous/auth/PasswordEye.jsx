/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const PasswordEye = forwardRef(({ label, id, placeholder, errors ,register}, ref) => {
  const [isEyeClicked, setIsEyeClicked] = useState(false);

  return (
    <div className="flex flex-col space-y-1">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center justify-between px-2 text-white bg-transparent border border-yellow-500 rounded-md ">
        <Input
          id={id}
          name={id}
          className="bg-transparent border-none"
          placeholder={placeholder}
          type={isEyeClicked ? "text" : "password"}
          autoComplete="new-password"
          ref={ref} // Attach the ref here
          {...register(id)}
        />
        {isEyeClicked ? (
          <FaEyeSlash
            onClick={() => setIsEyeClicked(false)}
            size={20}
            className="cursor-pointer"
          />
        ) : (
          <FaEye
            onClick={() => setIsEyeClicked(true)}
            size={20}
            className="cursor-pointer"
          />
        )}
      </div>
      {errors && <p className="text-sm text-red-500">{errors.message}</p>}
    </div>
  );
});

// Provide a displayName for the component (optional but helps with debugging)
PasswordEye.displayName = "PasswordEye";

export default PasswordEye;
