import React, { useState, useRef } from "react";
import { FaUpload, FaTrash, FaCamera } from "react-icons/fa";
import Webcam from "react-webcam"; // Import Webcam
import "./ImageUploader.css";

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const webcamRef = useRef(null);

  // Handle File Upload
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      url: URL.createObjectURL(file),
    }));

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Capture Image from Webcam
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setSelectedImages((prevImages) => [...prevImages, { id: imageSrc, url: imageSrc }]);
    setIsCameraOpen(false); // Close camera after capture
  };

  // Remove an Image
  const removeImage = (id) => {
    setSelectedImages(selectedImages.filter((image) => image.id !== id));
  };

  return (
    <>
      <div className="upload-container">
      <h1>Smart Image Uploader</h1>
      <p className="subtitle">Effortlessly upload, capture, and manage your images.</p>

        <form className="upload-form">
          {/* 📂 Upload from Files */}
          <label className="upload-box">
            <input type="file" onChange={handleFileChange} accept="image/*" multiple hidden />
            <div className="upload-content">
              <FaUpload className="upload-icon" />
              <p>Click to upload or drag & drop</p>
              <span>PNG, JPG, JPEG (max 5MB each)</span>
            </div>
          </label>
        </form>

        {/* 📸 Open Camera Button */}
        <button className="camera-btn" onClick={() => setIsCameraOpen(!isCameraOpen)}>
          <FaCamera /> {isCameraOpen ? "Close Camera" : "Open Camera"}
        </button>

        {/* 📸 Webcam Component */}
        {isCameraOpen && (
          <div className="camera-container">
            <Webcam ref={webcamRef} screenshotFormat="image/jpeg" className="webcam" />
            <button className="capture-btn" onClick={captureImage}>Capture</button>
          </div>
        )}

        {/* 🖼 Display List of Uploaded & Captured Images */}
        {selectedImages.length > 0 && (
          <div className="image-list">
            {selectedImages.map((image) => (
              <div key={image.id} className="preview-container">
                <img src={image.url} alt="Preview" className="preview-image" />
                <button className="remove-btn" onClick={() => removeImage(image.id)}>
                  <FaTrash /> Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer>
        <div>
          <p>© 2025 Smart Image Uploader. All rights reserved.</p>
          <p>
            Contact us: <a href="mailto:support@example.com">smartimageuploader@example.com</a>
          </p>
          <p>
            <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
          </p>
        </div>
      </footer>
      </>
  );
};

export default ImageUploader;
