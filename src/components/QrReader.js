import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";


const QrReader = () => {
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedResult, setScannedResult] = useState("");
  const [employmentId, setEmploymentId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [employmentIdError, setEmploymentIdError] = useState("");

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
    setQuantityError("");
  };

  const handleEmploymentIdChange = (event) => {
    setEmploymentId(event.target.value);
    setEmploymentIdError("");
  };

   // Success
   const onScanSuccess = result => {
    //  Print the "result" to browser console.
    console.log(result)
    //  Handle success.
    //  You can do whatever you want with the scanned result.
    setScannedResult(result?.data)
  }

  // Fail
  const onScanFail = err => {
    //  Print the "err" to browser console.
    console.log(err)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let isValid = true;

    if (!scannedResult) {
      setScannedResult("Barcode is required");
      isValid = false;
    }

    if (!employmentId) {
      setEmploymentIdError("Employment ID is required");
      isValid = false;
    }

    if (!quantity) {
      setQuantityError("Quantity is required");
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post("/submit-form", {
          scannedResult,
          employmentId,
          quantity,
        });

        console.log("Server Response:", response.data);

        setEmploymentId("");
        setQuantity("");
        setScannedResult("");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <>
      <h1> Scanned Result: {scannedResult}</h1>
      <div className="qr-reader">
        <video ref={videoEl}></video>
        <div ref={qrBoxEl} className="qr-box">
          <img
            src={QrFrame}
            alt="Qr Frame"
            width={128}
            height={128}
            className="qr-frame"
          />
        </div>

        {scannedResult && (
          <p
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 99999,
              color: "white",
            }}
          >
            Scanned Result: {scannedResult}
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="employmentId" className="form-label">
            Employment ID:
          </label>
          <input
            type="text"
            id="employmentId"
            value={employmentId}
            onChange={handleEmploymentIdChange}
            className={`form-control ${employmentIdError ? "is-invalid" : ""}`}
            placeholder="Enter Employment ID..."
          />
          {employmentIdError && (
            <div className="invalid-feedback">{employmentIdError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity:
          </label>
          <input
            type="text"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className={`form-control ${quantityError ? "is-invalid" : ""}`}
            placeholder="Enter Quantity..."
          />
          {quantityError && (
            <div className="invalid-feedback">{quantityError}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default QrReader;
