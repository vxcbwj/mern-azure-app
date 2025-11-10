import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Use deployed backend URL
  const API_BASE_URL = "https://mern-azure-app.onrender.com";

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      console.log("Fetching from:", `${API_BASE_URL}/api/items`);
      const response = await fetch(`${API_BASE_URL}/api/items`);
      const data = await response.json();
      console.log("Fetched items:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add new item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding item to:", `${API_BASE_URL}/api/items`);
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        const newItem = await response.json();
        console.log("Item added successfully:", newItem);
        setName("");
        setDescription("");
        fetchItems(); // Refresh the list
      } else {
        console.error("Failed to add item:", response.status);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header
        style={{
          textAlign: "center",
          padding: "50px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ color: "#333" }}>MERN App - Successfully Deployed! 🚀</h1>
        <p>Frontend: Netlify | Backend: Render | Database: MongoDB Atlas</p>

        <form onSubmit={addItem} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              margin: "5px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              margin: "5px",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              margin: "5px",
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add Item
          </button>
        </form>

        <div>
          <h2 style={{ color: "#333" }}>Items List ({items.length} items)</h2>
          {items.length === 0 ? (
            <p>No items yet. Add one above!</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {items.map((item) => (
                <li
                  key={item._id}
                  style={{
                    padding: "10px",
                    margin: "5px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <strong>{item.name}</strong>: {item.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
