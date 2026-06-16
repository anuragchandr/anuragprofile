import React from "react";
import { Row, Col } from "react-bootstrap";
import { VscVscode } from "react-icons/vsc";
import {
  SiPostman,
  SiNetlify,
  SiVercel,
  SiGithub,
} from "react-icons/si";

function Toolstack() {
  return (
    <div className="tools-section">
      <Row className="tools-row">
        <Col className="tech-icons-col" data-name="VS Code">
          <VscVscode style={{ color: "#007ACC" }} />
        </Col>
        <Col className="tech-icons-col" data-name="Postman">
          <SiPostman style={{ color: "#FF6C37" }}/>
        </Col>
        <Col className="tech-icons-col" data-name="netlify">
          <SiNetlify style={{ color: "#caffbf" }}/>
        </Col>
        <Col className="tech-icons-col" data-name="GitHub">
          <SiGithub style={{ color: "#ffffff" }}/>
        </Col>
        <Col className="tech-icons-col" data-name="Vercel">
          <SiVercel style={{ color: "#fafafa" }}/>
        </Col>
      </Row>
    </div>
  );
}

export default Toolstack;