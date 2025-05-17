"use client";

import Footer from '@/components/Footer';
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CoordinadorCuentasPage = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  return (
    <div className={`min-h-screen flex flex-col justify-between ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header */}
      <div className="bg-blue-600 h-16 flex items-center justify-between px-6">
        <div></div>
        <button className="bg-white px-3 py-1 rounded text-blue-600 font-bold">LOGO</button>
      </div>

      {/* Perfil */}
      <div className="bg-[#e1e4e7] w-full py-6 px-6 md:px-16 xl:px-32 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="text-3xl">←</button>
          <div className="w-28 h-28 bg-gray-400 rounded-full" />
          <div>
            <p className="text-2xl font-bold">NOMBRE&nbsp;&nbsp;&nbsp;APELLIDOS</p>
            <p className="text-base text-gray-600">PERFIL COORDINADOR</p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <main className="px-6 md:px-16 xl:px-32 py-10 grow" style={{ fontSize: `${fontSize}%` }}>
        {/* Tu cuenta */}
        <div className="mb-8 bg-[#e7ebef] p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-4">TU CUENTA</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#dadada] px-4 py-2 rounded font-semibold">CORREO ASOCIADO</button>
            <button className="bg-[#dadada] px-4 py-2 rounded font-semibold">RECUPERAR CONTRASEÑA</button>
            <button className="bg-[#dadada] px-4 py-2 rounded font-semibold">CAMBIO DE CONTRASEÑA</button>
          </div>
        </div>

        {/* Ajustes */}
        <div className="mb-8 bg-[#e7ebef] p-6 rounded-xl">
          <h2 className="font-bold text-lg mb-4">AJUSTES</h2>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#dadada] px-4 py-2 rounded font-semibold">GESTIÓN NOTIFICACIONES</button>
            <button className="bg-[#dadada] px-4 py-2 rounded font-semibold">SOLICITAR AYUDA</button>
          </div>
        </div>

        {/* Accesibilidad */}
        <div className="mb-8">
          <h2 className="font-bold text-lg mb-4">ACCESIBILIDAD</h2>
          <div className="flex flex-col gap-6">
            {/* Modo oscuro */}
            <div className="flex items-center justify-between bg-[#dadada] px-6 py-4 rounded w-full max-w-md">
              <span>Activar/desactivar modo oscuro</span>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-10 h-5 bg-gray-400 rounded-full p-1 transition">
                  <div className={`w-4 h-4 bg-white rounded-full transform transition ${darkMode ? "translate-x-5" : ""}`} />
                </div>
              </label>
            </div>

            {/* Tamaño de fuente */}
            <div className="bg-[#dadada] px-6 py-4 rounded w-full max-w-md flex flex-col">
              <label className="mb-2 font-semibold">Tamaño de letra</label>
              <input
                type="range"
                min="80"
                max="150"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="accent-black"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoordinadorCuentasPage;