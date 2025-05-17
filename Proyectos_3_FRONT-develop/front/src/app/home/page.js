"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../../components/SearchBar.jsx";
import Footer from '@/components/Footer';

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

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

  return (
    <div className="min-h-screen bg-[#e6f1ff] p-8">
      <div className="bg-[#cce7ff] w-full p-8 rounded-xl shadow-xl">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center w-full max-w-screen h-24 rounded-b-2xl shadow-lg">
        <div className={`bg-white px-2 py-1 rounded-md font-bold`}>
          <img
            src="/images/Logo-U-tad 1.png"
            alt="Logo U-tad"
            className="h-8 w-auto"
          />
        </div>
        </header>
        <div className="mt-8 flex justify-between items-center w-full">
          <h1 className="text-4xl font-bold text-black font-montserrat">Repositorio TFG</h1>
          <button
            onClick={() => router.push('/user')}
            className="rounded-full overflow-hidden border-2 border-blue-600 w-12 h-12 hover:scale-105 transition"
            title="Ir a tu perfil"
          >
            <img src="/images/usuario.jpg" alt="Usuario" className="w-full h-full object-cover" />
          </button>

        </div>
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      <CarruselCategorias
        id="grado-carousel"
        title="GRADO"
        items={itemsGrado.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))}
        showArrows={true}
        bordered={true}
      />

      <CarruselCategorias
        id="master-carousel"
        title="MASTER"
        items={itemsMaster.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))}
        showArrows={false}
        bordered={false}
      />

     <Footer />
    </div>
  );
}

function CarruselCategorias({ id, title, items, showArrows = false, bordered = false }) {
  const router = useRouter();
  const containerRef = useRef(null);

  const scroll = (dir) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    }
  };

  return (
    <section className={`mt-10 relative px-4 ${bordered ? "bg-white rounded-xl shadow-xl py-6" : ""}`}>
      <h2 className="text-2xl font-bold mb-4 text-black px-4">{title}</h2>
      <div className="relative">
        {showArrows && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-3 text-xl"
          >
            ←
          </button>
        )}
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-8"
        >
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(`/tfgs/${item.code}?title=${encodeURIComponent(item.title)}`)}
              className="cursor-pointer flex-shrink-0 w-48"
            >
              <div className="w-full h-32 overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <p className="text-center mt-2 text-black font-semibold text-sm">{item.title}</p>
            </div>
          ))}
        </div>
        {showArrows && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-3 text-xl"
          >
            →
          </button>
        )}
      </div>
    </section>
  );
}
