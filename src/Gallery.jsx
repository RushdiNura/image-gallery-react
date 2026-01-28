import React, { useState } from "react";
import "./gallery.css";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import img4 from "./images/img4.jpg";
import img5 from "./images/img5.jpg";
import img6 from "./images/img6.jpg";
import img7 from "./images/img7.jpg";
import img8 from "./images/img8.jpg";
import img9 from "./images/img9.jpg";
import img10 from "./images/img10.jpg";
import img11 from "./images/img11.jpg";
import img12 from "./images/img12.jpg";
import img13 from "./images/img13.jpg";
import img14 from "./images/img14.jpg";

export default function Gallery() {
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [images, setImages] = useState(JSON.parse(localStorage.getItem("images"))||[
    { id: 1, imgSrc: img1 },
    { id: 2, imgSrc: img2 },
    { id: 3, imgSrc: img3 },
    { id: 4, imgSrc: img4 },
    { id: 5, imgSrc: img5 },
    { id: 6, imgSrc: img6 },
    { id: 7, imgSrc: img7 },
    { id: 8, imgSrc: img8 },
    { id: 9, imgSrc: img9 },
    { id: 10, imgSrc: img10 },
    { id: 11, imgSrc: img11 },
    { id: 12, imgSrc: img12 },
    { id: 13, imgSrc: img13 },
    { id: 14, imgSrc: img14 },
  ]);

  const getImg = (imgSrc, index) => {
    setTempImgSrc(imgSrc);
    setCurrentIndex(index);
    setModel(true);
 
  };

  const navigate = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setTempImgSrc(images[newIndex].imgSrc);
   
  };

  function handleDelete(){
    setShowDeleteModal(true)
  
  }
  function confirmDelete() {
    if (images.length > 0) {
      const newImages = [...images];
      newImages.splice(currentIndex, 1);
     
      localStorage.setItem("images",JSON.stringify(newImages));
      setImages(newImages);
      
      if (newImages.length > 0) {
      
        const newIndex = currentIndex >= newImages.length ? newImages.length - 1 : currentIndex;
        setCurrentIndex(newIndex);
        setTempImgSrc(newImages[newIndex].imgSrc);
      } else {
       
        setTempImgSrc("");
        setModel(false);
       
      }
    }
    setShowDeleteModal(false);
  }

  function cancelDelete() {
    setShowDeleteModal(false);
  }
  return (
    <>
      <div className={model ? "model open" : "model"}>
        <div className="modal-content">
          <div className="thumbnail-container">
            {images.map((item, index) => (
              <img
                key={index}
                src={item.imgSrc}
                className={`thumbnail ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => {
                  setTempImgSrc(item.imgSrc);
                  setCurrentIndex(index);
                }}
                alt=""
              />
            ))}
          </div>

          <div className="main-image-container">
            <img src={tempImgSrc} alt="" className="main-image" />
            <button className="nav-button prev" onClick={() => navigate(-1)}>
              ‹
            </button>
            <button className="nav-button next" onClick={() => navigate(1)}>
              ›
            </button>
          </div>
        </div>
        <DeleteIcon className="delete-icon" onClick={() => handleDelete()} />
        <CloseIcon className="close-icon" onClick={() => setModel(false)} />
      </div>

      <div className="gallery">
        {images.map((item, index) => (
          <div
            className="pics"
            key={index}
            onClick={() => getImg(item.imgSrc, index)}
          >
            <img
              src={item.imgSrc}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}

        {showDeleteModal && (
          <div className="delete-modal">
            <div className="modal-p">
              <p>Are you sure you want to delete this item?</p>
              <div className="modal-actions">
                <button className="modal-ok" onClick={confirmDelete}>
                  Yes, Delete
                </button>
                <button className="modal-cancel" onClick={cancelDelete}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
