// import axios from "axios";

export const SpinningFan = () => {
  // const API_URL: string = import.meta.env.VITE_API_BASE_URL;

  // const updateBalance = () => {
  //   axios.patch(`${ API_URL }/api/click`, {
  //     id_tg: "10",
  //     clicks: 1,
  //   })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // };

  const updateBalance = () => {

  }

  return (
    <div onClick={ () => updateBalance() }
         className="relative w-[263px] h-[263px] border-[6px] border-solid border-[#808080] rounded-full cursor-pointer">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             flex items-center justify-center border-[8px] border-solid border-[#262c3a]
             rounded-full w-[150px] h-[150px]">
        <img
          className="w-[100px] h-[100px] object-cover animate-spin"
          src="/images/Fan.png"
          alt="Spinning fan"
        />
      </div>
    </div>
  );
};
