import { Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../api";
import { AiOutlineLogin } from "react-icons/ai";
const User = ({ user, admin, loadUser }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    const boolean = window.confirm(
      "Want to delete user " + user.username + "?"
    );
    if (boolean) {
      const result = await deleteUser(user.id);
      if (result.ok) {
        loadUser();
      }
    }
  };
  const password = () => {
    let pass = prompt("Insert your password ");
    if (pass === user.password) {
      navigate(`/${user.id}`);
    } else {
      window.alert("Wrong Password!!");
    }
  };
  let counter = 0;

  {
    user.review.map(() => {
      return counter++;
    });
  }

  return (
    <>
      {admin ? (
        <tr>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{counter}</td>
          <td>
            <Button variant="warning" onClick={handleDelete}>
              Delete User
            </Button>
          </td>
        </tr>
      ) : (
        <Col xs={6} sm={6} md={4} lg={3} className="mt-5">
          <Card key={user.id} className="user-card">
            <Card.Title>
              <h3>{user.username}</h3>
            </Card.Title>
            <Card.Body>
              <p>Reviews: {counter}</p>
              <p>Name: {user.name}</p>
            </Card.Body>
            <Card.Footer>
              {admin ? (
                <Button onClick={handleDelete}>Delete User</Button>
              ) : (
                <Button onClick={password}>
                  <AiOutlineLogin />
                </Button>
              )}
            </Card.Footer>
          </Card>
        </Col>
      )}
    </>
  );
};
export default User;
