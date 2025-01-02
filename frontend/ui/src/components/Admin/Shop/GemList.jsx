import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./GemList.css";

const GemList = () => {
  const [gems, setGems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/gemShop")
      .then((response) => {
        setGems(response.data);
      })
      .catch(() => {
        console.log("Error fetching gems");
      });
  }, []);

  const filteredGems = gems.filter((gem) =>
    gem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/gemShop/${id}`);
      alert(response.data.msg); // Display success message
      setGems(gems.filter((gem) => gem._id !== id)); // Update state to remove deleted gem
    } catch (error) {
      console.error("Error deleting gem:", error);
      alert("Error deleting gem. Please try again.");
    }
  };

  const gemList =
    filteredGems.length === 0 ? (
      <div className="no-gems-found">No gems found!</div>
    ) : (
      filteredGems.map((gem) => (
        <div key={gem._id} className="gem-card">
          <h3 className="gem-name">{gem.name}</h3>
          
          <p className="gem-description">{gem.description}</p>
          <p className="gem-price">Price: {gem.price}</p>
          <div className="gem-actions">
            <button className="update-button">
              <Link className="update-link-btn" to={`/admin/updateGem/${gem._id}`}>
                Update
              </Link>
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(gem._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    );

  return (
    <div className="show-gem-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>
      <div className="list-container-1">{gemList}</div>
    </div>
  );
};

export default GemList;
