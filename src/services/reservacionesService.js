import axios from 'axios';

export const obtenerReservaciones = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/modulo-cine-backend/reservacion-controller/obtener');
    return response.data;
  } catch (error) {
    throw new Error('Error al cargar las reservaciones');
  }
};

export const crearReservacion = async (nombreCliente, idProyeccion, cantidadAsientos) => {
  try {
    await axios.post('http://localhost:8080/api/modulo-cine-backend/reservacion-controller/crear', {
      idCliente: nombreCliente,
      idProyeccion,
      cantidadAsientos
    });
  } catch (error) {
    throw new Error('Error al crear la reservación');
  }
};

export const cancelarReservacion = async (idReservacion) => {
  try {
    await axios.patch(`http://localhost:8080/api/modulo-cine-backend/reservacion-controller/cancelar/${idReservacion}`);
  } catch (error) {
    throw new Error('Error al cancelar la reservación');
  }
};