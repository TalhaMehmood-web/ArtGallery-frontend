import ProfileItem from "@/components/miscellaneous/client/ProfileItem";
import Loading from "@/components/miscellaneous/loading/Loading";
import useProfileAnalytics from "@/hooks/useProfileAnalytics";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import { Button } from "@/components/ui/button";
const ProfileAnalytics = () => {
  const { posts, auctions, isLoading } = useProfileAnalytics();

  return (
    <>
      <div className="flex flex-col w-full min-h-screen gap-2 p-2 overflow-auto text-white bg-black sm:p-5 ">
        <header className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-2 lg:grid-cols-4 ">
          <ProfileItem
            header={"Total Posts Posted"}
            content={posts?.items?.length}
          />
          <ProfileItem
            header={"Total  Likes"}
            content={posts?.totalNumberOfLikes}
          />
          <ProfileItem
            header={"Total Bids"}
            content={auctions?.items?.length}
          />
          <ProfileItem
            header={"Highest Bids"}
            content={auctions?.numberOfHighestBids}
          />
        </header>
        <div className="grid flex-1 grid-cols-1 gap-2">
          {/* number of posts posted and user who liked */}
          <div className="flex flex-col w-full gap-4 p-2 rounded-md ">
            <h2 className="px-4 py-2 text-2xl italic font-bold text-center text-white border border-yellow-600 rounded-md bg-yellow-600/50 lg:text-4xl">
              Posts
            </h2>

            {posts?.items?.map((post) => (
              <div
                key={post?._id}
                className="relative grid grid-cols-1 gap-4 p-2 border-b sm:grid-cols-2 border-slate-900 "
              >
                <div className="absolute right-0 -top-2 ">
                  <Button variant="destructive">Delete Post</Button>
                </div>
                {/* picture container */}
                <div className="flex flex-col gap-2">
                  <p className="text-lg font-semibold text-white text-start">
                    Posted Picture
                  </p>
                  <img
                    src={post?.picture}
                    className="object-cover w-full h-full rounded-md aspect-square "
                    alt={post?._id}
                  />
                </div>
                {/* liked by container */}
                <div className="flex flex-col gap-2 ">
                  <p className="text-lg font-semibold text-white text-start">
                    Liked By
                  </p>
                  <div className="flex flex-col  gap-2  h-[300px]  sm:h-full overflow-x-hidden overflow-y-auto ">
                    {post?.likedBy?.length === 0 ? (
                      <div className="flex items-center justify-center flex-1">
                        <p className="text-xl font-bold md:text4xl ">
                          No likes yet
                        </p>
                      </div>
                    ) : (
                      post?.likedBy?.map((item) => (
                        <div
                          className="flex items-start gap-2"
                          key={item._id + post._id}
                        >
                          <Avatar className="border-2 border-yellow-500 rounded-full cursor-pointer">
                            <AvatarImage
                              className="object-cover"
                              src={item?.profile}
                              alt="avatar"
                            />
                            <AvatarFallback className="text-white bg-black rounded-full cursor-pointer ">
                              {getInitials(item?.fullname)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col gap-2 text-white ">
                            <p className="text-lg font-semibold ">
                              {item?.fullname}
                            </p>
                            <p className="text-sm italic font-thin text-white sm:text-base ">
                              {item?.email}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col w-full gap-4 p-2 rounded-md ">
            <h2 className="px-4 py-2 text-2xl italic font-bold text-center text-white border border-yellow-600 rounded-md bg-yellow-600/50 lg:text-4xl">
              Auctions
            </h2>
            {}
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default ProfileAnalytics;
