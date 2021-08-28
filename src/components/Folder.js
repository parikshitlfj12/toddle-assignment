import React from "react";
import { Link } from "react-router-dom";
import { AiFillFolder } from "react-icons/ai";
import { Button } from "react-bootstrap";

export default function Folder({ folder }) {
  return (
    <section>
      <Button
        to={`/folder/${folder.folderId}`}
        as={Link}
        variant="outline-dark"
        className="text-truncatw-100 "
      >
        <AiFillFolder fontSize="30px" style={{ margin: "2px 6px" }} />
        {folder.name}
      </Button>
    </section>
  );
}
