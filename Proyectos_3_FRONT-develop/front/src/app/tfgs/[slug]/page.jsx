'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GATEWAY = "https://tan-tiny-quail-100.mypinata.cloud/ipfs/";
const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzMzc2MDM5MC01Y2YwLTQzYmEtOGFjYy1mZDFmYmEyMDI1NzMiLCJlbWFpbCI6InAzYWFhYXJuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhMmRjODEzNTk2YzIyNmVkOGIxZiIsInNjb3BlZEtleVNlY3JldCI6IjZiOTA5NTIwOTAzNTM2ZWVkYzc1OWVkZmM4ZjkwNTRkN2Q0ZTEyZDk3MjQyYzQzMzUyYzEwZjJmNzc3ZDIzNWUiLCJleHAiOjE3NzYzNTE0Njh9.1c3Ua6BqKWIe_OeId3KjRN16bvPzF_x2Ru_lUbS74lg";

const TitulacionPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const rawSlug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const titleFromQuery = searchParams.get("title");
  const title = titleFromQuery
    ? decodeURIComponent(titleFromQuery)
    : decodeURIComponent(rawSlug);

  const [searchTitulo, setSearchTitulo] = useState("");
  const [searchAño, setSearchAño] = useState("");
  const [orden, setOrden] = useState("");
  const [tfgs, setTfgs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    palabrasClaves: '',
    resumen: '',
    archivo: null,
    año: '',
    tutor: '',
  });

  useEffect(() => {
    const fetchTFGs = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(
          "https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/tfg/getTFGs",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Error al obtener los TFGs");
        const data = await response.json();
        setTfgs(data);
      } catch (error) {
        console.error("Error al obtener TFGs:", error.message);
      }
    };
    fetchTFGs();
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.archivo) return alert("Por favor, sube un archivo PDF.");
    try {
      const uploadForm = new FormData();
      uploadForm.append("file", formData.archivo);
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        body: uploadForm,
        headers: { Authorization: `Bearer ${PINATA_JWT}` },
      });

      const data = await res.json();
      if (!res.ok) {
        alert("Error al subir el archivo: " + (data.error || "Desconocido"));
        return;
      }
      const ipfsLink = `${GATEWAY}${data.IpfsHash}`;

      await axios.post(
        "https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/tfg/createTFG",
        {
          TituloTFG: formData.titulo,
          Año: formData.año || "22/23",
          TitulaciónGrado: rawSlug,
          Tutor: formData.tutor,
          Abstract: formData.resumen,
          archivo: ipfsLink,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      alert("TFG subido exitosamente.");
      setShowModal(false);
    } catch (err) {
      console.error("Error al subir archivo o guardar TFG:", err);
      alert("Error al procesar la subida.");
    }
  };

  const tfgsFiltrados = tfgs
    .filter((doc) => doc.TitulaciónGrado?.toLowerCase() === rawSlug?.toLowerCase())
    .filter((doc) => {
      const tituloMatch = doc.TituloTFG?.toLowerCase().includes(searchTitulo.toLowerCase());
      const añoMatch = searchAño === "" || doc.Año?.toString().includes(searchAño);
      return tituloMatch && añoMatch;
    })
    .sort((a, b) => {
      if (orden === "recientes") return new Date(b.fechaSubida) - new Date(a.fechaSubida);
      if (orden === "antiguos") return new Date(a.fechaSubida) - new Date(b.fechaSubida);
      if (orden === "alfabetico") return a.TituloTFG?.localeCompare(b.TituloTFG);
      return 0;
    });

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-blue-600 w-full h-20 flex justify-between items-center px-6">
        <button className="bg-white px-4 py-1 rounded shadow">
          <img src="/images/Logo-U-tad 1.png" alt="Logo U-tad" className="h-8" />
        </button>
      </div>

      <div className="flex items-center justify-between px-8 md:px-16 xl:px-32 mt-6">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-2xl">←</button>
          <h1 className="text-6xl font-black text-[#0a0a23] tracking-tight leading-none">{title}</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg"
        >
          Añadir TFG
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 mt-8 px-8">
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Input de búsqueda */}
          <div className="relative w-full md:w-[50%]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTitulo}
              onChange={(e) => setSearchTitulo(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2 flex-wrap">
            <select
              value={searchAño}
              onChange={(e) => setSearchAño(e.target.value)}
              className="border border-blue-600 rounded px-4 py-2 bg-white text-black focus:outline-none"
            >
              <option value="">Año</option>
              <option value="22/23">22/23</option>
              <option value="23/24">23/24</option>
            </select>

            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="border border-blue-600 rounded px-4 py-2 bg-white text-black focus:outline-none"
            >
              <option value="">Orden</option>
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
              <option value="alfabetico">A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de TFGs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-8 md:px-16 xl:px-32">
        {tfgsFiltrados.length > 0 ? (
          tfgsFiltrados.map((tfg, index) => (
            <div key={tfg._id || index} className="border rounded-xl shadow-md p-4 bg-white">
              <h2 className="text-xl font-bold">{tfg.TituloTFG || 'Sin título'}</h2>
              <p className="text-sm text-gray-600">Alumno: {tfg.Alumno || '-'}</p>
              <p className="text-sm text-gray-600">Tutor: {tfg.Tutor || '-'}</p>
              <p className="text-sm text-gray-600">Grado: {tfg.TitulaciónGrado || '-'}</p>
              <p className="text-sm text-gray-600">Curso: {tfg.Año || '-'}</p>
              <p className="text-sm text-gray-500">
                Subido: {tfg.fechaSubida ? new Date(tfg.fechaSubida).toLocaleString() : '-'}
              </p>

              {expandedIndex === index && (
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p><strong>Resumen:</strong> {tfg.Abstract || '-'}</p>
                  {tfg.archivo && (
                    <p className="mt-2">
                      <strong>Archivo:</strong>{' '}
                      <button className="text-blue-500 underline" onClick={() => setPdfURL(tfg.archivo)}>
                        Ver PDF
                      </button>
                    </p>
                  )}
                </div>
              )}
              <button
                className="mt-2 text-blue-500 underline text-sm"
                onClick={() => toggleExpand(index)}
              >
                {expandedIndex === index ? 'Ver menos' : 'Ver más'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10 col-span-full">
            No se encontraron TFGs para esta titulación.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-xl text-gray-500"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-center mb-6">Añadir TFG</h2>
            <form onSubmit={handleSubmit}>
              {["titulo", "palabrasClaves", "resumen", "tutor"].map((campo) => (
                <div className="mb-4" key={campo}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{campo}</label>
                  {campo === "resumen" ? (
                    <textarea
                      name={campo}
                      value={formData[campo]}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      name={campo}
                      value={formData[campo]}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                    />
                  )}
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Archivo PDF</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-lg">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visor PDF */}
      {pdfURL && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] h-[90%] relative rounded shadow-lg overflow-hidden">
            <button
              onClick={() => setPdfURL(null)}
              className="absolute top-2 right-2 text-white bg-red-600 px-3 py-1 rounded"
            >
              Cerrar
            </button>
            <iframe
              src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfURL)}`}
              width="100%"
              height="100%"
              frameBorder="0"
              className="rounded"
              title="Visor PDF"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TitulacionPage;
