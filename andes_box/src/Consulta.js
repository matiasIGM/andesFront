import React, { useRef, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Autocomplete } from "google-maps-react";
import './Consulta.css';

function Consulta() {
  // const autoCompleteRef = useRef();
  // const inputRef = useRef();

  // useEffect(() => {
  //   const loadGoogleMaps = () => {
  //     const options = {
  //       componentRestrictions: { country: "ng" },
  //       fields: ["address_components", "geometry", "icon", "name"],
  //       types: ["establishment"]
  //     };

  //     autoCompleteRef.current = new window.google.maps.places.Autocomplete(
  //       inputRef.current,
  //       options
  //     );
  //   };

  //   if (typeof window.google === 'undefined') {
  //     const script = document.createElement('script');
  //     script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6fm67ftiRYlJhg9GcfTU1BXzM4HOh3BY&libraries=places&callback=initMap`;
  //     script.defer = true;
  //     script.async = true;
  //     script.onload = loadGoogleMaps;
  //     document.head.appendChild(script);
  //   } else {
  //     loadGoogleMaps();
  //   }
  // }, []);

  // return (
  //   <div>
  //     <label>Enter address:</label>
  //     <input ref={inputRef} />
  //   </div>
  // );

  useEffect(() => {
    const loadGoogleMaps = async () => {
      const [{ PlaceAutocompleteElement }] = await Promise.all([window.google.maps.importLibrary('places')]);

      const input = document.createElement('input');
      const pac = new PlaceAutocompleteElement({
        inputElement: input,
      });

      document.body.appendChild(pac.element);

      const selectedPlaceInfo = document.createElement('pre');
      document.body.appendChild(selectedPlaceInfo);

      pac.addListener('gmp-placeselect', async ({ place }) => {
        await place.fetchFields({
          fields: ['formatted_address'],
        });
        selectedPlaceInfo.textContent = place.formatted_address;
      });
    };

    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6fm67ftiRYlJhg9GcfTU1BXzM4HOh3BY&libraries=places&callback=initMap`;
      script.defer = true;
      script.async = true;
      script.onload = loadGoogleMaps;
      document.head.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, []);

  return (
    <div>
      <label>Enter address:</label>
      <TextField id="address" variant="outlined" disabled />
    </div>
  );
}

export default Consulta;
