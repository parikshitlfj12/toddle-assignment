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
  const [isRoot, setIsRoot] = useState(false);
  const [currentFolder, setCurrentFolder] = useState({});

  useEffect(() => {
    setCurrentFolder(getCurrentFolder(folderId));
  }, [getCurrentFolder, folderId]);
  useEffect(() => {
    if(folderId == null){
      setIsRoot(true);
    } else {
      setIsRoot(false)
    }
  },[folderId])

  return (
    <>
      <NavbarComponent />
      {/* <SideBar /> */}
      <Container className="mt-4">
        <Row>
          <Col xs={10}>
            <Folder parentFolder={currentFolder} isRoot={isRoot}/>
            <hr />
            <File isRoot={isRoot}/>
          </Col>
          <Col xs={2} style={{ textAlign: "right" }}>
            <AddFolder parentFolder={currentFolder} isRoot={isRoot}/>
            <AddFile parentFolder={currentFolder} isRoot={isRoot}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
