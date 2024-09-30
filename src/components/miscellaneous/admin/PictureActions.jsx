/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import CalendarForm from "@/components/ui/CalenderForm"; // Ensure correct import
import { useMutation } from "react-query";
import { postData } from "@/api/postData"; // Adjust the import path if needed
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "../loading/Loading";
import { toast } from "sonner";

const PictureAuctions = ({ openAuction, setOpenAuction, pictureId }) => {
  const { handleSubmit, setValue } = useForm();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const createAuctionMutation = useMutation(
    (data) => postData("auction", data),
    {
      onSuccess: ({ data }) => {
        if (data) {
          setStartDate(null);
          setEndDate(null);
          setOpenAuction(false);
          toast.success("Congratulations", {
            description: "Picture successfully added to auction",
            position: "top-center",
          });
        }
      },
      onError: (error) => {
        console.error(error);

        toast.error("Error", {
          description: error.response
            ? error?.response?.data?.message
            : "Network Error",
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
    await createAuctionMutation.mutateAsync(auctionData);
  };

  // Ensure selected dates are updated in the form
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setValue("startDate", date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setValue("endDate", date);
  };

  return (
    <>
      <Drawer open={openAuction} onOpenChange={setOpenAuction}>
        <DrawerContent className="  md:p-0 p-3 h-[60%] bg-black text-white border-yellow-500">
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
              <CalendarForm
                label={"Auction Start Date"}
                selectedDate={startDate} // Pass selected date
                onDateChange={handleStartDateChange} // Update state
              />
              <CalendarForm
                label={"Auction End Date"}
                selectedDate={endDate} // Pass selected date
                onDateChange={handleEndDateChange} // Update state
              />
              <Button type="submit" disabled={createAuctionMutation.isLoading}>
                {createAuctionMutation.isLoading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
      {createAuctionMutation.isLoading && (
        <div
          style={{
            zIndex: "100",
          }}
          className="absolute top-0 left-0 w-full min-h-screen"
        >
          {" "}
          <Loading />{" "}
        </div>
      )}
    </>
  );
};

export default PictureAuctions;
