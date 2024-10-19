export default function Skeleton() {
  return (
    <>
      <div className="bg-slate-400 h-14 m-2 rounded-lg"></div>
      <div className="grid grid-cols-5 px-2 gap-2">
        <div className=" bg-slate-300 animate-pulse min-h-screen col-span-1 rounded-lg"></div>
        <div className="col-span-4">
          <div className="bg-gray-300 h-24 mb-2 rounded-lg"></div>
          <div className="flex mb-2">
            <div className="bg-slate-300 h-64 rounded-lg w-full"></div>
          </div>
          <div className="flex gap-2 mb-2">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 h-24 rounded-lg w-full"
                ></div>
              ))}
          </div>
          <div className="flex">
            <div className="bg-slate-300 h-64 rounded-lg w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}
