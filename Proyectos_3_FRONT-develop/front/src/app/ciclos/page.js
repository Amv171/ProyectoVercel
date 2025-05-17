"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SearchBar from "../../components/SearchBar.jsx";

const TitulacionPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [fecha, setFecha] = useState("");
  const [titulo, setTitulo] = useState("");
  const [palabrasClave, setPalabrasClave] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const documents = [
    {
      id: 1,
      title: "Investigación en IA",
      keywords: "IA, Machine Learning, Redes Neuronales",
      summary:
        "Este trabajo explora el uso de redes neuronales profundas en el reconocimiento de patrones.",
    },
    {
      id: 2,
      title: "Blockchain y Seguridad",
      keywords: "Blockchain, Seguridad, Criptografía",
      summary:
        "Estudio de cómo la blockchain puede mejorar la seguridad en transacciones digitales.",
    },
    {
      id: 3,
      title: "Big Data en Medicina",
      keywords: "Big Data, Medicina, Diagnóstico, Datos clínicos",
      summary:
        "Análisis del uso de grandes volúmenes de datos en diagnósticos médicos automatizados.",
    },
    {
      id: 4,
      title: "Realidad Virtual en la Educación",
      keywords: "Realidad Virtual, Educación, Simulación",
      summary:
        "Diseño de un entorno educativo inmersivo para mejorar el aprendizaje práctico de alumnos de secundaria.",
    },
    {
      id: 5,
      title: "Videojuegos como herramienta terapéutica",
      keywords: "Videojuegos, Salud mental, Gamificación",
      summary:
        "Evaluación del impacto positivo de los videojuegos en el tratamiento de trastornos de ansiedad y depresión.",
    },
    {
      id: 6,
      title: "Diseño UX para aplicaciones móviles",
      keywords: "UX, UI, Diseño, Apps móviles",
      summary:
        "Estudio de buenas prácticas y patrones de diseño centrados en la experiencia de usuario móvil.",
    },
    {
      id: 7,
      title: "Desarrollo de una App de Reciclaje Inteligente",
      keywords: "Reciclaje, App, Medio ambiente, Geolocalización",
      summary:
        "Creación de una app que localiza puntos de reciclaje y ofrece recompensas por reciclar correctamente.",
    },
    {
      id: 8,
      title: "Reconocimiento de emociones con visión artificial",
      keywords: "Visión artificial, Emociones, Reconocimiento facial",
      summary:
        "Desarrollo de un sistema que detecta emociones a partir de expresiones faciales en tiempo real.",
    },
    {
      id: 9,
      title: "Animación 3D para cuentos infantiles",
      keywords: "Animación, 3D, Educación infantil, Narrativa visual",
      summary:
        "Producción de un corto animado basado en un cuento original para fomentar la lectura en niños.",
    },
    {
      id: 10,
      title: "Aplicación web para la gestión de TFGs",
      keywords: "TFG, Web, Gestión, Universidades",
      summary:
        "Desarrollo de una plataforma para el registro, seguimiento y evaluación de trabajos fin de grado.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 w-full h-20 flex justify-end items-center px-6">
        <button className="bg-white px-4 py-1 rounded shadow text-blue-600">
          LOGO
        </button>
      </div>

      {/* Título y navegación */}
      <div className="flex items-center justify-between px-8 md:px-16 xl:px-32 mt-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-2xl">←</button>
          <h1 className="text-6xl font-black text-[#0a0a23] tracking-tight leading-none">
            Titulación
          </h1>
        </div>
        <img src="/images/user-logo.png" alt="User" className="w-12 h-12 rounded-full" />
      </div>

      {/* Search + botones */}
      <div className="flex items-center justify-between px-8 md:px-16 xl:px-32 mt-6 flex-wrap gap-4">
        <SearchBar search={searchTerm} setSearch={setSearchTerm} />
        <div className="flex gap-4">
          <button>
            <img src="/icons/bookmark-icon.png" alt="Favoritos" className="w-6 h-6" />
          </button>
          <button onClick={() => setShowFilter(!showFilter)}>
            <img src="/icons/filter-icon.png" alt="Filtro" className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Filtros */}
      {showFilter && (
        <div className="bg-gray-100 p-6 rounded-xl shadow-md max-w-xl mx-auto mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Fecha</label>
            <input
              type="text"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-2 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Título del trabajo</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="mt-2 p-2 w-full border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Palabras clave</label>
            <input
              type="text"
              value={palabrasClave}
              onChange={(e) => setPalabrasClave(e.target.value)}
              className="mt-2 p-2 w-full border rounded"
            />
          </div>
        </div>
      )}

      {/* Tarjetas de documentos */}
      <div className="flex flex-col gap-6 mt-10 px-8 md:px-16 xl:px-32">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-[#e6f1ff] p-6 rounded-xl shadow-md relative">
            <div className="absolute top-4 right-4 flex gap-4">
              <img src="/icons/send-icon.png" alt="Enviar" className="w-5 h-5 cursor-pointer" />
              <img src="/icons/bookmark-icon.png" alt="Guardar" className="w-5 h-5 cursor-pointer" />
            </div>
            <p className="text-xl font-bold text-black mb-2">{doc.title}</p>
            <p className="text-sm">
              <span className="font-bold">Palabras claves:</span> {doc.keywords}
            </p>
            <p className="text-sm mt-2">
              <span className="font-bold">Resumen:</span> {doc.summary}
              <span className="text-blue-600 ml-2 cursor-pointer hover:underline">
                ... Leer Más
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-20">
        <div className="relative bg-blue-600 h-20 w-full">
          <div className="absolute top-[-32px] left-6 text-sm text-gray-500 flex gap-8">
            <span>Language</span>
            <span>Help</span>
            <span>Terms of Use</span>
          </div>
          <div className="absolute bottom-3 right-6">
            <button className="bg-white px-4 py-1 rounded shadow text-blue-600">
              LOGO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitulacionPage;