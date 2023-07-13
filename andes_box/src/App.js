import React, { useState, useEffect  } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, TextField, Button } from '@mui/material';
import Consulta from './Consulta';
import Create from './pages/create';



function App() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [movimientos, setMovimientos] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const handleInputChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const config = {
      method: 'get',
      url: `/envios/track/${trackingNumber}/`,
      headers: {},
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setMovimientos(response.data.movimientos);
        setAdditionalInfo({
          baseOrigin: response.data.baseOrigin,
          receiverAddress: response.data.receiverAddress,
          receiverDistrict: response.data.receiverDistrict,
          receiverCity: response.data.receiverCity,
          receiverRegion: response.data.receiverRegion,
        });
        setShowProgressBar(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAdditionalInfoClick = () => {
    setAdditionalInfo(null);
  };

  useEffect(() => {
    if (movimientos.length > 0) {
      setShowProgressBar(true);
    } else {
      setShowProgressBar(false);
    }
  }, [movimientos]);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AndesBox
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Inicio
          </Button>
          <Button component={Link} to="/consulta" color="inherit">
            Consulta
          </Button>
          <Button component={Link} to="/create" color="inherit">
            Crear Envío
          </Button>
        </Toolbar>
      </AppBar>

      <Container className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                trackingNumber={trackingNumber}
                movimientos={movimientos}
                additionalInfo={additionalInfo}
                handleAdditionalInfoClick={handleAdditionalInfoClick}
                setAdditionalInfo={setAdditionalInfo}
                showProgressBar={showProgressBar}
              />
            }
          />
        </Routes>
      </Container>

      <Routes>
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

function Inicio({
  handleSubmit,
  handleInputChange,
  trackingNumber,
  movimientos,
  additionalInfo,
  handleAdditionalInfoClick,
  setAdditionalInfo,
  showProgressBar,
}) {
  return (
    <div className="inicio">
      <Typography variant="h4" gutterBottom>
        Seguimiento de Envío
      </Typography>
      <div className="input-container">
        <TextField
          type="text"
          placeholder="Ingrese el número de seguimiento"
          value={trackingNumber}
          onChange={handleInputChange}
        />
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
          Buscar Envío
        </Button>
      </div>
      {additionalInfo && (
        <div className="info-container">
          <Typography variant="h6">Información adicional:</Typography>
          <Typography variant="body1">
            <strong>Origen:</strong> {additionalInfo.baseOrigin}
          </Typography>
          <Typography variant="body1">
            <strong>Dirección de destino:</strong> {additionalInfo.receiverAddress}
          </Typography>
          <Typography variant="body1">
            <strong>Provincia de destino:</strong> {additionalInfo.receiverDistrict}
          </Typography>
          <Typography variant="body1">
            <strong>Ciudad de destino:</strong> {additionalInfo.receiverCity}
          </Typography>
          <Typography variant="body1">
            <strong>Región de destino:</strong> {additionalInfo.receiverRegion}
          </Typography>
          <Button variant="contained" onClick={handleAdditionalInfoClick}>
            Cerrar
          </Button>
        </div>
      )}
      <div className="last-movement-container">
        {movimientos.length > 0 ? (
          <div>
            <Typography variant="h6">Último movimiento:</Typography>
            <Typography variant="body1">Estado: {movimientos[0].estado}</Typography>
            <Typography variant="body1">Ubicación: {movimientos[0].ubicacion}</Typography>
            <Typography variant="body1">Fecha y Hora: {movimientos[0].fecha_hora}</Typography>
          </div>
        ) : (
          <Typography variant="h6">No se encontraron movimientos</Typography>
        )}
        {showProgressBar && <div className="progress-bar-fill"></div>}
      </div>
    </div>
  );
}

export default App;