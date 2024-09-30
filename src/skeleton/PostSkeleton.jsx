import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="w-[90%] h-[400px]  ">
      <Skeleton className="w-full h-full bg-slate-400 " />
    </div>
  );
};

export default PostSkeleton;
