import { useEffect, useState } from "react";
import { insertReview, putReview } from "../api";
import { Form, Button, ListGroup, Badge, ListGroupItem } from "react-bootstrap";
import { getReviewByUAndG, deleteReview } from "../api";
import { FiDelete } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";
const ReviewForm = ({ gameid, userid, handle, getall }) => {
  const [modify, setModify] = useState(false);
  const [review, setReview] = useState({ review: "" });
  const [yourReview, setYourReview] = useState([]);
  const handleInputChange = (input, value) => {
    setReview({ ...review, [input]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (review.review.length >= 10 && review.review.length <= 255) {
      const result = await insertReview(userid, gameid, review);
      if (result.ok) {
        window.alert("Review inserita con successo!! ");
        handle();
        getall();
      }
    }
  };

  const get = async () => {
    const result = await getReviewByUAndG(userid, gameid);
    if (result.ok) {
      setYourReview(result.data);
    }
  };
  useEffect(() => {
    get();
  }, []);
  const handleDelete = async (id) => {
    const result = await deleteReview(id);

    get();
    getall();
  };
  const handleModify = (id, modifica) => {
    setModify(!modify);
    setReview({ id: id, review: modifica });
  };
  const handleModifySubmit = async (event) => {
    event.preventDefault();
    const result = await putReview(review);
    if (result.ok) {
      get();
      setModify(!modify);
      setReview({ review: "" });
    }
  };
  return (
    <>
      {modify ? (
        <Form onSubmit={handleModifySubmit}>
          <Form.Group controlId="review">
            <Form.Label>Review</Form.Label>
            <Form.Control
              isValid={10 < review.review.length <= 255}
              isInvalid={
                review.review.length > 255 || review.review.length < 10
              }
              as="textarea"
              value={review.review}
              onChange={(e) => {
                handleInputChange(e.target.id, e.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Massimo 256 caratteri/minimo 10
            </Form.Control.Feedback>
          </Form.Group>

          <div className="mt-3">
            <Button type="submit">Save</Button>
          </div>
        </Form>
      ) : (
        <>
          <ListGroup>
            <Badge>Le Tue Recensioni</Badge>
            <ListGroup>
              {yourReview.map((rev) => {
                return (
                  <ListGroupItem key={rev.id}>
                    <p>{rev.review}</p>
                    <Button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        handleDelete(rev.id);
                      }}
                    >
                      <FiDelete />
                    </Button>
                    <Button
                      className="btn btn-sm btn-success ms-2"
                      onClick={() => {
                        handleModify(rev.id, rev.review);
                      }}
                    >
                      <AiFillEdit />
                    </Button>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </ListGroup>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="review">
              <Form.Label>Review</Form.Label>
              <Form.Control
                isValid={10 < review.review.length <= 255}
                isInvalid={
                  review.review.length > 255 || review.review.length < 10
                }
                as="textarea"
                value={review.review}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Massimo 256 caratteri/minimo 10
              </Form.Control.Feedback>
            </Form.Group>

            <div className="mt-3">
              <Button type="submit">Save</Button>
            </div>
          </Form>
        </>
      )}
    </>
  );
};

export default ReviewForm;
