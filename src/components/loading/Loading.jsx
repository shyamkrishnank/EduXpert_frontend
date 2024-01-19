import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

function HashLoadingScreen() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 bg-black bg-opacity-70">
         <PropagateLoader className="relative flex justify-center " size={30}  color="#36d7b7" />
         <h1 className="text-success text-2xl mt-7 font-bold">Please Wait...</h1>
      </div>
    );
}
export default HashLoadingScreen;