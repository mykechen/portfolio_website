import React from "react";
import "./CertificationsContent.css";

const CertificationsContent = () => {
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
