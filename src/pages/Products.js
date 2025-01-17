import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';  // Componente para mostrar las cards
import axios from 'axios';
import Modal from '../components/Modal';  // Modal que ya tienes

const Products = () => {
  const [pokemons, setPokemons] = useState([]); // Estado para almacenar los Pokémones
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  // Usamos useEffect para obtener los datos al cargar el componente
  useEffect(() => {
    obtenerPokemons();
  }, []);

  // Función para obtener los Pokémones
  const obtenerPokemons = async () => {
    try {
      const uri = 'https://pokeapi.co/api/v2/pokemon?limit=100';  // Puedes ajustar el límite de Pokémones
      const response = await axios.get(uri);
      const pokemonsData = response.data.results;

      // Obtener detalles adicionales de cada Pokémon
      const pokemonsWithDetails = await Promise.all(pokemonsData.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          image: details.data.sprites.front_default,
          abilities: details.data.abilities.map((ability) => ability.ability.name).join(', '),  // Mostrar habilidades
          stats: details.data.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat })), // Estadísticas
          height: details.data.height,  // Altura
          weight: details.data.weight,  // Peso
        };
      }));

      setPokemons(pokemonsWithDetails);  // Guardamos los detalles de los Pokémones en el estado
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Función para mostrar el modal
  const handleShowModal = (pokemon) => {
    setSelectedPokemon(pokemon);  // Guardamos el Pokémon seleccionado
    setShowModal(true);  // Mostramos el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Pokémones</h2>

      {/* Muestra las cards de los Pokémones */}
      <div className="row">
        {pokemons.map((pokemon) => (
          <div className="col-md-4 mb-4" key={pokemon.name}>
            <ProductCard
              product={pokemon}
              onView={() => handleShowModal(pokemon)}  // Al hacer clic, mostramos el modal
            />
          </div>
        ))}
      </div>

      {/* Modal para mostrar más detalles del Pokémon seleccionado */}
      {showModal && selectedPokemon && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          title={selectedPokemon.name.toUpperCase()}  // Nombre del Pokémon en mayúsculas
          image={selectedPokemon.image}  // Imagen del Pokémon
          abilities={selectedPokemon.abilities}  // Habilidades del Pokémon
          stats={selectedPokemon.stats}  // Estadísticas del Pokémon
          height={selectedPokemon.height}  // Altura del Pokémon
          weight={selectedPokemon.weight}  // Peso del Pokémon
        />
      )}
    </div>
  );
};

export default Products;




