import React from "react";
import "./about.css";
import { Container, Row, Col } from "react-bootstrap";
import Github from "./GitHub";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../assets/about.png";
import Toolstack from "./Toolstack";

function About() {
  return (
    <Container fluid className="about-section">
      <Container>
        <Row className="about-content">
          <Col 
            md={7} 
            className="about-text"
            style={{
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em"}} className="heading">
              Get to Know <strong className="purple">Who I Am</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col 
            md={5} 
            className="about-img"
          >
            <img src={laptopImg} alt="about" className="img-fluid" />
          </Col>
        </Row>
        
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />

        <Github />
      </Container>
    </Container>
  );
}

export default About;