import { fetchData } from "@/api/fetchData";
import { useGlobalContext } from "@/context/UserContext";
import { useQuery } from "react-query";

const useProfileAnalytics = () => {
  const { user } = useGlobalContext();

  const { data, isLoading } = useQuery(
    ["profile-data", user?._id],
    () => fetchData("user/data"),
    {
      refetchOnWindowFocus:false
    }
  );
console.log(data)
  return { posts: data?.posts, isLoading, auctions: data?.auctions, followers:data?.followers  ,following:data?.following};
};

export default useProfileAnalytics;
