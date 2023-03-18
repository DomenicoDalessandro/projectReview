import { Container } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AdminHome = () => {
  return (
    <>
      <Container>
        <Navbar expand="lg" className="admin-nav">
          <Container>
            <Navbar.Brand href="/admin">AdminPanel</Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="me-auto">
                <NavLink to="game" className="nav-link">
                  GamesEdit
                </NavLink>
                <NavLink to="/admin/user" className="nav-link">
                  UserControl
                </NavLink>
                <NavLink to="/" className="nav-link">
                  Logut
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AdminHome;
