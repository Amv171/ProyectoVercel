'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

const AdminCuentasPage = () => {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstudiantes, setFiltroEstudiantes] = useState(true);
  const [filtroProfesores, setFiltroProfesores] = useState(true);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.log('❌ Token no encontrado');
          return;
        }

        const res = await fetch('https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/user/getAllUsers', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.log('❌ Error al obtener usuarios:', res.status);
          return;
        }

        const data = await res.json();
        console.log('✅ Usuarios recibidos:', data);
        setUsuarios(data);
      } catch (error) {
        console.log('❌ Error en la solicitud:', error.message);
      }
    };

    fetchUsuarios();
  }, []);

  const deleteUsuario = async (user) => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) throw new Error('Token no encontrado');

      const res = await fetch('https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/user/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name,
          mail: user.mail,
        }),
      });

      if (!res.ok) throw new Error('Error al eliminar usuario');
      console.log(`✅ Usuario ${user.name} eliminado`);

      setUsuarios((prev) => prev.filter((u) => u._id !== user._id));
      setPerfilSeleccionado(null);
    } catch (error) {
      console.log('❌ Error al eliminar usuario:', error.message);
    }
  };

  const perfilesFiltrados = usuarios.filter((p) => {
    const coincideBusqueda = p.name?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFiltro =
      (filtroEstudiantes && p.role === 'user') ||
      (filtroProfesores && p.role === 'admin') ||
      (!filtroEstudiantes && !filtroProfesores);
    return coincideBusqueda && coincideFiltro;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Header */}
      <div className="bg-blue-600 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <img src="/images/image.png" alt="Logo UTAD" className="w-24 h-12" />
        </div>
        <div></div>
      </div>

      {/* Título */}
      <div className="px-6 md:px-16 xl:px-32 mt-8 mb-6 flex items-center gap-4">
        <button onClick={() => router.back()} className="text-2xl">←</button>
        <h1 className="text-5xl font-extrabold text-[#0a0a23] leading-none">Gestión de cuentas</h1>
      </div>

      {/* Contenido */}
      <div className="px-6 md:px-16 xl:px-32 flex flex-col lg:flex-row gap-8 flex-1">
        {/* Panel izquierdo */}
        <div className="bg-[#e7ebef] rounded-xl p-6 w-full lg:w-1/2">
          {/* Buscador */}
          <div className="flex items-center gap-2 mb-4">
            <button className="text-xl text-pink-600">↻</button>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar perfil"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-pink-600">🔍</button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setFiltroEstudiantes(!filtroEstudiantes)}
              className={`flex items-center justify-between gap-2 px-4 py-2 rounded-md font-semibold text-sm min-w-[140px] ${filtroEstudiantes ? 'bg-blue-600 text-white' : 'bg-[#e1e4e7] text-black'
                }`}
            >
              ESTUDIANTES
              <span className={filtroEstudiantes ? 'text-white' : 'text-black text-sm'}>⌄</span>
            </button>
            <button
              onClick={() => setFiltroProfesores(!filtroProfesores)}
              className={`flex items-center justify-between gap-2 px-4 py-2 rounded-md font-semibold text-sm min-w-[140px] ${filtroProfesores ? 'bg-blue-600 text-white' : 'bg-[#e1e4e7] text-black'
                }`}
            >
              PROFESORES
              <span className={filtroProfesores ? 'text-white' : 'text-black text-sm'}>⌄</span>
            </button>
          </div>

          {/* Lista de perfiles */}
          <div className="h-80 overflow-y-auto flex flex-col gap-2">
            {perfilesFiltrados.map((perfil) => (
              <div
                key={perfil._id}
                onClick={() => setPerfilSeleccionado(perfil)}
                className={`cursor-pointer p-3 rounded border font-semibold ${perfilSeleccionado?._id === perfil._id
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-white'
                  }`}
              >
                {perfil.name}
              </div>
            ))}
          </div>
        </div>

        {/* Panel derecho */}
        <div className="w-full lg:w-1/2 flex flex-col items-end gap-4">
          <div className="w-full rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-bold text-xl text-[#0a0a23]">PERFIL SELECCIONADO</h2>
            <div className="bg-gray-300 px-4 py-2 rounded font-semibold text-[#0a0a23] uppercase text-sm w-full">
              {perfilSeleccionado ? perfilSeleccionado.name : 'PERFIL'}
            </div>

            <div className="flex justify-end">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
                onClick={() => perfilSeleccionado && deleteUsuario(perfilSeleccionado)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminCuentasPage;

