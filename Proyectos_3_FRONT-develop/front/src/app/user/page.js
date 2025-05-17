"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Footer from '@/components/Footer';

const UserProfile = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [role, setRole] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const storedName = localStorage.getItem("name") || "";
    const storedMail = localStorage.getItem("mail") || "";
    const storedRole = localStorage.getItem("role") || "";

    setName(storedName);
    setMail(storedMail);
    setRole(storedRole);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const roleLabel = {
    user: "USUARIO",
    teacher: "PROFESOR",
    coord: "COORDINADOR",
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
        }`}
      style={{ fontSize: `${fontSize}%` }}
    >
      {/* Header */}
      <div className={`flex justify-between items-center px-6 py-4 ${darkMode ? "bg-blue-700" : "bg-blue-600"}`}>
        <Link href="/" className="text-white text-lg font-semibold flex items-center gap-2">
          <FiArrowLeft className="text-2xl" />
          Pág. Perfil usuario
        </Link>
        <div className={`bg-white px-2 py-1 rounded-md font-bold`}>
          <img
            src="/images/Logo-U-tad 1.png"
            alt="Logo U-tad"
            className="h-8 w-auto"
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className={`flex-1 w-full px-6 py-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        {/* Perfil */}
        <div className={`flex items-center gap-4 p-6 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}>
          <div className={`w-24 h-24 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-400"}`} />
          <div>
            <h3 className="text-xl font-bold">Hola, {name || "Usuario"}</h3>
            <p className="text-sm">PERFIL {roleLabel[role] || "NO DEFINIDO"}</p>
          </div>
        </div>

        {/* TU CUENTA */}
        <div className="p-6 flex flex-col gap-8">
          <div>
            <h4 className="font-bold mb-2">TU CUENTA</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowEmailPopup(true)}
                className={`px-4 py-2 font-bold rounded ${darkMode ? "bg-gray-600 text-white" : "bg-gray-300"}`}
              >
                CORREO ASOCIADO
              </button>
            </div>
          </div>

          {/* ACCESIBILIDAD */}
          <div>
            <h4 className="font-bold mb-2">ACCESIBILIDAD</h4>

            {/* Modo oscuro */}
            <div className={`mb-4 p-4 rounded-md flex justify-between items-center ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}>
              <span>Activar/desactivar modo oscuro</span>
              <button
                onClick={toggleDarkMode}
                className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${darkMode ? "bg-green-600 justify-end" : "bg-black justify-start"
                  }`}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-md" />
              </button>
            </div>

            {/* Tamaño de letra */}
            <div className={`p-4 rounded-md ${darkMode ? "bg-gray-600" : "bg-[#e6f1ff]"}`}>
              <label className="block text-sm font-semibold mb-1">Tamaño de letra</label>
              <input
                type="range"
                min="80"
                max="150"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full accent-pink-500"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Modal de Correo */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-black">
            <h3 className="text-lg font-bold mb-2">Correo Asociado</h3>
            <p className="mb-4 break-words">{mail}</p>
            <button
              onClick={() => setShowEmailPopup(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
