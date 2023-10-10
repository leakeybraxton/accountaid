import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./retail.css";

function CreateLpo() {
  const navigate = useNavigate();
  const [post, setPost] = useState({
    unique_id: "",
    description: "",
    quantity: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //   useEffect (()=>{
  //     console.log(post);
  //   }, [post]);

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/auth/retail/createlpo", post);
      console.log(response);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1>Create LPO</h1>
      <Form>
        <Form.Group>
          <div className="form_lpo">
            <Form.Control
              className="form_input-field"
              name="unique_id"
              value={post.unique_id}
              placeholder="Unique Number"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
            <Form.Control
              className="form_input-field"
              name="description"
              value={post.description}
              placeholder="Description"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
          </div>
          <div className="form_lpo">
            <Form.Control
              className="form_input-field"
              name="quantity"
              value={post.quantity}
              placeholder="Quantity"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
            <Form.Control
              className="form_input-field"
              name="price"
              value={post.price}
              placeholder="Price"
              style={{ marginBottom: "1rem" }}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        <Button
          variant="outline-success"
          style={{ width: "10%", marginBottom: "1rem" }}
          onClick={handleClick}
        >
          Create Post
        </Button>
      </Form>
      <Button
        variant="outline-dark"
        style={{ width: "10%" }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
}

export default CreateLpo;