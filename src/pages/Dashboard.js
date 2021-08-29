import { useEffect, useContext, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import AddFolder from "../components/AddFolder";
import AddFile from "../components/AddFile";
import { useParams } from "react-router";


import Folder from "../components/Folder";
import File from "../components/File";
import FirstCol from "../components/FirstCol";
import ThirdCol from "../components/ThirdCol";

import { FolderContext } from "../contexts/FolderContext";

import "../assets/styles/dashboard.css"


import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: "5px",
    backgroundColor: "white",
    width: '100%',
    marginTop: "20px"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export default function Dashboard() {
  const classes = useStyles();
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
    <Container fluid>
      <Row>
        <Col xs={2} className="first-col">
          <FirstCol/>
        </Col>
        <Col xs={7} className="second-col">

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search Files…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            </div>

          <Container className="mt-4">
            <Row>
              <Col xs={10} className="mt-1 second-files-folders">
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
        </Col>
        <Col xs={3} className="third-col">
          <ThirdCol/>
        </Col>
      </Row>
    </Container>
      
    </>
  );
}
