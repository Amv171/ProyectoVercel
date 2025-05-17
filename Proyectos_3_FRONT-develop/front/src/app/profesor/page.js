"use client";

import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar.jsx";
import Footer from '@/components/Footer';
export default function RepositorioTFG() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("home");
  const [selectedTitulacion, setSelectedTitulacion] = useState(null);
  const [tfgs, setTfgs] = useState([]);
  const [nota, setNota] = useState("");

  const [searchTitulo, setSearchTitulo] = useState("");
  const [searchAño, setSearchAño] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);

  const itemsGrado = [
    { code: "ANIV", title: "Grado en Animación - castellano (ANIV)", image: "/images/f451b0f4a22c6ad1b7bd4d9d4bd9460a.png" },
    { code: "ANIG", title: "Grado en Animación - inglés (ANIG)", image: "/images/f451b0f4a22c6ad1b7bd4d9d4bd9460a.png" },
    { code: "ANIM", title: "Grado en Animación 2012 (ANIM)", image: "/images/f451b0f4a22c6ad1b7bd4d9d4bd9460a.png" },
    { code: "DIRE", title: "Grado en Dirección Internacional de Empresas", image: "/images/image 30.png" },
    { code: "DIDI", title: "Grado en Diseño Digital (DIDI)", image: "/images/48a57c96c02c5cbe9f9694fc4268211c.png" },
    { code: "DVCD", title: "Grado en Diseño Visual de Contenidos Digitales (DVCD)", image: "/images/diseño.png" },
    { code: "DIPI", title: "Grado en Diseño de Productos Interactivos (DIPI)", image: "/images/arte-para-videojuegos.png" },
    { code: "DIPG", title: "Grado en Diseño de Productos Interactivos - inglés (DIPG)", image: "/images/arte-para-videojuegos.png" },
    { code: "INSO", title: "Grado en Ingeniería del Software (INSO)", image: "/images/image 32.png" },
    { code: "IDCD", title: "Grado en Ingeniería en Desarrollo de Contenidos Digitales (IDCD)", image: "/images/ingenieria-de-videojuegos.png" },
    { code: "MACO", title: "Grado en Matemática Computacional (MACO)", image: "/images/image 33.png" }
  ];
  const itemsMaster = [
    { code: "MCRS", title: "Máster Universitario en Computación Gráfica, Realidad Virtual y Simulación (MCRS)", image: "/images/computacion-grafica.png" }
  ];

  const handleTitulacionClick = (item) => {
    setSelectedTitulacion(item);
    setView("detalle");
  };

  useEffect(() => {
    if (selectedTitulacion?.code) {
      const saved = localStorage.getItem(`nota-${selectedTitulacion.code}`);
      setNota(saved || "");
    }
  }, [selectedTitulacion]);

  const guardarNota = () => {
    if (selectedTitulacion?.code) {
      localStorage.setItem(`nota-${selectedTitulacion.code}`, nota);
    }
  };

  const eliminarNota = () => {
    if (selectedTitulacion?.code) {
      localStorage.removeItem(`nota-${selectedTitulacion.code}`);
      setNota("");
    }
  };

  useEffect(() => {
    if (view === "detalle") {
      const fetchTFGs = async () => {
        try {
          const token = localStorage.getItem("jwt");
          const response = await fetch("https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/tfg/getTFGs", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) throw new Error("Error al obtener los TFGs");
          const data = await response.json();
          setTfgs(data);
        } catch (error) {
          console.error("Error:", error.message);
        }
      };
      fetchTFGs();
    }
  }, [view]);

  const CarruselCategorias = ({ title, items, showArrows = false, bordered = false }) => {
    const containerRef = useRef(null);
    const scroll = (dir) => containerRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });

    return (
      <section className={`mt-10 relative px-4 ${bordered ? "bg-white rounded-xl shadow-xl py-6" : ""}`}>
        <h2 className="text-2xl font-bold mb-4 text-black px-4">{title}</h2>
        <div className="relative">
          {showArrows && (
            <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-3 text-xl">←</button>
          )}
          <div ref={containerRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-8">
            {items.map((item, index) => (
              <div key={index} onClick={() => handleTitulacionClick(item)} className="cursor-pointer flex-shrink-0 w-48">
                <div className="w-full h-32 overflow-hidden rounded-lg">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                </div>
                <p className="text-center mt-2 text-black font-semibold text-sm">{item.title}</p>
              </div>
            ))}
          </div>
          {showArrows && (
            <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-3 text-xl">→</button>
          )}
        </div>
      </section>
    );
  };

  const tfgsFiltrados = tfgs
    .filter((doc) => doc.TitulaciónGrado?.toLowerCase() === selectedTitulacion?.code?.toLowerCase())
    .filter((doc) => {
      const tituloMatch = doc.TituloTFG?.toLowerCase().includes(searchTitulo.toLowerCase());
      const añoMatch = searchAño === "" || doc.Año?.toString().includes(searchAño);
      return tituloMatch && añoMatch;
    });

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="min-h-screen bg-[#e6f1ff] p-8">
      {/* HEADER */}
      <div className="bg-[#cce7ff] w-full p-8 rounded-xl shadow-xl">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center h-24 rounded-b-2xl shadow-lg">
          <img src="/images/image.png" alt="Logo UTAD" className="w-24 h-12" />
          <button className="rounded-full overflow-hidden border-2 border-white w-12 h-12">
            <img src="/images/usuario.jpg" className="w-full h-full object-cover" />
          </button>
        </header>

        <div className="mt-8 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-black">Repositorio TFG</h1>
          {view === "detalle" && (
            <button onClick={() => setView("home")} className="text-white bg-blue-600 py-2 px-6 rounded-lg">
              ← Volver
            </button>
          )}
        </div>

        {view === "home" && <SearchBar search={search} setSearch={setSearch} />}
      </div>

      {/* HOME VIEW */}
      {view === "home" && (
        <>
          <CarruselCategorias
            title="GRADO"
            items={itemsGrado.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))}
            showArrows
            bordered
          />
          <CarruselCategorias
            title="MÁSTER"
            items={itemsMaster.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))}
            bordered={false}
          />
        </>
      )}

      {/* DETALLE VIEW */}
      {view === "detalle" && (
        <>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-8 px-8">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTitulo}
              onChange={(e) => setSearchTitulo(e.target.value)}
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm"
            />
            <input
              type="text"
              placeholder="Buscar por año..."
              value={searchAño}
              onChange={(e) => setSearchAño(e.target.value)}
              className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-10 px-8">
            {/* TFGs */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {tfgsFiltrados.length > 0 ? (
                tfgsFiltrados.map((tfg, index) => (
                  <div key={tfg._id || index} className="border rounded-xl shadow-md p-4 bg-white">
                    <h2 className="text-xl font-bold">{tfg.TituloTFG || 'Sin título'}</h2>
                    <p className="text-sm text-gray-600">Alumno: {tfg.Alumno || '-'}</p>
                    <p className="text-sm text-gray-600">Tutor: {tfg.Tutor || '-'}</p>
                    <p className="text-sm text-gray-600">Grado: {tfg.TitulaciónGrado || '-'}</p>
                    <p className="text-sm text-gray-600">Curso: {tfg.Año || '-'}</p>
                    <p className="text-sm text-gray-500">Subido: {tfg.fechaSubida ? new Date(tfg.fechaSubida).toLocaleString() : '-'}</p>

                    {expandedIndex === index && (
                      <div className="mt-2 text-sm text-gray-700 space-y-1">
                        <p><strong>Resumen:</strong> {tfg.Abstract || '-'}</p>
                        {tfg.archivo && (
                          <div className="mt-2 flex gap-4 items-center">
                            <button
                              className="text-blue-500 underline"
                              onClick={() => setPdfURL(tfg.archivo)}
                            >
                              Ver PDF
                            </button>
                            <a
                              href={tfg.archivo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                              download
                            >
                              Descargar PDF
                            </a>
                          </div>
                        )}
                        {Array.isArray(tfg.enlacesExternos) && tfg.enlacesExternos.length > 0 && (
                          <div>
                            <strong>Enlaces externos:</strong>
                            <ul className="list-disc list-inside">
                              {tfg.enlacesExternos.map((link, i) => (
                                <li key={i}>
                                  <a href={link} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                                    {link}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <button className="mt-2 text-blue-500 underline text-sm" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                      {expandedIndex === index ? 'Ver menos' : 'Ver más'}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">No se encontraron TFGs.</p>
              )}
            </div>

            {/* Notas */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg h-fit sticky top-24">
              <h2 className="text-xl font-bold text-black mb-4">Notas personales</h2>
              <textarea
                rows={16}
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Escribe tus notas aquí..."
                className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none shadow-sm"
              />
              <div className="mt-4 flex justify-between">
                <button
                  onClick={guardarNota}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Guardar nota
                </button>
                <button
                  onClick={eliminarNota}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Eliminar nota
                </button>
              </div>
            </div>
          </div>

          {/* PDF Modal */}
          {pdfURL && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white w-[90%] h-[90%] relative rounded shadow-lg overflow-hidden">
                <button onClick={() => setPdfURL(null)} className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded">
                  Cerrar
                </button>
                <iframe
                  src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfURL)}`}
                  width="100%" height="100%" frameBorder="0" className="rounded" title="Visor PDF"
                ></iframe>
              </div>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
