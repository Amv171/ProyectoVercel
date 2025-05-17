"use client";

import { useRouter } from "next/navigation";

export default function CarruselCategorias({ id, title, route, items }) {
  const router = useRouter();

  return (
    <section className="mt-6" id={id}>
      <h2 className="text-2xl font-bold mb-4 text-black">{title}</h2>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              router.push(`/tfgs/${item.code}?title=${encodeURIComponent(item.title)}`)
            }
            className="cursor-pointer flex-shrink-0 w-48" // ancho fijo para todos
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
    </section>
  );
}
