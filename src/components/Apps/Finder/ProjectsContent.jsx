import React from "react";
import "./ProjectsContent.css";

const ProjectsContent = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce application with payment integration",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      technologies: ["React", "Firebase", "Material-UI"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather dashboard with forecasts",
      technologies: ["React", "OpenWeather API", "Chart.js"],
      image: "https://via.placeholder.com/400x300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ];

  return (
    <div className="projects-content">
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.title} className="project-card">
            <img src={project.image} alt={project.title} />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;
