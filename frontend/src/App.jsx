import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Your actual backend URL - IMPORTANT!
  const BACKEND_URL = "https://mern-azure-app.onrender.com";

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      console.log("Fetching items from backend...");
      const response = await fetch(`${BACKEND_URL}/api/items`);
      const data = await response.json();
      console.log("Items received:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      alert("Error connecting to backend: " + error.message);
    }
  };

  // Add new item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding item:", { name, description });
      const response = await fetch(`${BACKEND_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newItem = await response.json();
      console.log("Item added successfully:", newItem);

      // Clear form and refresh list
      setName("");
      setDescription("");
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item: " + error.message);
    }
  };

  // Load items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>MERN App - Fully Working 🚀</h1>
      <p>Backend: {BACKEND_URL}</p>

      <form onSubmit={addItem} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ margin: "5px", padding: "8px", width: "200px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ margin: "5px", padding: "8px", width: "200px" }}
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
        <h2>Items List ({items.length} items)</h2>
        {items.length === 0 ? (
          <p>No items yet. Add one above!</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            {items.map((item) => (
              <li
                key={item._id}
                style={{
                  padding: "10px",
                  margin: "5px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
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
