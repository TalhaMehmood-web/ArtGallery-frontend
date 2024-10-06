/* eslint-disable react/prop-types */
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CategoryCombobox = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center px-2 border border-yellow-500 rounded-md">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="border-none w-42 "
          >
            {categories?.find((category) => category._id === selectedCategory)
              ? categories.find((category) => category._id === selectedCategory)
                  .name
              : "Select Category..."}
          </Button>
          <ChevronsUpDown className="w-4 h-4 ml-2 text-yellow-500 opacity-50 cursor-pointer shrink-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent className=" w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                onSelect={() => {
                  handleCategoryChange("all");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCategory === "all" ? "opacity-100" : "opacity-0"
                  )}
                />
                All
              </CommandItem>
              {categories?.map((category) => (
                <CommandItem
                  className="cursor-pointer"
                  key={category._id}
                  onSelect={() => {
                    handleCategoryChange(category._id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategory === category._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCombobox;
