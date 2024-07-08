import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import axios from '../services/axiosConfig.js'; 
import '../styles/LoginRegister.css';

//gere o login e o registo de utilizadores
const LoginRegister = () => {
    // Define o estado inicial: isLogin determina se o formulário é para login ou registo
  const [isLogin, setIsLogin] = useState(true);
    // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    country: '',
    city: ''
  });

  //gerir as notificações (Toast)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  //navegar entre página
  const navigate = useNavigate();

  //Função para atualizar os dados do formulário 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Função para validar o formulário antes de enviar
  const validateForm = () => {
    //validar a senha
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /^\d+$/;

    //validação para o formulário de login
    if (isLogin) {
      if (!formData.email || !formData.password) {
        return { valid: false, message: 'Preencha todos os campos' };
      }
    } else {
      //validação para o formulário de registo
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.phoneNumber ||
        !formData.dateOfBirth ||
        !formData.country ||
        !formData.city
      ) {
        return { valid: false, message: 'Preencha todos os campos' };
      } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
        return { valid: false, message: 'Email Inválido' };
      } else if (
        !uppercaseRegex.test(formData.password) ||
        !specialCharRegex.test(formData.password) ||
        formData.password.length < 6
      ) {
        return { valid: false, message: 'Password Inválida - Requisitos: -6 Caracteres -1 Caractere especial -1 Letra Maíuscula' };
      } else if (formData.password !== formData.confirmPassword) {
        return { valid: false, message: 'As senhas não coincidem' };
      } else if (!numberRegex.test(formData.phoneNumber)) {
        return { valid: false, message: 'Telemóvel inválido' };
      }
    }

    return { valid: true };
  };

  //função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    if (!validation.valid) {
      setToastMessage(validation.message);
      setToastType('warning');
      setShowToast(true);
      return;
    }

    try {
      if (isLogin) {
        // enviar uma solicitação de login
        const response = await axios.post('/api/UtilizadoresApi/login', {
          email: formData.email,
          password: formData.password
        });
        console.log('Login successful:', response.data);
        setToastMessage('Login realizado com sucesso!');
        setToastType('success');
        navigate('/'); //redireciona para a página inicial após o login
      } else {
        //envia uma solicitação de registo
        const response = await axios.post('/api/UtilizadoresApi/register', {
          nome: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword, // Adicionado campo ConfirmPassword
          telemovel: formData.phoneNumber,
          dataNascimento: formData.dateOfBirth,
          cidade: formData.city,
          pais: formData.country
        });
        console.log('Registration successful:', response.data);
        setToastMessage('Registro realizado com sucesso!');
        setToastType('success');
        setIsLogin(true); // Muda para a tela de login após o registo
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setToastMessage('Erro na operação, por favor tente novamente.');
      setToastType('danger');
    }
    setShowToast(true);
  };

  return (
    <div className="login-register-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </>
        )}
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Create an Account' : 'Already have an account?'}
      </button>
      <ToastContainer className="toast-container-bottom">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Sistema</strong>
            <small>Agora</small>
          </Toast.Header>
          <Toast.Body className={`bg-${toastType}`}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default LoginRegister;
