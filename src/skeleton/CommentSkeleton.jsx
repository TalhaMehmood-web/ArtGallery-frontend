import { Skeleton } from "@/components/ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="flex items-start space-x-4">
      <div>
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-24 h-4 rounded-md" />
          <Skeleton className="h-4 rounded-md w-36" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-4 rounded-md" />
          <Skeleton className="w-12 h-4 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
