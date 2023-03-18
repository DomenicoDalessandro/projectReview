import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { deleteReview } from "../api";
import { BsFillBackspaceFill } from "react-icons/bs";
const Review = ({ review, admin, get, id, gameid }) => {
  const handleDelete = async (id) => {
    const boolean = window.confirm("Vuoi eliminare questo commento?");
    if (boolean) {
      const result = await deleteReview(id);
      if (result.ok) {
        get();
      }
    }
  };
  return (
    <>
      <ListGroup>
        {review.map((el) => {
          return (
            <ListGroupItem key={el.id}>
              <p>{el.review}</p>
              {admin ? (
                <Button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(el.id);
                  }}
                >
                  <BsFillBackspaceFill />
                </Button>
              ) : (
                <></>
              )}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </>
  );
};

export default Review;
