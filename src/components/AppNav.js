import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/ProjectReducer";

export const AppNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearUserURef = () => {
    dispatch(updateRenderAction({}));
    history.push("/project-upsert");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      {/* <Navbar.Brand href="#home">E-BUG TRACKER</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/project-list">
            Project List
          </Nav.Link>
          <Nav.Link as={Link} to="/project-upsert">
            Project Upsert
          </Nav.Link>
          <Nav.Link as={Link} to="/project-upsert">
            Project Upsert
          </Nav.Link>
          <Nav.Link as={Link} to="/project-upsert">
            Project Upsert
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
