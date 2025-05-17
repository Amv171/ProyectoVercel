'use client';

import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CoordinadorPage = () => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState('');
  const [notificaciones, setNotificaciones] = useState([]);
  const [tfgs, setTfgs] = useState([]);

  useEffect(() => {
    const fetchTFGs = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("Token no encontrado");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(
          "https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/tfg/getTFGs",
          { headers }
        );
        if (!response.ok) throw new Error("Error al obtener los TFGs");
        const data = await response.json();
        setTfgs(data.slice(0, 8));

        const pendingRes = await fetch(
          "https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/tfg/getPendingTFGs",
          { headers }
        );
        if (!pendingRes.ok) throw new Error("Error al obtener los TFGs pendientes");
        const pendingData = await pendingRes.json();
        setNotificaciones(pendingData);
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
      }
    };

    fetchTFGs();
  }, []);

  const notificacionesFiltradas = notificaciones.filter((tfg) =>
    tfg.TituloTFG?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleValidation = async (titulo, action) => {
    try {
      const token = localStorage.getItem("jwt");
      const endpoint = action === "aceptar"
        ? "https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/tfg/validateTFG"
        : "https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/tfg/invalidateTFG";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ TituloTFG: titulo }),
      });

      if (!res.ok) throw new Error("Error al actualizar el estado del TFG");

      setNotificaciones(prev => prev.filter(tfg => tfg.TituloTFG !== titulo));
    } catch (err) {
      console.error("Error en la validación:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <div className="bg-blue-600 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img src="/images/image.png" alt="Logo UTAD" className="w-24 h-12" />
        </div>
        <div></div>
      </div>

      <div className="px-6 md:px-16 xl:px-32 mt-8 mb-4">
        <div className="flex justify-between items-center">
          <button onClick={() => router.push("/home")} className="text-2xl">←</button>

          <div>
            <button
              onClick={() => router.push('/user')}
              className="rounded-full overflow-hidden border-2 border-blue-600 w-12 h-12 hover:scale-105 transition"
              title="Ir a tu perfil"
            >
              <img src="/images/usuario.jpg" alt="Usuario" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 items-start mt-6">
          <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar TFG pendiente por título..."
                className="w-full border border-gray-300 px-4 py-2 rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-16 xl:px-32 mt-6 flex flex-wrap gap-16 justify-between">
        <div className="w-full md:w-[60%]">
          <h2 className="text-xl font-bold mb-6">TFGs Pendientes</h2>
          <div className="flex flex-col gap-6">
            {notificacionesFiltradas.length > 0 ? (
              notificacionesFiltradas.map((n, i) => (
                <div key={i} className="relative w-full">
                  <div className="h-[5px] bg-gray-700 rounded-t-md w-full mb-[-4px] z-10 relative"></div>
                  <div className="bg-[#e1e4e7] rounded-b-xl p-4 shadow z-0 relative flex justify-between items-start gap-4 flex-wrap">
                    <div>
                      <h3 className="font-bold mb-1">{n.TituloTFG?.trim() || 'TFG sin título'}</h3>
                      <p className="text-sm text-gray-700">Estudiante: {n.Alumno || 'Sin datos'}</p>
                      <p className="text-sm text-gray-700">Docente: {n.Tutor || 'Sin datos'}</p>
                      <p className="text-sm text-gray-500">
                        Subido: {n.fechaSubida ? new Date(n.fechaSubida).toLocaleString() : 'Fecha no disponible'}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-semibold"
                        onClick={() => handleValidation(n.TituloTFG, "aceptar")}
                      >
                        Aceptar
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-semibold"
                        onClick={() => handleValidation(n.TituloTFG, "rechazar")}
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay TFGs pendientes.</p>
            )}
          </div>
        </div>

        <div className="w-full md:w-[35%] flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-center md:text-left">GESTIONAR ACCESO</h2>
          <div className="bg-[#e1e4e7] rounded-xl h-28 flex items-center justify-center text-4xl text-black shadow">🔒</div>
        </div>
      </div>

      <div className="px-6 md:px-16 xl:px-32 mt-10">
        <h2 className="text-xl font-bold mb-3">RECIENTES</h2>
      </div>

      <div className="mt-2 bg-[#e7ebef] px-6 md:px-16 xl:px-32 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {tfgs.map((tfg) => (
            <div key={tfg._id} className="bg-white shadow rounded-xl p-4 border relative">
              <h3 className="font-bold">{tfg.TituloTFG || 'Sin título'}</h3>
              <p className="text-sm">GRADO: {tfg.TitulaciónGrado || '-'}</p>
              <p className="text-sm">DOCENTES: {tfg.Tutor || '-'}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoordinadorPage;
