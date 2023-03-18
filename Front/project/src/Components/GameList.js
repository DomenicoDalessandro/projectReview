import { Col, Row, Button, Modal, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import Gameform from "./GameForm";
import Game from "./Game";
import BannerForm from "./BannerForm";
import { GiTowerFlag } from "react-icons/gi";
import { IoIosAddCircle } from "react-icons/io";
const GameList = ({ gameList, user, id, getAll, admin }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalModify, setShowModalModify] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
    getAll();
  };
  const handleClickTwo = () => {
    setShowModalModify(!showModalModify);
  };
  return (
    <>
      {admin ? (
        <ButtonGroup>
          <Button onClick={handleClick}>
            <IoIosAddCircle />
          </Button>
          <Button onClick={handleClickTwo}>
            <GiTowerFlag />
          </Button>
        </ButtonGroup>
      ) : (
        <></>
      )}
      <Row xs={1} md={2} lg={3} xxl={4} className="justify-content-center">
        {gameList.map((el) => {
          return (
            <Col key={el.id}>
              <Game
                game={el}
                user={user}
                id={id}
                getall={getAll}
                admin={admin}
              />
            </Col>
          );
        })}
        <Modal show={showModal} onHide={handleClick}>
          <Modal.Header closeButton>
            <Modal.Title>Insert a new game</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Gameform showModal={handleClick} get={getAll} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-sm"
              variant="secondary"
              onClick={handleClick}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showModalModify} onHide={handleClickTwo}>
          <Modal.Header closeButton>
            <Modal.Title>Modify</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BannerForm />
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-sm"
              variant="secondary"
              onClick={handleClickTwo}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
};
export default GameList;
