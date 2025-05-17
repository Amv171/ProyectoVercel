"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      router.replace("/home"); // Redirige a /home si hay un token
    } else {
      router.replace("/login"); // Redirige a /login si no hay token
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-center text-blue-600">Redirigiendo...</p>
    </div>
  );
}