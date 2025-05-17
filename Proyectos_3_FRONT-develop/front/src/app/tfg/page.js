"use client";

import { useRouter } from "next/navigation";
import React from "react";

const TfgPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 h-16 flex items-center justify-between px-6">
        <div></div>
        <button className="bg-white px-3 py-1 rounded text-blue-600 font-bold">
          LOGO
        </button>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1">
        {/* Barra lateral izquierda */}
        <div className="w-16 flex flex-col items-center justify-start pt-6">
          <button onClick={() => router.back()} className="text-2xl">
            ←
          </button>
        </div>

        {/* Visor de PDF */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-md p-4 h-full">
            <iframe
              src="/pdfs/ejemplo-tfg.pdf"
              title="TFG Viewer"
              className="w-full h-[80vh]"
            ></iframe>
          </div>
        </div>

        {/* Barra lateral derecha */}
        <div className="w-16 flex flex-col items-center justify-start pt-6 gap-6 text-pink-500">
          <img src="/icons/bookmark-icon.png" alt="Bookmark" className="w-6 h-6 cursor-pointer" />
          <img src="/icons/send-icon.png" alt="Send" className="w-6 h-6 cursor-pointer" />
          <img src="/icons/warning-icon.png" alt="Report" className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Footer */}
      <div className="h-10 flex justify-start items-center px-6 text-sm text-gray-600 gap-6">
        <span>Lenguaje</span>
        <span>Help</span>
        <span>Términos</span>
      </div>
    </div>
  );
};

export default TfgPage;