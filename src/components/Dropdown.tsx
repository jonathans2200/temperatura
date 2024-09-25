import  { useState } from 'react';

const DropdownComponent = () => {
  // Lista de bloques, podrías obtener esto de una API o props
  const bloques = ['Celsius', 'Farhenheit'];

  // Estado para almacenar el bloque seleccionado
  const [bloqueSeleccionado, setBloqueSeleccionado] = useState('');

  // Función para manejar el cambio en el dropdown
  const handleChange = (event) => {
    setBloqueSeleccionado(event.target.value);
  };

  return (
    <div  className='mb-5'>
      <label htmlFor="bloques" className="block mb-2 text-sm font-medium text-gray-700">
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
  );
};

export default DropdownComponent;