import {
  Alert,
  ButtonGroup,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { postAddon, getAddonByGameId, deleteAddon } from "../api";
import { RiDeleteBin3Fill } from "react-icons/ri";

const Addon = ({ admin, game, getall }) => {
  const [addonInsert, setAddonInsert] = useState({ name: "", bonus: "" });
  const [addon, setAddon] = useState([]);
  const [show, setShow] = useState(false);
  const handleInputChange = (input, value) => {
    setAddonInsert({ ...addonInsert, [input]: value });
  };
  const handleModal = () => {
    setShow(!show);
  };
  const getAddon = async () => {
    const result = await getAddonByGameId(game.id);
    if (result.ok) {
      setAddon(result.data);
    }
  };
  const handleDelete = async (id) => {
    const result = await deleteAddon(id);
    getAddon();
  };
  useEffect(() => {
    getAddon();
  }, []);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const result = await postAddon(game.id, addonInsert);
    if (result.ok) {
      getAddon();
      setAddonInsert({ name: "", bonus: "" });
    }
  };
  const boolean = addon[0] != null;
  return (
    <>
      {admin ? <Button onClick={handleModal}>+</Button> : <></>}
      {boolean ? (
        <ListGroup>
          {addon.map((ad) => {
            return (
              <ListGroup.Item key={ad.id}>
                <h4>Name:</h4>
                <p>{ad.name}</p>
                <h5>Bonus:</h5>
                <p>{ad.bonus}</p>
                {admin ? (
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        handleDelete(ad.id);
                      }}
                    >
                      <RiDeleteBin3Fill />
                    </Button>
                  </ButtonGroup>
                ) : (
                  <></>
                )}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <Alert>No Addon Present For {game.gameName}</Alert>
      )}
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>AddOn For {game.gameName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={addonInsert.name}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="bonus">
              <Form.Label>Bonus</Form.Label>
              <Form.Control
                as="textarea"
                required
                value={addonInsert.bonus}
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
            onClick={handleModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Addon;
