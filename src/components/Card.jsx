import React from "react";
import './styles.css'
const projects = [
  {
    title: "PORTFOLIO",
    image: "/portfolio.png",
    description: "Showcasing Skills",
    techStack: ["React", "CSS", "Supabase"],
    link: "https://anuragchandra.netlify.app/"
  },

];

const techColors = {
  React: "#61DBFB",
  "Next.js": "#000000",
  "Three.js": "#ff8f00",
  "CSS": "#264de4",
  "JavaScript": "#f7df1e",
  "TypeScript": "#3178c6",
  "Node.js": "#8cc84b",
  Netlify: "#00c7b7",
  Supabase: "#3ecf8e",
  MongoDB: "#4db33d",
  Tailwind: "#38bdf8",
  GLSL: "#8e44ad",
  "D3.js": "#f79f1f"
};

function Card({ title, image, description, techStack, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="c_1_cardWrap"
    >
      <div className="forhover">
        <img src={image} alt={title} className="c_2_imgBox" />
        <h2 className="c_3_titleText">{title}</h2>
        <p className="c_4_descText">{description}</p>
        <div className="c_5_tagRow">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="c_6_tagBadge"
              style={{ backgroundColor: techColors[tech] || "#0b4374b9" }}
            >
              {tech}
            </span>
          ))}
          
        </div>
      </div>
    </a>
  );
}
export default function ProjectsView() {
  return (
    <div className="c_0_projectsMain">
      {projects.map((project, i) => (
        <Card key={i} {...project} />
      ))}
    </div>
  );
}
