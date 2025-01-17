import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';  // Asegúrate de importar el CSS de Bootstrap

const Pokemon = () => {
  // Estado para almacenar los datos de Ditto, el estado de carga y los errores
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [number, setNumber] = useState(1);	

  // Efecto para hacer la solicitud cuando el componente se monta
  useEffect(() => {
    // URL de la API
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${number}`;

    // Realizamos la solicitud usando axios
    axios.get(apiUrl)
      .then((response) => {
        setPokemon(response.data); // Guardamos los datos del Pokémon en el estado
        setLoading(false); // Terminó la carga
        console.log(response.data);
      })
      .catch((err) => {
        setError(err.message); // Si ocurre un error, lo almacenamos
        setLoading(false); // Terminó la carga
      });
  }, [number]); // Este efecto solo se ejecuta cuando cambia el número

  // Si estamos cargando los datos
  if (loading) {
    return <div className="text-center mt-5"><h3>Loading...</h3></div>;
  }

  // Si hubo un error en la solicitud
  if (error) {
    return <div className="text-center mt-5"><h3>Error: {error}</h3></div>;
  }

  // Si los datos del Pokémon se han cargado correctamente
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>{pokemon.name.toUpperCase()}</h1>
        <div className="mb-3">
          <input
            type="number"
            className="form-control d-inline-block w-auto"
            value={number}
            onChange={(e) => setNumber(Math.max(1, e.target.value))}
          />
          <button className="btn btn-primary mt-2">Buscar</button>
        </div>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width="300"
          height="300"
          className="mb-3"
        />
        <h2>Detalles:</h2>
        <ul className="list-group">
          <li className="list-group-item"><strong>ID:</strong> {pokemon.id}</li>
          <li className="list-group-item"><strong>Tipo:</strong> {pokemon.types[0].type.name}</li>
          <li className="list-group-item"><strong>Altura:</strong> {pokemon.height} decímetros</li>
          <li className="list-group-item"><strong>Peso:</strong> {pokemon.weight} hectogramos</li>
          <li className="list-group-item">
            <strong>Habilidades:</strong>
            <ul className="list-unstyled ms-3">
              {pokemon.abilities.map((ability) => (
                <li key={ability.ability.name}>{ability.ability.name}</li>
              ))}
            </ul>
          </li>
          <li className="list-group-item">
          <strong>Stats:</strong>
            <ul className="list-unstyled ms-3">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                <strong>{stat.stat.name}:</strong> {stat.base_stat}
                </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pokemon;

