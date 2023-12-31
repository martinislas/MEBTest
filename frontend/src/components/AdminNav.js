import "bulma/css/bulma.min.css";
import { Navbar } from "react-bulma-components";

function AdminNav() {
  return (
    <Navbar color="primary" fixed="top">
      <Navbar.Brand>
        <Navbar.Item href="/admin">
          <strong>MEB Resources</strong>
        </Navbar.Item>
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Container align="right">
          <Navbar.Item href="/admin/jobs">Jobs</Navbar.Item>
          <Navbar.Item href="/admin/applicants">Applicants</Navbar.Item>
          <Navbar.Item href="/admin/admins">Admins</Navbar.Item>
          <Navbar.Item href="/admin/system">System</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
}

export default AdminNav;
