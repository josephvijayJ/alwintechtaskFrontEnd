import React from 'react';
import './Register.css';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const validate = (values) => {
  const errors = {};

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
const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',

      password: '',
    },
    validate,
    onSubmit: async (values) => {
      console.log('values', values);
      try {
        const data = await axios.post('/api/users/login', values);
        localStorage.setItem('userDetails', JSON.stringify(data));
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
            Login
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Login;
