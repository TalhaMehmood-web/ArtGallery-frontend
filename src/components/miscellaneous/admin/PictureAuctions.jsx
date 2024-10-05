/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "../loading/Loading";
import { toast } from "sonner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PictureAuctions = ({ openAuction, setOpenAuction, pictureId }) => {
  const { handleSubmit, setValue } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = new Date(); // Get today's date
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set tomorrow's date
  const createAuctionMutation = useMutation(
    (data) => postData("auction", data),
    {
      onSuccess: ({ data }) => {
        if (data) {
          setStartDate(null);
          setEndDate(null);
          setOpenAuction(false);
          toast.success("Picture successfully added to auction", {
            position: "top-center",
          });
        }
      },
      onError: (error) => {
        setStartDate(null);
        setEndDate(null);
        toast.error("Error", {
          description: error?.response?.data?.message || "Network Error",
          position: "top-center",
          duration: 2000,
        });
      },
    }
  );

  const onSubmit = async (data) => {
    const auctionData = {
      pictureId,
      startDate: data.startDate,
      endDate: data.endDate,
    };

    if (!auctionData.startDate || !auctionData.endDate) {
      toast.error("All fields are required :)");
      return;
    }
    await createAuctionMutation.mutateAsync(auctionData);
  };

  return (
    <>
      <Drawer open={openAuction} onOpenChange={setOpenAuction}>
        <DrawerContent className="md:p-0 p-3 h-[60%] bg-black text-white border-yellow-500">
          <div className="w-full h-full max-w-xl mx-auto">
            <DrawerHeader>
              <DrawerTitle>Place your picture to auction</DrawerTitle>
              <DrawerDescription>
                Fill out the details. Click on submit when you are done.
              </DrawerDescription>
            </DrawerHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col min-h-[80%] justify-around"
            >
              <label className="text-lg font-semibold">
                Auction Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setValue("startDate", date); // Update react-hook-form value
                }}
                minDate={today}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 mb-4 text-white bg-transparent border border-yellow-500 rounded-md outline-none cursor-pointer "
                placeholderText="Select start date"
              />

              <label className="text-lg font-semibold">Auction End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setValue("endDate", date); // Update react-hook-form value
                }}
                dateFormat="dd/MM/yyyy"
                className="w-full p-2 mb-4 text-white bg-transparent border border-yellow-500 rounded-md outline-none cursor-pointer "
                placeholderText="Select end date"
                minDate={tomorrow}
              />

              <Button type="submit" disabled={createAuctionMutation.isLoading}>
                {createAuctionMutation.isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
      {createAuctionMutation.isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen">
          <Loading />
        </div>
      )}
    </>
  );
};

export default PictureAuctions;
