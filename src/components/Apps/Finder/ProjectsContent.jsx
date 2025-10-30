import React from "react";
import "./ProjectsContent.css";

const ProjectsContent = () => {
  const projects = [];

  return (
    <div className="projects-content">
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-folder">
            <img
              src={project.icon}
              alt={project.name}
              className="project-folder-icon"
            />
            <div className="project-folder-name">{project.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
