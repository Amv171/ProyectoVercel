"use client";

import { useState } from 'react';

export default function LoginForm({ onLogin }) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown) return;

    setError('');
    setCooldown(true);
    onLogin(mail, password);

    setTimeout(() => {
      setCooldown(false);
    }, 10000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <img 
          src="/images/Logo-U-tad 1.png" 
          alt="Logo UTAD" 
          className="w-50 h-24"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Correo Electrónico:
        </label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Contraseña:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />
      </div>

      {/* Enlace para registrarse */}
      <div className="text-center">
                <a href="/register" className="text-pink-500 text-sm">
                    Si no estás registrado, regístrate
                </a>
            </div>

      <button
        type="submit"
        disabled={cooldown}
        className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        {cooldown ? "Espera..." : "Iniciar Sesión"}
      </button>
    </form>
  );
}