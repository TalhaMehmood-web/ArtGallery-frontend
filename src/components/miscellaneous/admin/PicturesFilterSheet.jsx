/* eslint-disable react/prop-types */
import { IoFilterSharp } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
const PicturesFilterSheet = ({
  selectedCategory,
  selectedType,
  handleCategoryChange,
  handleTypeChange,
}) => {
  const { data: categories } = useQuery(
    "categories",
    () => fetchData("admin/category"),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <Sheet className="sm:data-[state=closed]">
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 bg-yellow-500 border border-yellow-500 rounded-md hover:opacity-80 focus:bg-yellow-500 focus:text-white w-fit ">
          <IoFilterSharp />
          <p>Apply Filters</p>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="text-white flex flex-col  w-full h-full  bg-black border-none sm:data-[state=closed] "
        side="left"
      >
        <SheetHeader>
          <SheetTitle
            className={
              "text-white text-center border-b border-slate-800 p-2 text-xl font-bold italic "
            }
          >
            Apply Filters
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 overflow-auto divide-y divide-slate-800 gap-y-8 ">
          {/* categories */}
          <div className="flex flex-col gap-4 ">
            <p className="text-lg italic font-bold">Categories</p>

            <RadioGroup
              value={selectedCategory}
              onValueChange={handleCategoryChange}
              className="flex flex-col gap-y-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"all"} id={"all"} />
                <Label className="uppercase" htmlFor={"all"}>
                  {"all"}
                </Label>
              </div>
              {categories?.map((category) => (
                <div
                  key={category?._id}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem value={category?._id} id={category?.name} />
                  <Label className="uppercase" htmlFor={category?.name}>
                    {category?.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {/* picture type */}
          <div className="flex flex-col gap-4 py-6 ">
            <p className="text-lg italic font-bold">Picture Types</p>
            <RadioGroup
              value={selectedType}
              onValueChange={handleTypeChange}
              className="flex flex-col gap-y-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"all"} id={"all"} />
                <Label className="uppercase" htmlFor={"all"}>
                  {"all"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"auction"} id={"auction"} />
                <Label className="uppercase" htmlFor={"auction"}>
                  {"Auction Pictures"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"homePage"} id={"homePage"} />
                <Label className="uppercase" htmlFor={"homePage"}>
                  {"Home Page Pictures"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={"bannerImage"} id={"bannerImage"} />
                <Label className="uppercase" htmlFor={"bannerImage"}>
                  {"Banner Pictures"}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PicturesFilterSheet;
