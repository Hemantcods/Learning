const ProjectCard = (props) => {
  return (
    <>
      <div className="w-1/2 group h-full bg-blue-300 transition-all hover:rounded-[50px] overflow-hidden relative">
        <img className="h-full w-full object-cover" src={props[0]} alt="" />
        <div className="absolute transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center top-0 left-0 h-full w-full bg-black/10">
          <h2 className="uppercase text-5xl font-[font1] border-3 rounded-full pt-2 px-5 border-white ">
            see the project
          </h2>
        </div>
      </div>
      <div className="w-1/2 group h-full bg-blue-300 transition-all hover:rounded-[50px] overflow-hidden relative">
        <img className="h-full w-full object-cover" src={props[1]} alt="" />
        <div className="absolute transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center top-0 left-0 h-full w-full bg-black/10">
          <h2 className="uppercase text-5xl font-[font1] border-3 rounded-full pt-2 px-5 border-white ">
            see the project
          </h2>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
