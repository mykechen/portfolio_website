import React, { useState } from "react";
import "./PhotosContent.css";

const PhotosContent = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Function to get all images from the gallery folder
  // Simply list all filenames here - add new images by adding their filename to this array
  const getGalleryImages = () => {
    return [
      "/images/gallery/0A297E53-38CD-4011-ABFF-6F34EDD0C01E_1_105_c.jpeg",
      "/images/gallery/115F0BEA-A478-4733-BCF6-C8948340A171_1_105_c.jpeg",
      "/images/gallery/1AFAD935-B36D-4D2D-B3E5-42509996ABDA_1_105_c.jpeg",
      "/images/gallery/27EDB727-D9BD-483A-9460-763DC634BE4B.jpeg",
      "/images/gallery/2DFB027F-359B-4B72-9A0F-74873FD05C06_1_105_c.jpeg",
      "/images/gallery/35C0FC5B-AAE7-44ED-B4F9-226BF4E0F64C_1_102_o.jpeg",
      "/images/gallery/434BBD6A-545A-48CE-A8D7-249E078736EA_1_105_c.jpeg",
      "/images/gallery/4FAFBC04-59CE-45A8-A62A-8B27CDD1DB90_1_105_c.jpeg",
      "/images/gallery/5044905D-BB89-48EB-999F-331CED58C8D3_1_105_c.jpeg",
      "/images/gallery/72E14030-E5F7-4109-82B9-2DB7B071BA17_1_105_c.jpeg",
      "/images/gallery/77397B2F-01C8-448E-B2DE-4E8593923F04_1_105_c.jpeg",
      "/images/gallery/78E6666C-61F1-4AB1-8A87-81A6A91124BC_1_105_c.jpeg",
      "/images/gallery/7D455FD1-BCAB-40E2-A362-2E2DBB5DE37E_1_102_o.jpeg",
      "/images/gallery/80D203A2-D11C-4C86-BA28-A6F5A072C225_1_105_c.jpeg",
      "/images/gallery/88E88F5D-1483-4B9C-B7B2-10A9A9E42062_1_105_c.jpeg",
      "/images/gallery/8A65AB68-19ED-43BB-BC4E-B898BC6441F0_1_105_c.jpeg",
      "/images/gallery/8FB220BD-AB62-4DD8-93C1-7F0386B6414C_1_105_c.jpeg",
      "/images/gallery/96C401F3-BA9F-4114-99C2-98949B76818F_1_105_c.jpeg",
      "/images/gallery/9A9E2D20-FDBF-4561-A6C2-250759D7034D_1_105_c.jpeg",
      "/images/gallery/9BE5E874-D617-4DA3-9EC6-6115EB7550A6_4_5005_c.jpeg",
      "/images/gallery/9E351251-2CF2-4F80-A944-BDF5BF1CB523_1_105_c.jpeg",
      "/images/gallery/9E6729BA-92A2-4824-88D9-0D811F486AA0_1_102_a.jpeg",
      "/images/gallery/A2E6AB64-C1EE-4108-9A73-4151B3988DDC_1_105_c.jpeg",
      "/images/gallery/AA4AA336-9BEC-4D3F-B9D2-C35A548819C0_1_105_c.jpeg",
      "/images/gallery/B77FE62D-98FC-4F59-B1A1-AF1169A4DF9A_1_102_o.jpeg",
      "/images/gallery/B9329615-896C-4893-B1ED-7B1DF2626EE1_1_105_c.jpeg",
      "/images/gallery/C951359F-5390-41BF-B7FD-A9D61A8C8DAB_1_105_c.jpeg",
      "/images/gallery/CDEE23F2-136E-4DBF-A3CE-BF8FDC14CAF6_1_105_c.jpeg",
      "/images/gallery/D1218EBC-3EBE-4EE4-B965-3AEE914FB04C_1_102_o.jpeg",
      "/images/gallery/D399EDE1-52FB-4F00-9D54-770BD4514370_1_105_c.jpeg",
      "/images/gallery/DF499A32-BD01-4F96-BC9B-1F20A763C9E4_1_102_o.jpeg",
      "/images/gallery/E44A0E2E-97BA-4C58-9C81-47B93C5E39DD_1_105_c.jpeg",
      "/images/gallery/F6302996-BB71-43BA-8C40-54FD85A8D516_1_102_o.jpeg",
      "/images/gallery/F65AEEE6-F5D0-490F-ACC0-F17777EDC25B_1_102_a.jpeg",
      "/images/gallery/F9E4EF4F-A9FF-4BD7-A0D3-5A32D504C13F_1_105_c.jpeg",
      "/images/gallery/F9ED55C3-BD3A-4427-8AB0-447B6DD35A0C_1_105_c.jpeg",
      "/images/gallery/image2.JPG",
      "/images/gallery/image3.JPG",
      "/images/gallery/image6.JPG",
    ];
  };

  const images = getGalleryImages();

  const handleImageClick = (src, e) => {
    e.stopPropagation();
    setExpandedImage(src);
    setIsClosing(false);
  };

  const handleCloseExpanded = (e) => {
    e.stopPropagation();
    setIsClosing(true);
    // Wait for animation to complete before removing the image
    setTimeout(() => {
      setExpandedImage(null);
      setIsClosing(false);
    }, 300); // Match the animation duration
  };

  return (
    <div className="photos-content">
      <div className="photos-masonry">
        {images.map((src) => (
          <div
            key={src}
            className="photos-masonry-item"
            onClick={(e) => handleImageClick(src, e)}
          >
            <img
              src={src}
              alt={src.split("/").pop() || "Gallery item"}
              className="photos-image"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {expandedImage && (
        <div
          className={`photos-expanded-overlay ${isClosing ? 'closing' : ''}`}
          onClick={handleCloseExpanded}
        >
          <img
            src={expandedImage}
            alt="Expanded view"
            className={`photos-expanded-image ${isClosing ? 'closing' : ''}`}
            onClick={handleCloseExpanded}
          />
        </div>
      )}
    </div>
  );
};

export default PhotosContent;
