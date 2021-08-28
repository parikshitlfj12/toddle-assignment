import react, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import AddFolder from "../components/AddFolder";
import AddFile from "../components/AddFile";


import Folder from "../components/Folder";
import File from "../components/File";

import NavbarComponent from "../components/Navbar";
import { useParams } from "react-router";

export default function Dashboard() {

  const {folderId} = useParams();
  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <Row>
          <Col xs={10}>
            <Folder/>
            <hr />
            <File/>
          </Col>
          <Col xs={2} style={{ textAlign: "right" }}>
            <AddFolder />
            <AddFile />
          </Col>
        </Row>
      </Container>
    </>
  );
}
