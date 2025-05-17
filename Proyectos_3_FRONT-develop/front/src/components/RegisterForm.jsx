import { useState } from "react";

const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldown) return;

    if (termsAccepted) {
      setCooldown(true);
      onRegister(name, email, password);

      setTimeout(() => {
        setCooldown(false);
      }, 10000);
    } else {
      alert("Debes aceptar los términos y condiciones.");
    }
  };

  return (
    <form id="register-form" onSubmit={handleSubmit} className="space-y-6 font-['Arial'] text-[#002147]">
      <div>
        <label htmlFor="name" className="block font-bold text-[#002147]">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-2 border border-[#002147] rounded-md text-black font-bold"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-bold text-[#002147]">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mt-2 border border-[#002147] rounded-md text-black font-bold"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-bold text-[#002147]">Contraseña</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mt-2 border border-[#002147] rounded-md text-black font-bold"
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          className="accent-[#002147]"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
          required
        />
        <label htmlFor="terms" className="text-sm font-bold text-[#002147]">
          He leído y acepto los <a href="#" className="text-blue-600 underline">Términos y Condiciones de Privacidad</a>
        </label>
      </div>
      <button
        type="submit"
        disabled={cooldown}
        className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
      >
        {cooldown ? "Espera..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;
