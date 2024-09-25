import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

export const Tarjeta = () => {
  const [data] = useState([
    { id: 1, nombre: "Bloque 1", descripcion: "Carnes" },
    { id: 2, nombre: "Bloque 2", descripcion: "Lacteos" },
    { id: 3, nombre: "Bloque 3", descripcion: "Embutidos" },
    { id: 4, nombre: "Bloque 4", descripcion: "Vegetales" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNombre, setSelectedNombre] = useState("");

  const navigate = useNavigate();

  const openModal = (nombre) => {
    setSelectedNombre(nombre);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNombre("");
  };

  const handleVerDetalles = (descripcion) => {
    navigate(`/detalles/${descripcion}`);
  };

  return (
    <>
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="flex justify-center items-center w-full pt-5 pb-5">
          <h1 className="text-2xl md:text-4xl font-semibold text-center">
            Control de temperatura del edificio
          </h1>
        </div>

        {/* Grilla de Tarjetas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 w-full max-w-full sm:max-w-md mx-auto"
            >
              <h2 className=" font-semibold mb-2 text-center text-gray-500">
                {item.nombre}
              </h2>
              <p className="text-black  mb-4 text-2xl  text-center">{item.descripcion}</p>
              <div className="flex justify-between gap-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
                  onClick={() => openModal(item.descripcion)}
                >
                  Registrar
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
                  onClick={() => handleVerDetalles(item.descripcion)}
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedNombre={selectedNombre}
      />
    </>
  );
};
