import { Skeleton } from "@/components/ui/skeleton";
const PictureSkeleton = () => {
  return (
    <div className="w-[264px] h-[264px]  ">
      <Skeleton className="w-full h-full bg-slate-400 " />
    </div>
  );
};

export default PictureSkeleton;
