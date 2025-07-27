export const SpinningFan = () => {
  return (
    <div className="relative w-[263px] h-[263px] border-[6px] border-solid border-[#18A7FB] rounded-full">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             flex items-center justify-center border-[8px] border-solid border-[#262c3a]
             rounded-full w-[150px] h-[150px]">
        <img
          className="w-[100px] h-[100px] object-cover animate-spin"
          src="../../../../public/images/Fan.png"
          alt="Spinning fan"
        />
      </div>
    </div>
  );
};

