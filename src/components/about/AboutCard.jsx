import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Anurag Chandra </span>
            from <span className="purple"> Rohtas,Bihar, India.</span><br />
            <br />
            I am currently studying at NIT Patna.
            <br />
            I am currently doing B-Tech in Electronics and Communication engineering from National Institute of Technology Patna.  <br></br>
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Photgraphy
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Anurag</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;