import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useQuery } from "react-query";
import { fetchData } from "@/api/fetchData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BiddersSheet from "@/components/miscellaneous/client/BiddersSheet";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import Loading from "@/components/miscellaneous/loading/Loading";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
const Orders = () => {
  const {
    data: auctions,
    isLoading,
    error,
  } = useQuery("bids", () => fetchData("auction/bids"), {
    refetchOnWindowFocus: false,
  });

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const columns = [
    {
      accessorKey: "checkbox",
      header: "Select", // Updated to display correctly
      cell: ({ row }) => (
        <Checkbox
          checked={selectedAuction?._id === row.original._id}
          onCheckedChange={() => handleRowSelectionChange(row)}
        />
      ),
      enableSorting: false, // Disable sorting for checkbox column
    },
    {
      accessorKey: "_id",
      header: "Auction ID",
      cell: ({ row }) => row.original._id,
    },
    {
      accessorKey: "startingBid",
      header: "Starting Bid",
      cell: ({ row }) => `$${row.original.startingBid}`,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => {
        const endDate = new Date(row.original.endDate);
        const now = Date.now();

        return endDate.getTime() < now
          ? "Auction Ended"
          : endDate.toLocaleDateString();
      },
    },
    {
      accessorKey: "numberOfBidders",
      header: "Number of Bidders",
      cell: ({ row }) => row.original.numberOfBidders,
    },
    {
      accessorKey: "highestBidderName",
      header: "Highest Bidder Name",
      cell: ({ row }) => row.original.highestBidderName || "N/A",
    },
    {
      accessorKey: "highestBidderEmail",
      header: "Highest Bidder Email",
      cell: ({ row }) => row.original.highestBidderEmail || "N/A",
    },
    {
      accessorKey: "highestBid",
      header: "Highest Bid",
      cell: ({ row }) =>
        row.original.highestBid ? `$${row.original.highestBid}` : "No Bids",
    },
  ];

  const handleRowSelectionChange = (row) => {
    const auction = row.original;
    setSelectedAuction(
      (prevSelectedAuction) =>
        prevSelectedAuction?._id === auction._id ? null : auction // Toggle selection
    );
  };

  const handleViewAllBiddersClick = () => {
    if (!selectedAuction) {
      toast.error("Select auction first to view details", {
        description: "Click on Checkbox",
        position: "top-center",
      });
      return;
    }
    setSheetOpen(true);
  };

  const handleSheetClose = () => {
    setSheetOpen(false);
    setSelectedAuction(null); // Clear selection when the sheet closes
  };

  const table = useReactTable({
    data: auctions || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const filterByEmailOrName = (value) => {
    table.getColumn("highestBidderEmail")?.setFilterValue(value);
    table.getColumn("highestBidderName")?.setFilterValue(value);
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading data</div>;

  return (
    <>
      {auctions?.length === 0 ? (
        <div className="flex items-center justify-center flex-1 flex-grow w-full min-h-full ">
          <p className="text-xl italic font-semibold md:font-bold md:text-3xl">
            No Order placed yet
          </p>
        </div>
      ) : (
        <div className="w-full p-5">
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-4">
            <Input
              placeholder="Filter by name or email..."
              onChange={(event) => filterByEmailOrName(event.target.value)}
              className="col-span-4 border border-yellow-500 md:max-w-full md:col-span-2"
            />
            {/* button for sheet */}
            <div className="flex flex-row space-x-2">
              <Button
                className={`text-sm w-fit text-white col-span-1  bg-yellow-500 ${
                  !selectedAuction
                    ? " opacity-50 hover:bg-yellow-500 hover:text-white focus:text-white focus:bg-yellow-500 "
                    : ""
                }`}
                onClick={handleViewAllBiddersClick}
              >
                View All Bidders
              </Button>
              <Button
                variant="destructive"
                className={`flex flex-row items-center space-x-2  ${
                  !selectedAuction
                    ? " opacity-50  hover:bg-red-500 hover:text-white focus:text-white focus:bg-red-500 "
                    : ""
                }`}
                onClick={() => alert(selectedAuction?._id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {/* columns */}
            <div className="flex items-end justify-end w-full col-span-3 md:col-span-1 ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="border border-yellow-500 1"
                  align="end"
                >
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Table>
            <TableCaption>A list of auctions and highest bids</TableCaption>
            <TableHeader className="bg-black">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <ArrowUpDown
                          onClick={() => header.column.toggleSorting()}
                          size={15}
                          className="text-center cursor-pointer"
                        />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={
                      selectedAuction?._id === row.original._id
                        ? "bg-gray-200"
                        : ""
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {selectedAuction && (
            <BiddersSheet
              selectedAuction={selectedAuction}
              isOpen={isSheetOpen}
              onClose={handleSheetClose}
            />
          )}

          <div className="flex items-center justify-end py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
