import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import './Dashboard.css';

const Dashboard = () => {
  const [products, , setProducts] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const fetchProducts = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/products/${userDetails._id}`,
        config
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [products, fetchProducts]);
  return (
    <>
      <h3>DASHBOARD</h3>
      products&&
      {products.map((product) => {
        <Card>
          <h3>{product.productName}</h3>
          <img src={product.image} alt="product img" />
          <p>{product.price}</p>
        </Card>;
      })}
    </>
  );
};

export default Dashboard;
