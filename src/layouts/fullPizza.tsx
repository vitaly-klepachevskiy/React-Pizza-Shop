import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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
        alert(`Ошибка при получении пиццы`);
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
      <h3>{pizza.price} ₽</h3>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
