import React, { useState } from 'react';
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const Create = () => {
  const initialFormValues = {
    amountPieces: 0,
    customerName: '',
    baseOrigin: '',
    receiverName: '',
    receiveMail: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverDistrict: '',
    receiverCity: '',
    receiverRegion: '',
    locationName: '',
    patent: '',
    courierName: '',
    estado_envio: 'En Preparación',
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [createdTrackingNumber, setCreatedTrackingNumber] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar los campos obligatorios
    if (
      formValues.customerName.trim() === '' ||
      formValues.receiverName.trim() === '' ||
      formValues.receiveMail.trim() === '' ||
      formValues.receiverPhone.trim() === '' ||
      formValues.receiverAddress.trim() === '' ||
      formValues.receiverDistrict.trim() === '' ||
      formValues.receiverCity.trim() === '' ||
      formValues.receiverRegion.trim() === '' ||
      formValues.locationName.trim() === '' ||
      formValues.patent.trim() === '' ||
      formValues.courierName.trim() === ''
    ) {
      setErrorDialogOpen(true);
      return;
    }

    const data = JSON.stringify({
      ...formValues,
      amountPieces: Number(formValues.amountPieces),
    });

    const config = {
      method: 'post',
      url: '/envios/',
      headers: {
        'X-Api-Key': 'IpCitbri.VjO2bQCGYPaWYwrE2EeN3dLfXa5QeEyr',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const { numero_seguimiento } = response.data;
        setCreatedTrackingNumber(numero_seguimiento);
        setModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
        // Mostrar un mensaje de error al usuario
        // Aquí puedes mostrar una notificación o realizar otra acción adecuada
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormValues(initialFormValues);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <Typography variant="h4" className="form-title">
        Crear Envío
      </Typography>
      <TextField
        name="amountPieces"
        label="Cantidad de Piezas"
        type="number"
        value={formValues.amountPieces}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="customerName"
        label="Nombre del Cliente"
        value={formValues.customerName}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="baseOrigin"
        label="Origen Envío"
        value={formValues.baseOrigin}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="receiverName"
        label="Nombre del Destinatario"
        value={formValues.receiverName}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="receiveMail"
        label="Correo del Destinatario"
        value={formValues.receiveMail}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="receiverPhone"
        label="Teléfono del Destinatario"
        value={formValues.receiverPhone}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="receiverAddress"
        label="Dirección de Destino"
        value={formValues.receiverAddress}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="receiverDistrict"
        label="Provincia de Destino"
        value={formValues.receiverDistrict}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="receiverCity"
        label="Ciudad de Destino"
        value={formValues.receiverCity}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="receiverRegion"
        label="Región de Destino"
        value={formValues.receiverRegion}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="locationName"
        label="Comuna de Destino"
        value={formValues.locationName}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="patent"
        label="Patente Transportista"
        value={formValues.patent}
        onChange={handleChange}
        className="input-field"
      />
      <TextField
        name="courierName"
        label="Empresa de Transporte"
        value={formValues.courierName}
        onChange={handleChange}
        className="input-field"
      />
      <div className="button-container">
        <Button type="submit" variant="contained" color="primary" className="submit-button">
          Guardar
        </Button>
      </div>

      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Envío generado con éxito</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Su número de seguimiento es: {createdTrackingNumber}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorDialogOpen} onClose={handleCloseErrorDialog}>
        <DialogTitle>Falta Información</DialogTitle>
        <DialogContent>
          <Typography>Por favor, complete todos los campos obligatorios.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default Create;