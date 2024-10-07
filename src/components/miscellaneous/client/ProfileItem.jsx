const ProfileItem = ({ header, content }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 p-1 text-white border border-green-600 rounded-md bg-green-600/50 ">
      <p className=" md:text-lg semibold">{header}</p>
      <p className="text-4xl font-extrabold text-center">{content}</p>
    </div>
  );
};

export default ProfileItem;
