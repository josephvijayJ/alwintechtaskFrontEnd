import React from 'react';
import './Register.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};
const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      console.log('values', values);
      try {
        //HOST LINK MENTIONED IN PROXY
        const data = await axios.post('/api/users/register', values);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-container">
        <div className="label-container">
          <TextField
            label="Name"
            variant="outlined"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? (
            <div className="errorColor">{formik.errors.name}</div>
          ) : null}

          <TextField
            label="Email"
            variant="outlined"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? (
            <div className="errorColor">{formik.errors.email}</div>
          ) : null}

          <TextField
            label="password"
            variant="outlined"
            id="email"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? (
            <div className="errorColor">{formik.errors.password}</div>
          ) : null}
          <Button variant="contained" type="submit">
            Register
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Register;
