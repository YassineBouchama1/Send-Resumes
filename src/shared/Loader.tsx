const Loader = () => {
  return (
    <div className="absolute flex justify-center items-center flex-col gap-6 bg-black/30 w-full h-full">
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
      <h2 className="text-3xl font-bold">Loading...</h2>
    </div>
  );
};

export default Loader;
