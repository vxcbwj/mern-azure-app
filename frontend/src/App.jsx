import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      // In production, it will be relative path. In development, we need full URL
      const apiUrl = import.meta.env.PROD
        ? "/api/items"
        : "http://localhost:5000/api/items";
      const response = await fetch(apiUrl);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add new item
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.PROD
        ? "/api/items"
        : "http://localhost:5000/api/items";
      await fetch(apiUrl, {
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
      console.error("Error adding item:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MERN App on Azure (Vite)</h1>

        {/* Add Item Form */}
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

        {/* Items List */}
        <div>
          <h2>Items List</h2>
          {items.length === 0 ? (
            <p>No items yet. Add some above!</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item._id}>
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
