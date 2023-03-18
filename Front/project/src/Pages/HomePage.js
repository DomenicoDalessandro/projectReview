import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import GameList from "../Components/GameList";
import { getUserById } from "../api";
import { useEffect, useState } from "react";
import banner from "../img/banner.jpg";
const HomePage = ({ user, gameList, getAll }) => {
  const [logged, setLogged] = useState({});
  const { userid } = useParams();

  const getUser = async () => {
    const result = await getUserById(userid);
    if (result.ok) {
      setLogged(result.data);
    }
  };
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, []);

  const HomePageOspiti = (
    <>
      <Navbar expand="lg" className="color-nav-ospiti">
        <img
          src={banner}
          alt="banner"
          style={{ width: "100vw", height: "30vh", borderEndEndRadius: "80%" }}
        />
        <Container>
          <Navbar.Brand href="/">
            <h4 style={{ color: "white" }}>HomePage</h4>
          </Navbar.Brand>
          <NavLink to="login" className="nav-link">
            <Button variant="dark" style={{ borderColor: "white" }}>
              To Login
            </Button>
          </NavLink>
        </Container>
      </Navbar>
      <Container>
        <GameList gameList={gameList} getAll={getAll} />
      </Container>
      ;
    </>
  );
  const HomePageUser = (
    <>
      <Navbar expand="lg" className="color-nav-user">
        <img
          src={banner}
          alt="banner"
          style={{ width: "100vw", height: "30vh", borderEndEndRadius: "80%" }}
        />
        <Container>
          <Navbar.Brand style={{ color: "white" }} href={`/${userid}`}>
            {logged.username}
          </Navbar.Brand>
          <Nav>
            <NavLink
              style={{ color: "white" }}
              to={`/${userid}/info`}
              className="nav-link"
            >
              Impostazioni Personali
            </NavLink>
          </Nav>
          <NavLink to="/" className="nav-link">
            Logout
          </NavLink>
        </Container>
      </Navbar>
      <Container>
        <GameList gameList={gameList} user={user} id={userid} getAll={getAll} />
      </Container>
      ;
    </>
  );

  return <>{user ? HomePageUser : HomePageOspiti}</>;
};

export default HomePage;
