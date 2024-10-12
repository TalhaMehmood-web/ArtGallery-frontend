/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/UserContext";

const PictureUI = ({ picURL, id, picture }) => {
  const { setSelectedPicture } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="relative flex items-center justify-center p-2 border-4 border-yellow-500 rounded-md img-effect ">
        <img
          onClick={() => {
            navigate(`/admin/pictures/${id}`);
            setSelectedPicture(picture);
          }}
          src={picURL}
          alt="pic"
          className="object-cover w-full h-full transition-all duration-300 shadow-md cursor-pointer hover:scale-95 hover:brightness-90 shadow-yellow-200 aspect-square "
        />
      </div>
    </>
  );
};

export default PictureUI;
