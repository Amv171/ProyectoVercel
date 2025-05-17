"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import RegisterForm from "../../components/RegisterForm.jsx";

const Register = () => {
  const router = useRouter();
  const [mail, setEmail] = useState('');
  const [role, setRole] = useState('user'); // Nuevo estado para el rol
  const [showVerification, setShowVerification] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleRegister = async (name, mail, password) => {
    setEmail(mail);
    try {
      console.log("Registrando usuario:", name, mail, password, role);

      const response = await axios.post("https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/auth/register", {
        name,
        mail,
        password,
        role, // Enviamos el rol
      });

      setShowVerification(true);
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert("Error en el registro. Verifique los datos.");
    }
  };

  const handleVerify = async () => {
    try {
      await axios.post("https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/auth/verifyOTP", {
        mail: mail,
        otp: inputCode,
      });
      setVerificationSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      alert("Código incorrecto. Inténtalo de nuevo.");
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post("https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/auth/resendOTP", {
        mail: mail
      });
      alert("Código reenviado con éxito.");
    } catch (error) {
      console.error("Error al reenviar el código:", error);
      alert("No se pudo reenviar el código.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center font-['Arial'] text-[#002147]" style={{ backgroundImage: "url('/images/utad-madrid.png')" }}>
      <img src="/UTAD.png" alt="Logo U-TAD" className="mb-6 w-32" />
      <h2 className="text-2xl font-bold text-center">PRIMERA VEZ</h2>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-[#002147]">
        <RegisterForm onRegister={handleRegister} />
        {/* Selector de rol */}
        <div>
          <label className="block text-sm font-bold mb-2">Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded text-black"
          >
            <option value="user">Usuario</option>
            <option value="coord">Coordinador</option>
            <option value="teacher">Profesor</option>
          </select>
        </div>
      </div>

      {showVerification && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg border border-[#002147]">
            <h3 className="text-xl font-bold">Verificación de Código</h3>
            <p>Se ha enviado un código a {mail}. Ingrésalo a continuación:</p>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full p-2 mt-2 border border-[#002147] rounded-md text-black font-bold"
            />
            <button
              onClick={handleVerify}
              className="w-full mt-4 py-2 px-4 bg-[#002147] text-white font-bold rounded-md hover:bg-[#004080]"
            >
              Verificar
            </button>
            <button
              onClick={handleResendOTP}
              className="w-full mt-2 py-2 px-4 bg-gray-200 text-[#002147] font-bold rounded-md hover:bg-gray-300"
            >
              Reenviar código
            </button>
            {verificationSuccess && (
              <p className="mt-2 text-green-600 font-bold">¡Autenticación exitosa!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
