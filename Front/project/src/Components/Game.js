import {
  Button,
  Card,
  Modal,
  ButtonGroup,
  Badge,
  Offcanvas,
  Popover,
  OverlayTrigger,
  ProgressBar,
  Container,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { deleteGame, getBanner } from "../api";
import Gameform from "./GameForm";
import Banner from "./Banner";
import Addon from "./Addon";
import {
  BsFillInboxesFill,
  BsFillFlagFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { FiEdit, FiAward } from "react-icons/fi";
import { Gi3DMeeple, GiGearHammer, GiHeartPlus } from "react-icons/gi";
const Game = ({ game, user, id, getall, admin }) => {
  const [showModal, setShowModal] = useState(false);
  const [showInsertModal, setShowInsertModal] = useState(false);
  const [offC, setOffC] = useState(false);
  const [offCR, setOffCR] = useState(false);
  const [offCAdd, setOffCAdd] = useState(false);
  const [banner, setBanner] = useState({ name: "" });
  const loadBanners = async () => {
    const result = await getBanner();
    if (result.ok) {
      setBanner(result.data);
    }
  };
  useEffect(() => {
    loadBanners();
  }, []);
  const handleOffR = () => {
    setOffCR(!offCR);
  };
  const handleOff = () => {
    setOffC(!offC);
  };
  const handleModal = () => {
    setShowModal(!showModal);
  };
  const handleOffCAdd = () => {
    setOffCAdd(!offCAdd);
  };
  const handleInsertModal = () => {
    setShowInsertModal(!showInsertModal);
  };
  const handleDelete = async () => {
    const boolean = window.confirm("Vuoi cancellare " + game.gameName + "?");
    if (boolean) {
      const result = await deleteGame(game.id);
      if (result.ok) {
        getall();
      }
    }
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Awards</Popover.Header>
      <Popover.Body>
        <Banner
          banner={banner}
          game={game}
          getall={getall}
          loadBanners={loadBanners}
        />
      </Popover.Body>
    </Popover>
  );
  let variant = "";
  if (game.difficulty > 4) {
    variant = "danger";
  } else if (game.difficulty >= 3) {
    variant = "warning";
  } else {
    variant = "success";
  }
  const [back, setBack] = useState(false);
  const handleback = () => {
    setBack(!back);
  };
  return (
    <>
      <Card key={game.id} className="card-dimension-game mt-2 flip-card">
        {back ? (
          <Container>
            <h2>Description:</h2>
            <p>{game.description}</p>
            <Button onClick={handleback} className="btn btn-sm">
              {game.gameName}
            </Button>
          </Container>
        ) : (
          <>
            <Card.Body>
              <Card.Img
                onClick={handleback}
                variant="top"
                src={game.imgUrl}
                className="card-img d-block w-100"
              />
              <h6>Producer:{game.productHouse}</h6>
              <Card.Title>{game.gameName}</Card.Title>
              <ProgressBar
                variant={variant}
                animated
                now={game.difficulty * 20}
                placeholder="Difficulty"
              />
              <Gi3DMeeple />
              <Badge bg="dark" className="me-3">
                {game.nOfPlayer}
              </Badge>
              <FiAward />
              <Badge bg="dark">{game.rate}</Badge>
            </Card.Body>
            <Card.Footer>
              <Button className="btn btn-sm" onClick={handleModal}>
                <BsFillInboxesFill />
              </Button>
              <Button variant="danger" onClick={handleOffCAdd}>
                <GiHeartPlus />
              </Button>

              {admin ? (
                <Button variant="success" onClick={handleOffR}>
                  <BsFillFlagFill />
                </Button>
              ) : (
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                  rootClose
                >
                  <Button variant="success">
                    <BsFillFlagFill />
                  </Button>
                </OverlayTrigger>
              )}
              {user ? (
                <Button className="btn" onClick={handleInsertModal}>
                  <FiEdit />
                </Button>
              ) : admin ? (
                <ButtonGroup className="ms-4">
                  <Button variant="danger" onClick={handleDelete}>
                    <BsFillTrashFill />
                  </Button>
                  <Button onClick={handleOff}>
                    <GiGearHammer />
                  </Button>
                </ButtonGroup>
              ) : (
                <></>
              )}
            </Card.Footer>
          </>
        )}
      </Card>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Review
            review={game.review}
            gameid={game.id}
            admin={admin}
            id={id}
            get={getall}
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
      <Modal show={showInsertModal} onHide={handleInsertModal}>
        <Modal.Header closeButton>
          <Modal.Title>Insert Review for {game.gameName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewForm
            gameid={game.id}
            userid={id}
            handle={handleInsertModal}
            getall={getall}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-sm"
            variant="secondary"
            onClick={handleInsertModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Offcanvas show={offC} onHide={handleOff}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Modify </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Gameform modify gameModify={game} get={getall} />
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={offCR} onHide={handleOffR} placement="top">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Banner</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Banner
            banner={banner}
            game={game}
            getall={getall}
            admin={admin}
            loadBanners={loadBanners}
          />
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={offCAdd} onHide={handleOffCAdd} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Addon For {game.gameName}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Addon admin={admin} game={game} getall={getall} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Game;
