import React, { useContext } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

function HashLoadingScreen() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-70">
         <PacmanLoader className="relative flex justify-center " size={30} color="#36d7b7" />
      </div>
    );
}
export default HashLoadingScreen;