/* eslint-disable react/prop-types */

import useFollow from "@/hooks/useFollow";
import AuthButton from "../auth/AuthButton";
import { useGlobalContext } from "@/context/UserContext";

const PostFollowButton = ({ userIdToFollow, createdByYou, isFollowing }) => {
  const { followUser } = useFollow();
  const { user } = useGlobalContext();
  return (
    <div>
      <AuthButton
        onClick={() => followUser(userIdToFollow)}
        className={
          "text-blue-500 disabled:border-none disabled:opacity-100 font-semibold hover:text-blue-500 text-sm sm:text-base"
        }
        variant="ghost"
        disabled={createdByYou || isFollowing}
      >
        {user
          ? createdByYou
            ? ""
            : isFollowing
            ? "Following"
            : "Follow"
          : null}
      </AuthButton>
    </div>
  );
};

export default PostFollowButton;
