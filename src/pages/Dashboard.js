import { useEffect, useContext, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import AddFolder from "../components/AddFolder";
import AddFile from "../components/AddFile";
import { useParams } from "react-router";


import Folder from "../components/Folder";
import File from "../components/File";
import NavbarComponent from "../components/Navbar";

import { FolderContext } from "../contexts/FolderContext";

export default function Dashboard() {
  const { folderId } = useParams();
  const { getCurrentFolder } = useContext(FolderContext);
  const [currentFolder, setCurrentFolder] = useState({});

  useEffect(() => {
    setCurrentFolder(getCurrentFolder(folderId));
  }, [getCurrentFolder, folderId])

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <Row>
          <Col xs={10}>
            <Folder parentFolder={currentFolder}/>
            <hr />
            <File />
          </Col>
          <Col xs={2} style={{ textAlign: "right" }}>
            <AddFolder parentFolder={currentFolder}/>
            <AddFile parentFolder={currentFolder}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
