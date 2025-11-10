import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Use your REAL backend URL
  const API_URL = "https://mern-azure-app.onrender.com/api/items";

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add new item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      setName("");
      setDescription("");
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>MERN App - Fully Working 🚀</h1>

      <form onSubmit={addItem} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ margin: "5px", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ margin: "5px", padding: "8px" }}
        />
        <button type="submit" style={{ margin: "5px", padding: "8px" }}>
          Add Item
        </button>
      </form>

      <div>
        <h2>Items List</h2>
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
                  backgroundColor: "#f0f0f0",
                }}
              >
                <strong>{item.name}</strong>: {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
