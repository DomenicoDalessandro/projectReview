import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { insertUser } from "../api";
const UserForm = ({ loaduser, setShowModal, showModal }) => {
  const [inputState, setInputState] = useState({
    email: "",
    lastname: "",
    name: "",
    username: "",
    password: "",
  });

  const handleInputChange = (input, value) => {
    setInputState({ ...inputState, [input]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      inputState.name.length <= 20 &&
      inputState.password.length !== "" &&
      6 <= inputState.password.length &&
      inputState.password.length <= 20 &&
      inputState.lastname.length <= 20 &&
      inputState.email.length <= 25
    ) {
      let result = await insertUser(inputState);
      if (result.ok) {
        setShowModal(!showModal);
        loaduser();
      }
    }
  };
  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            isInvalid={inputState.name.length > 20}
            type="text"
            value={inputState.name}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Massimo 20 caratteri per il nome
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            isValid={
              inputState.password !== "" &&
              6 <= inputState.password.length <= 20
            }
            isInvalid={
              inputState.password.length < 6 || inputState.password.length > 20
            }
            type="password"
            value={inputState.password}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Password must be from 6 to 20 charact
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            isInvalid={inputState.lastname.length > 20}
            type="text"
            value={inputState.lastname}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Massimo 20 caratteri
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            isInvalid={inputState.email.length > 25}
            type="text"
            value={inputState.email}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Massimo 25 caratteri
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            maxLength={8}
            value={inputState.username}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
        </Form.Group>
        <div className="mt-3">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </>
  );
};

export default UserForm;
