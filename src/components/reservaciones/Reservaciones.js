import React, { useState, useEffect } from 'react';
import { obtenerReservaciones, cancelarReservacion, crearReservacion } from '../../services/reservacionesService';

function Reservaciones() {
    const [reservaciones, setReservaciones] = useState([]);
    const [nombreCliente, setNombreCliente] = useState('');
    const [idProyeccion, setIdProyeccion] = useState('');
    const [cantidadAsientos, setCantidadAsientos] = useState('');

    useEffect(() => {
        cargarReservaciones();
    }, []);

    const cargarReservaciones = async () => {
        try {
            const reservacionesData = await obtenerReservaciones();
            const reservacionesFiltradas = reservacionesData.data.filter(reservacion => reservacion.estado !== 1);
            setReservaciones(reservacionesFiltradas);
        } catch (error) {
            console.error('Error al cargar las reservaciones:', error);
        }
    };

    const handleCancelarReservacion = async (idReservacion) => {
        try {
            await cancelarReservacion(idReservacion);
            cargarReservaciones();
        } catch (error) {
            console.error('Error al cancelar la reservación:', error);
        }
    };

    const handleEnviar = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.target);
            const idCliente = parseInt(formData.get('nombreClienteID'), 10); // Obtén el ID del cliente
            const idProyeccion = parseInt(formData.get('idProyeccion'), 10); // Obtén el ID de la proyección
            const cantidadAsientos = parseInt(formData.get('cantidadAsientos'), 10);

            await crearReservacion(idCliente, idProyeccion, cantidadAsientos);
            cargarReservaciones();

            setNombreCliente('');
            setIdProyeccion('');
            setCantidadAsientos('');
        } catch (error) {
            console.error('Error al crear la reservación:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Reservaciones de Cine ICESI</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleEnviar}>
                        <div className="form-group mt-5">
                            <label htmlFor="nombreCliente">Nombre del Cliente:</label>
                            <select
                                className="form-control"
                                id="nombreCliente"
                                value={nombreCliente}
                                onChange={(e) => setNombreCliente(e.target.value)}
                            >
                                <option value="">Seleccione un cliente</option>
                                {reservaciones.map((reservacion) => (
                                    <option key={reservacion.id_reservacion} value={reservacion.cliente.id}>
                                        {reservacion.cliente.nombre}
                                    </option>
                                ))}
                            </select>
                            <input type="hidden" name="nombreClienteID" value={nombreCliente} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="idProyeccion">Película:</label>
                            <select
                                className="form-control"
                                id="idProyeccion"
                                value={idProyeccion}
                                onChange={(e) => setIdProyeccion(e.target.value)}
                            >
                                <option value="">Seleccione una película</option>
                                {reservaciones.map((reservacion) => (
                                    <option key={reservacion.id_reservacion} value={reservacion.id_proyeccion}>
                                        {reservacion.proyeccion.pelicula.titulo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="cantidadAsientos">Cantidad de Asientos:</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cantidadAsientos"
                                value={cantidadAsientos}
                                onChange={(e) => setCantidadAsientos(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mt-4">Crear Reservación</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Proyección</th>
                                <th scope="col">Cantidad de Asientos</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservaciones.map((reservacion) => (
                                <tr key={reservacion.id_reservacion}>
                                    <td>{reservacion.cliente.nombre}</td>
                                    <td>{reservacion.proyeccion.pelicula.titulo}</td>
                                    <td>{reservacion.cantidadAsientos}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleCancelarReservacion(reservacion.id_reservacion)}>
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Reservaciones;