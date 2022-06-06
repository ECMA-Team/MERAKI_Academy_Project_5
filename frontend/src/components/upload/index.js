
import React, { useState } from "react";

function Upload() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "maxqgc69");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/hudhud/image/upload",
      //? the key =>https://api.cloudinary.com/v1_1/hudhud/image/upload =>link is constant ,The thing that changes is the word hudhud 
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: "300px" }} />
      )}
    </div>
  );
}

export default Upload;