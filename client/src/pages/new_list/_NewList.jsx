import { useState } from "react";
import cookie from "cookie";
import { useNavigate } from "react-router";

export const NewList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  async function saveProduct(e) {
    e.preventDefault();
    const { csrftoken } = cookie.parse(document.cookie);
    const res = await fetch("/addproduct/new/", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrftoken
      },
      body: JSON.stringify({
        name,
        description,
        quantity
      })
    });
    const data = await res.json();
    console.log(data);
    if (data.success === true) {
      navigate(-1); 
    } else {
      console.error("Failed to add product.");
      // Handle error appropriately
    }
  }

  return (
    <form onSubmit={saveProduct}>
      <div>
        Name:
        <input value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        Quantity:
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};
