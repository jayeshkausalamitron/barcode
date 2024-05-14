// import logo from './logo.svg';
// import Barcode from 'react-barcode';
import './App.css';
import React, { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import axios from "axios";

function App() {
  const [barcode, setBarcode] = useState('');
  const [barcodeError, setBarcodeError] = useState("");
  const [employmentId, setEmploymentId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setquantityError] = useState("");

  const [employmentIdError, setEmploymentIdError] = useState("");

  const handleDetected = (code) => {
    setBarcode(code);
    setBarcodeError("");
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setquantityError("");
  };



  const handleEmploymentIdChange = (event) => {
    setEmploymentId(event.target.value);
    setEmploymentIdError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (!barcode) {
      setBarcodeError("Barcode is required");
      isValid = false;
    }

    if (!employmentId) {
      setEmploymentIdError("Employment ID is required");
      isValid = false;
    }

    if (!quantity) {
      setquantityError("Quantity is required");
      isValid = false;
    }

    if (isValid) {
      try {
        // Send form data to server
        const response = await axios.post("/submit-form", {
          barcode,
          employmentId,
          // quantity,
        });

        console.log("Server Response:", response.data);

        // Reset the form after successful submission
        setBarcode("");
        setEmploymentId("");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
      <h1>Barcode Scanner</h1>
      <h1>{barcode && <p>Detected Barcode: {barcode}</p>}</h1>
      <BarcodeScanner onDetected={handleDetected} />
      {barcode && <p>Detected Barcode: {barcode}</p>}
      {barcodeError && <div className="error">{barcodeError}</div>}
      <label htmlFor="employmentId">Employment ID:</label>
          <input
            type="text"
            id="employmentId"
            value={employmentId}
            onChange={handleEmploymentIdChange}
            placeholder="Enter Employment ID..."
          />
          {employmentIdError && (
            <div className="error">{employmentIdError}</div>
          )}
      {/* <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter Quantity..."
          />
          {quantityError && <div className="error">{quantityError}</div>} */}
          <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
