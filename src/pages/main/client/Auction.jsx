import { fetchData } from "@/api/fetchData";
import { useQuery } from "react-query";
import AuctionItem from "@/components/miscellaneous/client/AuctionItem";
import Loading from "@/components/miscellaneous/loading/Loading";

const Auction = () => {
  const { data: auctions, isLoading: auctionLoading } = useQuery(
    "auctions",
    () => fetchData("auction"),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div className="relative flex flex-1 w-full min-h-full p-4 flex-gow ">
        {auctions?.length === 0 ? (
          <div className="flex items-center justify-center flex-1 flex-grow">
            <p>No art placed in auction yet</p>
          </div>
        ) : (
          <div className="w-full grid-cols-1 gap-4 justify-items-center">
            {auctions?.map((item, index) => (
              <AuctionItem key={item?._id + index} item={item} />
            ))}
          </div>
        )}
      </div>
      {auctionLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Auction;
