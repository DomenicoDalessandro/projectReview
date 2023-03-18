import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { insertGame, putGame } from "../api";

const Gameform = ({ modify, gameModify, showModal, get }) => {
  const [game, setGame] = useState({
    description: "",
    difficulty: "",
    gameName: "",
    imgUrl: "",
    nOfPlayer: "",
    productHouse: "",
    rate: "",
  });
  useEffect(() => {
    if (modify) {
      setGame({
        description: gameModify.description,
        difficulty: gameModify.difficulty,
        gameName: gameModify.gameName,
        imgUrl: gameModify.imgUrl,
        nOfPlayer: gameModify.nOfPlayer,
        productHouse: gameModify.productHouse,
        rate: gameModify.rate,
      });
    }
  }, []);
  const handleInputChange = (input, value) => {
    setGame({ ...game, [input]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (
      game.gameName.length >= 3 &&
      game.gameName.length <= 15 &&
      game.productHouse.length >= 3 &&
      game.productHouse.length <= 15
    ) {
      let result = {};
      if (modify) {
        result = await putGame(game, gameModify.id);
        get();
      } else {
        result = await insertGame(game);
        if (result.ok) {
          setGame({
            description: "",
            difficulty: "",
            gameName: "",
            imgUrl: "",
            nOfPlayer: "",
            productHouse: "",
            rate: "",
          });
          showModal();
        }
      }
    }
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="gameName">
        <Form.Label>Game Name</Form.Label>
        <Form.Control
          type="text"
          required
          isValid={game.gameName.length >= 3}
          isInvalid={game.gameName.length > 15}
          value={game.gameName}
          onChange={(e) => {
            handleInputChange(e.target.id, e.target.value);
          }}
        />
        <Form.Control.Feedback type="invalid">
          Massimo 15 caratteri
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="imgUrl">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          type="link"
          required
          value={game.imgUrl}
          onChange={(e) => {
            handleInputChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="nOfPlayer">
        <Form.Label>NumberOfPlayer</Form.Label>
        <Form.Control
          type="number"
          min={1}
          max={15}
          value={game.nOfPlayer}
          onChange={(e) => {
            handleInputChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="productHouse">
        <Form.Label>Product House</Form.Label>
        <Form.Control
          type="text"
          required
          isValid={game.productHouse.length >= 3}
          isInvalid={game.productHouse.length > 15}
          value={game.productHouse}
          onChange={(e) => {
            handleInputChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="rate">
        <Form.Label>Rate</Form.Label>
        <Form.Control
          type="number"
          min={1}
          max={5}
          value={game.rate}
          onChange={(e) => {
            handleInputChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="difficulty">
        <Form.Label>Difficulty</Form.Label>
        <Form.Control
          type="number"
          min={1}
          max={6}
          value={game.difficulty}
          onChange={(e) => {
            handleInputChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          maxLength={250}
          value={game.description}
          onChange={(e) => {
            handleInputChange(e.target.id, e.target.value);
          }}
        />
      </Form.Group>
      <div className="mt-3">
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
};
export default Gameform;
