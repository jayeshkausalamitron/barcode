
import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [barcode, setBarcode] = useState("");
  const [employmentId, setEmploymentId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setquantityError] = useState("");
  const [barcodeError, setBarcodeError] = useState("");
  const [employmentIdError, setEmploymentIdError] = useState("");

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setquantityError("");
  };

  const handleBarcodeChange = (event) => {
    setBarcode(event.target.value);
    setBarcodeError("");
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
          quantity,
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
        <div>
          <label htmlFor="barcode">Barcode:</label>
          <input
            type="text"
            id="barcode"
            value={barcode}
            onChange={handleBarcodeChange}
            placeholder="Scan barcode..."
            autoFocus
          />
          {barcodeError && <div className="error">{barcodeError}</div>}
        </div>
        <div>
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
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Enter Quantity..."
          />
          {quantityError && <div className="error">{quantityError}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
