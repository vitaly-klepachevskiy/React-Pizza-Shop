import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          `https://63a83f85100b7737b97a80c8.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert(`Ршибка при получении пиццы: ${error.message}`);
        navigate('/');
      }
    }

    getPizza();
  }, []);

  if (!pizza) {
    return <div>Загрузка</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quasi
        officia ea itaque architecto exercitationem quisquam rem, soluta veniam
        alias eius facere modi accusamus, dignissimos quas ducimus nulla!
        Sapiente, perspiciatis?
      </p>
      <h3>{pizza.price} ₽</h3>
    </div>
  );
};

export default FullPizza;
