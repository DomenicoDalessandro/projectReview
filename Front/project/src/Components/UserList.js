import User from "./User";
import { Row, Table } from "react-bootstrap";
const UserList = ({ users, admin, loadUser }) => {
  return (
    <>
      {admin ? (
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Reviews</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <User
                  key={user.id}
                  user={user}
                  admin={admin}
                  loadUser={loadUser}
                />
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Row>
          {users.map((user) => {
            return (
              <User
                key={user.id}
                user={user}
                admin={admin}
                loadUser={loadUser}
              />
            );
          })}
        </Row>
      )}
    </>
  );
};
export default UserList;
