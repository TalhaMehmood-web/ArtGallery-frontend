import ProfileItem from "@/components/miscellaneous/client/ProfileItem";
import Loading from "@/components/miscellaneous/loading/Loading";
import useProfileAnalytics from "@/hooks/useProfileAnalytics";

const ProfileAnalytics = () => {
  const { data, posts, auctions, isLoading } = useProfileAnalytics();

  return (
    <>
      <div className="flex flex-col w-full min-h-screen gap-2 p-2 overflow-auto border border-yellow-500 sm:p-5 ">
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
        <div className="grid flex-1 grid-cols-1">
          {/* number of posts posted and user who liked */}
          <div className="w-full p-2 border border-black rounded-md "></div>
          <div></div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default ProfileAnalytics;
