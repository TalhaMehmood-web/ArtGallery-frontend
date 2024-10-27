/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/UserContext";
import { toast } from "sonner";

const AuthButton = forwardRef(
  (
    {
      className,
      onClick,
      children,
      variant = "default",
      disabled,
      type = "button", // default type is "button" but can be overridden to "submit"
    },
    ref
  ) => {
    const { user } = useGlobalContext();

    const handleClick = (e) => {
      if (!user) {
        // Prevent form submission if not logged in
        e.preventDefault();
        toast.error("Kindly login first", {
          description: "You need to be logged in to perform this action.",
        });
      } else if (user?.isAdmin) {
        e.preventDefault();
        toast.error("Unauthorized", {
          description: "You Cannot perform any action.",
        });
      } else if (onClick) {
        // Call onClick handler only if it is defined
        onClick(e);
      }
    };

    return (
      <Button
        ref={ref} // Forward the ref to the Button component
        variant={variant}
        className={className}
        disabled={disabled} // Disable if no user is logged in
        onClick={handleClick} // Use handleClick only if type is "button"
        type={type}
      >
        {children}
      </Button>
    );
  }
);

// Provide a display name for easier debugging
AuthButton.displayName = "AuthButton";

export default AuthButton;
