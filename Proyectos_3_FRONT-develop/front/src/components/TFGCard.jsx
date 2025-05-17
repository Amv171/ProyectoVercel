'use client';

import { useEffect, useState } from 'react';

const endpointMap = {
  approved: '/api/tfg/getTFGs',
  all: '/api/tfg/getAllTFGs',
  pending: '/api/tfg/getPendingTFGs',
};

const TFGCard = ({ filter, degreeCode, customEndpoint, search = "" }) => {
  const [tfgs, setTfgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [pdfURL, setPdfURL] = useState(null);

  useEffect(() => {
    const fetchTFGs = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = customEndpoint
          ? customEndpoint
          : `https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app${endpointMap[filter]}`;

        if (!customEndpoint && degreeCode) {
          url += `?titulacion=${encodeURIComponent(degreeCode)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setTfgs(data);
      } catch (err) {
        setError('Error al cargar los TFGs');
      } finally {
        setLoading(false);
      }
    };

    fetchTFGs();
  }, [filter, degreeCode, customEndpoint]);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Filtrado por término de búsqueda
  const tfgsFiltrados = tfgs.filter(tfg =>
    tfg.TituloTFG?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Cargando TFGs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tfgsFiltrados.map((tfg, index) => (
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
                  <button
                    className="text-blue-500 underline"
                    onClick={() => setPdfURL(tfg.archivo)}
                  >
                    Ver PDF
                  </button>
                </p>
              )}

              {Array.isArray(tfg.enlacesExternos) && tfg.enlacesExternos.length > 0 && (
                <div>
                  <strong>Enlaces externos:</strong>
                  <ul className="list-disc list-inside">
                    {tfg.enlacesExternos.map((link, i) => (
                      <li key={i}>
                        <a href={link} target="_blank" className="text-blue-500 underline" rel="noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
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
      ))}
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

export default TFGCard;
