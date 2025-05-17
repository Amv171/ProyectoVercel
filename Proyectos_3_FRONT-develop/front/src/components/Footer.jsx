import React from 'react';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-[#0b0c11] text-white px-6 py-8 text-sm mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 border-b border-gray-600 pb-6">
        
        {/* Columna: Ayuda */}
        <div>
          <h4 className="font-semibold mb-2">AYUDA</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Contacto</a></li>
            <li><a href="#" className="hover:underline">Política de Privacidad</a></li>
            <li><a href="#" className="hover:underline">Notificar una incidencia</a></li>
          </ul>
        </div>

        {/* Columna: Usuario */}
        <div>
          <h4 className="font-semibold mb-2">USUARIO</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Notificaciones</a></li>
            <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
            <li><a href="#" className="hover:underline">Tu cuenta</a></li>
          </ul>
        </div>

        {/* Columna: Contacto */}
        <div>
          <h4 className="font-semibold mb-2">CONTACTA CON NOSOTROS</h4>
          <p>Calle Playa de Liencres, 2 bis – Parque Europa Empresarial</p>
          <a href="mailto:info@utad.com" className="block hover:underline mt-1">info@utad.com</a>
          <p className="mt-1">(+34) 900 373 379</p>
        </div>

        {/* Redes sociales */}
        <div className="flex items-start gap-4 mt-4 md:mt-0">
          <a href="#"><FaLinkedinIn /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><IoIosMail /></a>
          <a href="#"><IoClose /></a>
          <a href="#"><FaYoutube /></a>
        </div>
      </div>

      {/* Parte inferior */}
      <div className="max-w-7xl mx-auto mt-4 flex flex-col md:flex-row justify-between items-center text-xs">
        <span>© U-tad 2025</span>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <img src="/images/image 28.png" alt="UCJC" className="h-6" />
          <img src="/images/vector.png" alt="U-tad" className="h-6" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
