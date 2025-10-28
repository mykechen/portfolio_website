import React from "react";
import "./AboutContent.css";

const AboutContent = () => {
  const skills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "TypeScript",
  ];

  return (
    <div className="about-content">
      <div className="about-header">
        <div className="profile-image">
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <h1>Myke Angelo Chen</h1>
        <p className="title">Software Engineer</p>
      </div>

      <div className="about-section">
        <h2>About Me</h2>
        <p>
          I'm a passionate software engineer with experience building scalable
          web applications and cloud solutions. I love creating intuitive user
          experiences and solving complex technical challenges.
        </p>
        <p>
          When I'm not coding, you can find me exploring new technologies,
          contributing to open source projects, or sharing knowledge with the
          developer community.
        </p>
      </div>

      <div className="about-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2>Interests</h2>
        <p>
          Full-Stack Development, Cloud Computing, Open Source, Machine Learning
        </p>
      </div>
    </div>
  );
};

export default AboutContent;
