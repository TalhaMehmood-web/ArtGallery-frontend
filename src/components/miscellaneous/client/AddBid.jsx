/* eslint-disable react/prop-types */
import { postData } from "@/api/postData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useQueryClient } from "react-query";
import AuthButton from "../auth/AuthButton";
const AddBid = ({ openDialog, setOpenDialog, auctionId, basePrice }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      bidAmount: "",
    },
  });
  const queryClient = useQueryClient();
  const addBidMutation = useMutation(
    (data) => postData(`auction/bid/${auctionId}`, data),
    {
      onSuccess: ({ data }) => {
        if (data) {
          toast.success("Your bid price is been added to Auction");
        }
        setOpenDialog(false);
        reset();
        queryClient.invalidateQueries(["bidders", auctionId]);
      },
      onError: (error) => {
        console.log(error);
        toast.error("Failed to add bid price", {
          description: error?.response?.data?.message || error?.response?.data,
          position: "top-center",
        });
      },
    }
  );

  const onSubmit = async (data) => {
    if (Number(basePrice) >= Number(data.bidAmount)) {
      toast.error("Bid amount should be greater than the starting bid amount", {
        description: `Starting bid amount is $${basePrice}`,
      });
      return;
    }

    await addBidMutation.mutateAsync(data);
  };

  const { isLoading } = addBidMutation;
  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] bg-black text-white border-none ">
          <DialogHeader>
            <DialogTitle>Add Your Bid Amount</DialogTitle>
            <DialogDescription>
              Click on submit when you are done.
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex flex-col space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label htmlFor="bidAmount"></label>
              <Input
                className="bg-transparent border border-yellow-500 focus:border-yellow-500 "
                placeholder="$ Enter bid amount "
                type="number"
                {...register("bidAmount", {
                  required: true,
                })}
              />
            </div>
            <AuthButton type="submit">
              {isLoading ? "Submitting" : "Submit"}
            </AuthButton>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBid;
