import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
} from "react-icons/di";
import {
  SiFirebase,
} from "react-icons/si";

function Techstack() {
  return (
    
    <div className="tools-section">
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }} className="tools-row">
      <Col xs={4} md={2} className="tech-icons" data-name="C++">
        <CgCPlusPlus   />
      </Col>
      <Col xs={4} md={2} className="tech-icons" data-name="JavaScript">
        <DiJavascript1 style={{ color: "#F0DB4F" }}/>
      </Col>
      <Col xs={4} md={2} className="tech-icons" data-name="Node.js">
        <DiNodejs style={{ color: "#68A063" }} />
      </Col>
      <Col xs={4} md={2} className="tech-icons" data-name="React.js">
        <DiReact  style={{ color: "#61DBFB" }}/>
      </Col>
      <Col xs={4} md={2} className="tech-icons" data-name="MongoDB">
        <DiMongodb style={{ color: "#4DB33D" }}/>
      </Col>
      <Col xs={4} md={2} className="tech-icons" data-name="Git">
        <DiGit style={{ color: "#F1502F" }}/>
      </Col>
      <Col xs={4} md={2} className="tech-icons" data-name="Firebase">
        <SiFirebase style={{ color: "#FFCA28" }}/>
      </Col>
      <Col xs={4} md={2} className="tech-icons" data-name="Python">
        <DiPython style={{ color: "#3776AB" }}/>
      </Col>
    </Row>
    </div>
  );
}

export default Techstack;