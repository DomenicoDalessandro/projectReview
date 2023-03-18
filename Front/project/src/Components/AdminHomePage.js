import { getRieview, putAdminPass } from "../api";
import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const AdminHomePage = ({ users, games, getPass }) => {
  document.title = "Admin";
  const [review, setReview] = useState([]);
  const [password, setPassword] = useState({ password: "" });
  const [show, setShow] = useState(false);
  const handleInputChange = (input, value) => {
    setPassword({ [input]: value });
  };
  const allReview = async () => {
    const result = await getRieview();
    if (result.ok) {
      setReview(result.data.length);
    }
  };
  useEffect(() => {
    allReview();
  }, []);
  const showModal = () => {
    setShow(!show);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = await putAdminPass(password);
    if (result.ok) {
      getPass();
      setShow(!show);
    }
  };
  return (
    <>
      <Table>
        <tbody>
          <tr>
            <th>
              <h3>Giochi presenti sul sito</h3>
            </th>
            <th>{games.length}</th>
          </tr>
          <tr>
            <th>
              <h3>User iscritti</h3>
            </th>
            <th>{users.length}</th>
          </tr>
          <tr>
            <th>
              <h2>Reviews</h2>
            </th>
            <th>{review}</th>
          </tr>
        </tbody>
      </Table>
      <Button className="btn btn-success" onClick={showModal}>
        Change Admin Password
      </Button>
      <Modal show={show} onHide={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="password">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="password"
                value={password.password}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <div className="mt-3">
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={showModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AdminHomePage;
