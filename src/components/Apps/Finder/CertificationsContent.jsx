import React from "react";
import "./CertificationsContent.css";

const CertificationsContent = () => {
  const certifications = [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2024-01",
      image: "https://via.placeholder.com/150x150",
    },
    {
      name: "Google Cloud Professional",
      issuer: "Google",
      date: "2023-12",
      image: "https://via.placeholder.com/150x150",
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2023-10",
      image: "https://via.placeholder.com/150x150",
    },
  ];

  return (
    <div className="certifications-content">
      <div className="certifications-list">
        {certifications.map((cert) => (
          <div key={cert.name} className="certification-item">
            <img src={cert.image} alt={cert.name} />
            <div className="certification-info">
              <h3>{cert.name}</h3>
              <p className="issuer">{cert.issuer}</p>
              <p className="date">Issued: {cert.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsContent;
