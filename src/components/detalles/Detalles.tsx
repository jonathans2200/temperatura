import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Detalles = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { descripcion } = useParams<{ descripcion: string }>();
  useEffect(() => {
    // Aquí simularías la llamada a una API. Usa la URL real si es un servicio remoto.
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/temperatura/obtener/${descripcion}`
        );
        setDatos(respuesta.data);
        setLoading(false);
      } catch (error) {
        setError("No se encontraron datos para este bloque.");
        console.error("Error al obtener los datos", error);
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [descripcion]);
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate(-1); // Navega hacia atrás
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10">
        Temperaturas del bloque {descripcion}
      </h1>

      {loading ? (
        <p className="text-center text-xl">Cargando...</p>
      ) : error ? (
        <p className="text-center text-4xl ">{error}</p>
      ) : datos ? (
        <table className="table-auto w-full text-left bg-white border border-gray-200 ">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left text-black">Temperatura</th>
              <th className="py-3 px-6 text-left text-black">Tipo</th>
              <th className="py-3 px-6 text-left text-black">
                Fecha de Registro
              </th>
            </tr>
          </thead>
          <tbody className="text-black text-sm font-light">
            {datos.map((dato, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className=" py-3 px-6 text-left">{dato.temperatura}</td>
                <td className="py-3 px-6 text-left">{dato.tipo}</td>
                <td className="py-3 px-6 text-left">{dato.fechaRegistro}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-xl">
          No se encontraron datos para este bloque.
        </p>
      )}

      <button
        onClick={handleRegresar}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-10 hover:bg-blue-700"
      >
        Regresar
      </button>
    </div>
  );
};
