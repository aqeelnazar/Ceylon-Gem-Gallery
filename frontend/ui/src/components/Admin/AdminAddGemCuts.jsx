import React, { useState } from 'react';
import './AdminAddGemCuts.css'; // Import the CSS file
import axios from 'axios';

const AdminAddGemCuts = () => {
  // State to store form data
  const [gemCutData, setGemCutData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    specifications: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGemCutData({
      ...gemCutData,
      [name]: value,
    });
    console.log(gemCutData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    try {
      // Send the form data to the backend
      const response = await axios.post('http://localhost:3000/api/cuts', gemCutData);
      console.log('Gem cut added successfully:', response.data);
      
      // Optionally, reset the form after successful submission
      setGemCutData({
        name: '',
        description: '',
        imageUrl: '',
        specifications: '',
      });
    } catch (error) {
      console.error('Error adding gem cut:', error);
    }
  };

  return (
    <div className="Admin-container">
      <div className="Admin-card">
        <h2 className="Admin-card-title">Add Gem Cuts</h2><br />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cutName" className="label">Cut Name:</label>
            <input
              type="text"
              id="cutName"
              name="name"
              value={gemCutData.name}
              required
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutDescription" className="label">Cut Description:</label>
            <textarea
              id="cutDescription"
              name="description"
              value={gemCutData.description}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutImage" className="label">Cut Image URL:</label>
            <input
              type="text"
              id="cutImage"
              name="imageUrl"
              value={gemCutData.imageUrl}
              required
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutSpecifications" className="label">Cut Specifications:</label>
            <textarea
              id="cutSpecifications"
              name="specifications"
              value={gemCutData.specifications}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="submit-button">Add Cut</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddGemCuts;
