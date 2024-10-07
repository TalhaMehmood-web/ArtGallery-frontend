import { fetchData } from "@/api/fetchData";
import { useGlobalContext } from "@/context/UserContext";
import { useQuery, useQueryClient } from "react-query";

const useProfileAnalytics = () => {
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();
  const profileData = queryClient.getQueryData(["profile-data", user?._id]);
  const { data, isLoading } = useQuery(
    ["profile-data", user?._id],
    () => fetchData("user/data"),
    {
      enabled: !profileData,
    }
  );

  return { posts: data?.posts, isLoading, auctions: data?.auctions, data };
};

export default useProfileAnalytics;
