import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // You can perform the file upload logic here
    if (selectedFile) {
      // Example: upload the file using FormData and fetch
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('https://example.com/upload', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          console.log('File uploaded successfully:', data);
        })
        .catch(error => {
          // Handle any error that occurred during the upload
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className='btn btn-primary' onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;