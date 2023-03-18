import { Alert, Form } from "react-bootstrap";
import { assignBanner } from "../api";
import { useEffect } from "react";
const Banner = ({ banner, game, getall, admin, loadBanners }) => {
  const handleInputChange = async (value) => {
    const result = await assignBanner(game.id, value);
    if (result.ok) {
      getall();
    }
  };

  const boolean = game.banner[0] != null;
  useEffect(() => {
    getall();
    loadBanners();
  }, []);
  const None = (
    <>
      {boolean ? (
        <ul>
          {game.banner.map((ban) => {
            return <li key={ban.id}>{ban.name}</li>;
          })}
        </ul>
      ) : (
        <Alert>No award for this game </Alert>
      )}
    </>
  );
  const AdminPanel = (
    <>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Award</Form.Label>
          {banner.map((ban) => {
            return (
              <div key={ban.id}>
                <Form.Check
                  type="checkbox"
                  id={ban.id}
                  label={ban.name}
                  checked={game.banner.some((b) => b.id === ban.id)}
                  onChange={(e) => {
                    handleInputChange(e.target.id, ban.id);
                  }}
                />
              </div>
            );
          })}
        </Form.Group>
      </Form>
    </>
  );

  return <>{admin ? AdminPanel : None}</>;
};
export default Banner;
