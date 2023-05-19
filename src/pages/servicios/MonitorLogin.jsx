import React, { useState } from 'react';

const EjemploTabla = () => {
  // Datos de ejemplo
  const datos = [
    { id: 1, nombre: 'Producto 1', fechaCreacion: '2023-05-17' },
    { id: 2, nombre: 'Producto 2', fechaCreacion: '2023-05-18' },
    { id: 3, nombre: 'Producto 3', fechaCreacion: '2023-05-18' },
    { id: 4, nombre: 'Producto 4', fechaCreacion: '2023-05-19' },
  ];

  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [datosOrdenados, setDatosOrdenados] = useState(datos);

  // Función para ordenar los datos por nombre
  const ordenarPorNombre = () => {
    const datosOrdenados = [...datos].sort((a, b) => {
      if (a.nombre < b.nombre) return ordenAscendente ? -1 : 1;
      if (a.nombre > b.nombre) return ordenAscendente ? 1 : -1;
      return 0;
    });

    setOrdenAscendente(!ordenAscendente);
    setDatosOrdenados(datosOrdenados);
  };

  // Agrupar los datos por fecha de creación
  const datosAgrupados = datos.reduce((agrupados, dato) => {
    const fecha = dato.fechaCreacion;
    if (!agrupados[fecha]) {
      agrupados[fecha] = [];
    }
    agrupados[fecha].push(dato);
    return agrupados;
  }, {});

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Fecha de Creación</th>
          <th>ID</th>
          <th>
            Nombre{' '}
            <span
              className="cursor-pointer"
              onClick={ordenarPorNombre}
            >
              {ordenAscendente ? '▲' : '▼'}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(datosAgrupados).map(([fecha, datos]) => (
          <React.Fragment key={fecha}>
            <tr>
              <td colSpan="3">Fecha: {fecha}</td>
            </tr>
            {datos.map(dato => (
              <tr key={dato.id}>
                <td>{dato.fechaCreacion}</td>
                <td>{dato.id}</td>
                <td>
                  <span className="mr-2">▶️</span>
                  {dato.nombre}
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default EjemploTabla;
