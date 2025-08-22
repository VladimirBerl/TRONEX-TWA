import PropagateLoader from "react-spinners/PropagateLoader";

export const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <PropagateLoader color="#18a8fb" size={10} />
    </div>
  );
};
