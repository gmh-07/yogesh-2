import React from "react";

const AiCustomizer = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-[95vw] max-w-5xl h-[90vh] bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
        <iframe
          src="https://jinx3d.netlify.app/"
          className="w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  );
};

export default AiCustomizer;
