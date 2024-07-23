import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import theme from '../src/styles/theme';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
