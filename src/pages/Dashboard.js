import react, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import AddFolder from "../components/AddFolder";
import Folder from "../components/Folder";
import NavbarComponent from "../components/Navbar";
import { useParams } from "react-router";

export default function Dashboard() {

  const {folderId} = useParams();
  console.log(folderId)
 
  const [folder, setFolder] = useState({
    name: "Songs",
    folderId: 651568451,
  });
  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <Row>
          <Col>
            <Folder
              folder={folder}
            />
          </Col>
          <Col style={{ textAlign: "right" }}>
            <AddFolder />
          </Col>
        </Row>
      </Container>
    </>
  );
}
