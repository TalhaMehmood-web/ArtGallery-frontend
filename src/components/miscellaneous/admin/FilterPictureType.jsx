/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterPictureType = ({ onChange }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Picture Type" />
      </SelectTrigger>
      <SelectContent className="z-50 ">
        <SelectGroup>
          <SelectLabel>Picture Type</SelectLabel>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="auction">Auction Picture</SelectItem>
          <SelectItem value="homePage">Home Page Pictures</SelectItem>
          <SelectItem value="bannerImage">Banner Pictures</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FilterPictureType;
