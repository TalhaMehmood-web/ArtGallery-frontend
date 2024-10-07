import ProfileItem from "@/components/miscellaneous/client/ProfileItem";
import Loading from "@/components/miscellaneous/loading/Loading";
import useProfileAnalytics from "@/hooks/useProfileAnalytics";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getInitials from "@/utils/getInitials";
import { Button } from "@/components/ui/button";
import useDeletePost from "@/hooks/useDeletePost";
import { Badge } from "@/components/ui/badge";

const ProfileAnalytics = () => {
  const { posts, auctions, isLoading } = useProfileAnalytics();
  const { postDeleting, deletePost } = useDeletePost();
  // console.log(auctions);
  return (
    <>
      {isLoading || postDeleting ? (
        <div className="relative w-full min-h-screen">
          <Loading />
        </div>
      ) : (
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

              {posts?.items?.length === 0 ? (
                <p className="flex min-h-[100px] items-center justify-center flex-1 text-2xl italic font-semibold md:text4xl ">
                  No Post Posted{" "}
                </p>
              ) : (
                posts?.items?.map((post) => (
                  <div
                    key={post?._id}
                    className="relative grid grid-cols-1 gap-4 p-2 border-b sm:grid-cols-2 border-slate-900 "
                  >
                    <div className="absolute right-0 -top-2 ">
                      <Button
                        onClick={() => deletePost(post?._id)}
                        variant="destructive"
                      >
                        Delete Post
                      </Button>
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
                ))
              )}
            </div>
            <div className="flex flex-col w-full gap-4 p-2 rounded-md ">
              <h2 className="px-4 py-2 text-2xl italic font-bold text-center text-white border border-yellow-600 rounded-md bg-yellow-600/50 lg:text-4xl">
                Your Bids
              </h2>
              {auctions?.items?.length === 0 ? (
                <p className="flex items-center justify-center flex-1 text-2xl italic font-semibold md:text-4xl ">
                  No Bids in Auction
                </p>
              ) : (
                auctions?.items?.map((auction) => (
                  <div
                    className="grid grid-cols-1 gap-4 p-2 border-b md:grid-cols-5 border-slate-800 "
                    key={auction?._id}
                  >
                    <div className="col-span-2">
                      <img
                        src={auction?.picture}
                        className="object-cover w-full h-full rounded-md aspect-square "
                        alt={auction?._id}
                      />
                    </div>
                    <div className="flex flex-col justify-around col-span-3 gap-4 ">
                      <div
                        className={`flex-col-reverse sm:items-center flex justify-between w-full gap-4 sm:gap-2 sm:flex-row  `}
                      >
                        <p className="text-base italic font-extrabold uppercase sm:text-lg md:text2xl">
                          {auction?.title}
                        </p>
                        {auction?.isHighestBidder && (
                          <Badge
                            className={
                              "bg-green-600/50 w-fit border border-green-500 rounded-sm  "
                            }
                          >
                            Highest Bidder
                          </Badge>
                        )}
                      </div>
                      {/* highest bidder */}
                      <div className="flex items-center gap-2">
                        <Avatar className="border-2 border-yellow-500 rounded-full cursor-pointer">
                          <AvatarImage
                            className="object-cover"
                            src={auction?.highestBidderPicture}
                            alt="avatar"
                          />
                          <AvatarFallback className="text-white bg-black rounded-full cursor-pointer ">
                            {getInitials(auction?.highestBidderName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <p className="text-base font-semibold ">
                            {auction?.highestBidderName}{" "}
                            {auction?.isHighestBidder && "(You)"}
                          </p>
                          <p className="text-sm">Highest Bid</p>
                        </div>
                      </div>
                      <div className="p-2 text-xl font-bold text-black bg-white rounded-md w-fit">
                        <p> Starting Bid Amount ${auction.startingBid}</p>
                      </div>
                      <div
                        className={`p-2 text-xl font-bold text-white  rounded-md w-fit ${
                          auction?.isHighestBidder
                            ? "bg-green-600/50"
                            : "bg-red-600/50"
                        } `}
                      >
                        <p> Highest Bid Amount ${auction?.highestBidAmount}</p>
                      </div>
                      <div className="flex flex-col items-center p-2 border border-yellow-500 rounded-md w-fit">
                        <p>Remaining Bidders</p>
                        <p className="font-bold text3xl ">
                          {auction?.remainingBidders}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileAnalytics;
