import React, { useState, useEffect } from 'react';
import { crearReservacion } from '../../services/reservacionesService';

function ReservacionesModal({ isOpen, toggleModal, cargarReservaciones }) {
  const [nombreCliente, setNombreCliente] = useState('');
  const [idProyeccion, setIdProyeccion] = useState('');
  const [cantidadAsientos, setCantidadAsientos] = useState('');

  useEffect(() => {
    console.log("El modal está abierto:", isOpen);
  }, [isOpen]);

  const handleCrearReservacion = async () => {
    try {
      await crearReservacion(nombreCliente, idProyeccion, cantidadAsientos);
      cargarReservaciones();
      toggleModal();
    } catch (error) {
      console.error('Error al crear la reservación:', error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Crear Reservación</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="nombreCliente">Nombre del Cliente:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreCliente"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="idProyeccion">ID de Proyección:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="idProyeccion"
                    value={idProyeccion}
                    onChange={(e) => setIdProyeccion(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cantidadAsientos">Cantidad de Asientos:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cantidadAsientos"
                    value={cantidadAsientos}
                    onChange={(e) => setCantidadAsientos(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleCrearReservacion}>Crear</button>
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservacionesModal;