import { useState } from "react";
import cookie from "cookie";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { FadeLoader,BeatLoader } from "react-spinners";

export const NewList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function saveProduct(e) {
    e.preventDefault();
    setLoading(true);
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
        quantity,
      })
    });
    const data = await res.json();
    if (data.success === true) {
      toast.success("Product added successfully.");
      navigate(-1); 
    } else {
      toast.error(data.error ||"Failed to add product.");
    }
    setLoading(false);
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
      {loading ?(
        <div style={{display : "flex"}}>
          <BeatLoader
          color={"#123abc"}
          loading={true}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
        </div>
      ):
      (<button type="submit">Save</button>)}
    </form>
  );
};
