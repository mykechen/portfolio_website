import React from "react";
import "./ResumeViewer.css";

const ResumeViewer = () => {
  return (
    <div className="resume-viewer">
      <div className="resume-content">
        <h1>Myke Angelo Chen</h1>
        <h2>Software Engineer</h2>

        <section>
          <h3>Experience</h3>
          <div className="resume-item">
            <h4>Senior Software Engineer</h4>
            <p className="company">Tech Corp</p>
            <p className="date">2022 - Present</p>
            <p>
              Led development of microservices architecture, reducing latency by
              40%
            </p>
          </div>

          <div className="resume-item">
            <h4>Software Engineer</h4>
            <p className="company">Startup Inc</p>
            <p className="date">2020 - 2022</p>
            <p>
              Built full-stack applications using React, Node.js, and PostgreSQL
            </p>
          </div>
        </section>

        <section>
          <h3>Education</h3>
          <div className="resume-item">
            <h4>Bachelor of Science in Computer Science</h4>
            <p className="company">University Name</p>
            <p className="date">2016 - 2020</p>
          </div>
        </section>

        <section>
          <h3>Skills</h3>
          <p>
            JavaScript, React, Node.js, Python, AWS, Docker, Kubernetes,
            TypeScript
          </p>
        </section>

        <div className="download-button">
          <a href="/resume.pdf" download>
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
