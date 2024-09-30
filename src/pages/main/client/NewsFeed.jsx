import { fetchData } from "@/api/fetchData";
import Post from "@/components/miscellaneous/client/Post";
import PostPictureDialog from "@/components/miscellaneous/client/PostPictureDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "react-query";
import PostSkeleton from "@/skeleton/PostSkeleton";
const NewsFeed = () => {
  const [openPostPicture, setOpenPostPicture] = useState(false);
  const { data: posts, isLoading: postsLoading } = useQuery("posts", () =>
    fetchData("post")
  );
  return (
    <>
      <div className="flex flex-col flex-1 px-4 py-4 sm:px-10 ">
        <div className="flex justify-end w-full my-2">
          <Button
            onClick={() => setOpenPostPicture(true)}
            className="text-white bg-yellow-500"
          >
            Create Post +
          </Button>
        </div>
        {/* display post */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 sm:gap-4 justify-items-center ">
          {postsLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))
            : posts?.map((post) => <Post key={post._id} post={post} />)}
        </div>
      </div>
      {/* child components */}
      <PostPictureDialog
        openPostPicture={openPostPicture}
        setOpenPostPicture={setOpenPostPicture}
      />
    </>
  );
};

export default NewsFeed;
