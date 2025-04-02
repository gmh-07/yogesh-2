import React, { useState } from "react";

const AiCustomizer = () => {
  const [activeTab, setActiveTab] = useState("tshirt");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {/* Tab Bar */}
      <div className="flex space-x-4 bg-white p-2 rounded-lg shadow-md">
        <button
          onClick={() => setActiveTab("tshirt")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "tshirt" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          T-Shirt Customizer
        </button>
        <button
          onClick={() => setActiveTab("mug")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "mug" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Mug Customizer
        </button>
      </div>

      {/* Content */}
      <div className="w-[100vw] max-w-7xl h-[90vh] bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 mt-4">
        {activeTab === "tshirt" ? (
          <iframe
            src="https://jinx3d.netlify.app/"
            className="w-full h-full border-none"
          ></iframe>
        ) : (
          <iframe
            src="https://civilizen.com/code/Cup_customizer/"
            className="w-full h-full border-none"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default AiCustomizer;
