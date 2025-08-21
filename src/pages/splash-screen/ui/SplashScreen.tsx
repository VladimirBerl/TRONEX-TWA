import PropagateLoader from "react-spinners/PropagateLoader";
// import { useEffect, useState } from "react";

export const SplashScreen = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 300);
  //
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {/*{isLoading && <PropagateLoader color="#18a8fb" size={10} />}*/}
      <PropagateLoader color="#18a8fb" size={10} />
    </div>
  );
};
