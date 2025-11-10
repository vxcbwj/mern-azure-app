import React, { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // ABSOLUTE URL - This is crucial!
  const BACKEND_URL = "https://mern-azure-app.onrender.com";
  // Fetch items from backend
  const fetchItems = async () => {
    try {
      console.log("Fetching from:", `${BACKEND_URL}/api/items`);
      const response = await fetch(`${BACKEND_URL}/api/items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Items received:", data);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Add new item
  const addItem = async (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      console.log("Adding to:", `${BACKEND_URL}/api/items`);
      const response = await fetch(`${BACKEND_URL}/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newItem = await response.json();
      console.log("Item added:", newItem);

      // Clear form and refresh
      setName("");
      setDescription("");
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>MERN App - Fully Working 🚀</h1>
      <p>
        <strong>Backend:</strong> {BACKEND_URL}
      </p>

      <form onSubmit={addItem} style={{ marginBottom: "30px" }}>
        <div>
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              margin: "5px",
              padding: "10px",
              width: "200px",
              fontSize: "16px",
            }}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              margin: "5px",
              padding: "10px",
              width: "200px",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add Item
        </button>
      </form>

      <div>
        <h2>Items List ({items.length} items)</h2>
        {items.length === 0 ? (
          <p>No items yet. Add your first item above! ✅</p>
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
                  padding: "15px",
                  margin: "10px",
                  backgroundColor: "#e9ecef",
                  borderRadius: "8px",
                  border: "2px solid #007bff",
                  textAlign: "left",
                }}
              >
                <strong style={{ color: "#007bff" }}>{item.name}</strong>:{" "}
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
