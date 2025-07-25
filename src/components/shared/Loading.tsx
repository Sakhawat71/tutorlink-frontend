import React from "react";
// import "../../app/spinner.css";

const Loading = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mb-4"></div>
        </div>
    );
};

export default Loading;