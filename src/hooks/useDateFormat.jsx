import { useEffect ,useState} from "react";
import { formatDistanceToNow } from "date-fns";
const useDateFormat = (date) => {
    const [timeAgo, setTimeAgo] = useState("");
    useEffect(() => {
        const updateTimeAgo = () => {
          if (date) {
            setTimeAgo(
              formatDistanceToNow(new Date(date), { addSuffix: true })
            );
          }
        };
        // Update the timeAgo every minute to reflect time changes
        updateTimeAgo();
        const intervalId = setInterval(updateTimeAgo, 60000); // 60,000 ms = 1 minute
    
        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }, [date]);
  return{timeAgo}
}

export default useDateFormat;
