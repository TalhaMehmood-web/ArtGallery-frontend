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
      staleTime: 50000,
      refetchOnMount: false,
    }
  );

  return { posts: data?.posts, isLoading, auctions: data?.auctions, data };
};

export default useProfileAnalytics;
