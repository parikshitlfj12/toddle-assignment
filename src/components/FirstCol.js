import React from 'react'
import logoImage from "../assets/img/logoIMage.png"
import {AiFillFolderOpen, AiOutlineHome, AiOutlineClockCircle, AiOutlineSetting} from 'react-icons/ai'
import {RiDeleteBin7Line} from "react-icons/ri"
import { ProgressBar } from 'react-bootstrap'
import { useHistory } from 'react-router'

export default function FirstCol() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  }
  return (
    <div className="one">
      <div onClick={handleClick} style={{cursor: "pointer"}}>
        <img src={logoImage} alt="logo" style={{height: "60px", marginTop: "20px", marginRight: '40px'}} />
      </div>
      <div className="sideNav">
        <div style={{color: "#4AB7FF", cursor: "pointer"}} onClick={handleClick}>
          <AiOutlineHome style={{fontSize: "22px"}}/> <span style={{fontWeight: "500"}}> Home</span>
        </div>
        <div>
          <AiFillFolderOpen style={{fontSize: "22px"}}/> <span style={{fontWeight: "500"}}> My Files</span>
        </div>
        <div>
          <AiOutlineClockCircle style={{fontSize: "22px"}}/>
          <span style={{fontWeight: "500"}}> Recent</span>
        </div>
        <div>
          <AiOutlineSetting style={{fontSize: "22px"}}/><span style={{fontWeight: "500"}}> Settings</span>
        </div>
        <div>
          <RiDeleteBin7Line style={{fontSize: "22px"}}/>
          <span style={{fontWeight: "500"}}> Recycle bin</span>
        </div>
      </div>

      <div style={{marginTop: "60px"}}>
        <b>25.32 GB</b> used  of 1TB <br/>
        <div style={{width: "70%", marginTop:"10px", marginLeft: "15%"}}>
          <ProgressBar variant="danger" now={80} style={{height: "10px"}}/>
        </div>
        
      </div>


      <div style={{position:"relative", color:"#4AB7FF", top: "38%"}}>
        <b>Get the SKY.IO App</b>
      </div>
    </div>
  )
}
