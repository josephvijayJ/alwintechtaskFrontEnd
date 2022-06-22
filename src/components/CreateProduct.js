import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from '@mui/material';
const CreateProduct = () => {
  const [uploading, setUploading] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  //File upload function
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    try {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userDetails.token}`,
        },
      };
      await axios.post(`/api/products`, { productName, price, image }, config);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <div className="label-container">
          <TextField
            label="product Name"
            variant="outlined"
            id="name"
            name="name"
            type="text"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
          />
          <TextField
            label="price"
            variant="outlined"
            id="price"
            name="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
          <TextField
            label="Image URL"
            variant="outlined"
            id="url"
            name="url"
            type="text"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
          <TextField
            variant="outlined"
            id="name"
            name="name"
            type="file"
            onChange={uploadFileHandler}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
