import React from 'react';

const Modal = ({ show, onClose, title, image, abilities, stats, height, weight }) => {
  if (!show) return null; // Si el modal no está visible, no renderizar nada

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center w-100">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body text-center">
          <img src={image} alt={title} className="img-fluid w-75" />
            <div>
              <h5>Habilidades:</h5>
              <p>{abilities}</p> {/* Mostramos las habilidades */}
            </div>
            <div>
              <h5>Estadísticas:</h5>
              <ul className="list-unstyled">
                {stats.map((stat, index) => (
                  <li key={index}><strong>{stat.name}:</strong> {stat.value}</li>
                ))}
              </ul>
            </div>
            <div>
              <p><strong>Altura:</strong> {height} decímetros</p>
              <p><strong>Peso:</strong> {weight} hectogramos</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

