import { useState } from "react";
import { Button, Container, Row, ButtonGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserList from "../Components/UserList";
import UserForm from "../Components/UserForm";

const UsersPage = ({ users, loadUser, pass }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const password = () => {
    let passin = prompt("Insert the admin password ");
    if (passin === pass) {
      navigate("/admin");
    } else {
      window.alert("Wrong Password!!");
    }
  };
  return (
    <Container>
      <h1>Welcome to the Login Page</h1>
      <Row xs={1} md={2} lg={3} className=" justify-content-center">
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">
            <Link className="nav-link" to="/">
              Back
            </Link>
          </Button>
          <Button variant="secondary" onClick={handleModal}>
            Sign in
          </Button>
          <Button variant="secondary" onClick={password}>
            Admin
          </Button>
        </ButtonGroup>
      </Row>
      <UserList users={users} />
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Subscribe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            loaduser={loadUser}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UsersPage;
