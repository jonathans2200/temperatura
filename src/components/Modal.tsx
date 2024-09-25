import axios from "axios";
import { useState } from "react";


const Modal = ({ isOpen, onClose, selectedNombre }) => {
  const [temperatura, setTemperatura] = useState(""); // Corregido el uso de useState
  const bloques = ["Celsius", "Fahrenheit"];
  const [bloqueSeleccionado, setBloqueSeleccionado] = useState("");
  const handleChange = (event) => {
    setBloqueSeleccionado(event.target.value);
  };

  const handleRegistrar = async (nombre, temperatura, tipo) => {
    try {
      // Hacer la solicitud POST a la API
      const response = await axios.post(
        "http://localhost:8081/temperatura/registrar",
        {
          bloque: nombre,
          temperatura: temperatura,
          tipo: tipo,
        }
      );

      // Manejar la respuesta de la API
      console.log("Registro exitoso:", response.data);
      alert("Registro exitoso");
      
    } catch (error) {
      // Manejar el error
      console.error("Error al registrar:", error);
      alert("Error al registrar");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página al hacer submit
    handleRegistrar(selectedNombre, temperatura, bloqueSeleccionado);
  onClose()
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-[25%] h-[45%] overflow-y-auto mx-auto relative">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Registro de temperatura
        </h2>
        <form
          className="pr-3 pl-3 w-auto justify-center text-start"
          onSubmit={handleSubmit} // Manejar el submit del formulario
        >
          <div className="mb-5">
            <label
              htmlFor="temperatura"
              className="block mb-4 text-sm font-medium text-gray-500"
            >
              Ingrese la temperatura:
            </label>
            <input
              type="number" // Usar el tipo 'number' para temperatura
              id="temperatura"
              value={temperatura}
              onChange={(e) => setTemperatura(e.target.value)} // Actualizar el estado
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Ingrese la temperatura en Celsius"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="bloques"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Selecciona un bloque:
            </label>
            <select
              id="bloques"
              value={bloqueSeleccionado}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Selecciona un bloque</option>
              {bloques.map((bloque, index) => (
                <option key={index} value={bloque}>
                  {bloque}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-row justify-center">
            <button
              type="submit" // Cambiar el botón a 'submit' para manejar el submit
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
            >
              Submit
            </button>
            <button
              type="button" // Cambiar tipo de botón para que no dispare el submit del form
              onClick={onClose} // Cerrar modal
              className="text-white ml-4 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
            >
              Cerrar
            </button>
          </div>
        </form>
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;
