"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (mail, password) => {
    try {
      const response = await fetch("https://educational-thomasa-u-tad-p-3-9572ccaa.koyeb.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });

      if (!response.ok) throw new Error("Login fallido");

      const data = await response.json();
      const { token, user } = data;

      if (!token || !user || !user.name || !user.mail || !user.role) {
        throw new Error("Datos incompletos desde el servidor");
      }

      localStorage.setItem("jwt", token);
      localStorage.setItem("mail", user.mail);
      localStorage.setItem("name", user.name);
      localStorage.setItem("role", user.role);

      if (user.role === "coord") {
        router.push("/coordinador");
      } else if (user.role === "teacher") {
        router.push("/profesor");
      } else if (user.role === "user") {
        router.push("/home");
      }
      else if (user.role === "admin") {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/utad-madrid.png')" }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded shadow-md w-full max-w-md backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión</h2>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
