import { fetchData } from "@/api/fetchData";
import Post from "@/components/miscellaneous/client/Post";
import PostPictureDialog from "@/components/miscellaneous/client/PostPictureDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "react-query";
import PostSkeleton from "@/skeleton/PostSkeleton";
const NewsFeed = () => {
  const [openPostPicture, setOpenPostPicture] = useState(false);
  const { data: posts, isLoading: postsLoading } = useQuery(
    "posts",
    () => fetchData("post"),
    {
      refetchOnWindowFocus: false,
      staleTime: 500000,
    }
  );

  return (
    <>
      <div className="flex flex-col flex-1 flex-grow min-h-full">
        <div className="sticky top-0 left-0 flex justify-end w-full p-2 bg-transparent">
          <Button
            onClick={() => setOpenPostPicture(true)}
            className="text-white bg-yellow-500 rounded-full "
          >
            Create Post +
          </Button>
        </div>
        {/* display post */}
        {posts?.length === 0 ? (
          <div className="flex items-center justify-center flex-1 flex-grow max-h-full">
            <p className="text-2xl italic font-semibold md:text-4xl ">
              Be the first one to add a post
            </p>
          </div>
        ) : (
          <div className="container grid max-w-4xl grid-cols-1 gap-2 mx-auto justify-items-center ">
            {postsLoading
              ? Array.from({ length: 2 }).map((_, index) => (
                  <PostSkeleton key={index} />
                ))
              : posts?.map((post) => <Post key={post._id} post={post} />)}
          </div>
        )}
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
