import { Button } from "@/components/ui/button";
import useFollow from "@/hooks/useFollow";

const PostFollowButton = ({ userIdToFollow }) => {
  const { followUser, isAddingFollower } = useFollow();
  return (
    <div>
      <Button
        onClick={() => followUser(userIdToFollow)}
        className={"text-blue-500 font-semibold hover:text-blue-500 text-base"}
        variant="ghost"
      >
        Follow
      </Button>
    </div>
  );
};

export default PostFollowButton;
