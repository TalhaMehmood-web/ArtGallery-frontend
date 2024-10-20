/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/context/UserContext";

const PictureUI = ({ picture }) => {
  const { setSelectedPicture } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <>
      <img
        onClick={() => {
          navigate(`/admin/pictures/${picture?._id}`);
          setSelectedPicture(picture);
        }}
        className="w-full mx-auto masonry-item"
        src={picture.picture}
        alt={`Image ${picture?._id}`}
      />
    </>
  );
};

export default PictureUI;
