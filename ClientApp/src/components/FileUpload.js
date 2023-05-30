import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [blockSize, setBlockSize] = useState(1048576);
  const [inputSize, setInputSize] = useState(9);
  const [fileSize, setFileSize] = useState("Default Block Size");


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSize(file.size)
  };

  const getChunks = (data) => {
    const encoder = new TextEncoder();
    const chunkSize = 1024*1024; // Specify your desired chunk size
    const chunks = [];
    let index = 0;
  
    while (index < data.length) {
      const chunk = encoder.encode(data.slice(index, index + chunkSize));
      chunks.push(chunk);
      index += chunkSize;
    }
  
    return chunks;
  };
  
  const handleClickSize = (e) => {
    setBlockSize(e.target.value )
    setInputSize(e.target.value.length);
  }

  const handleUpload = async () => {
    setDisableButton(true)

    console.log("Handle upload clicked")
    if(selectedFile) {
      console.log("Selected data found" )
      console.log(selectedFile)
      
      // You can perform the file upload logic here
      // const data = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      const file = selectedFile
      let fileContent = ""
      var reader = new FileReader();

      
      reader.onload = async function (e) {
        const fileContent = reader.result;
        console.log('File content:', fileContent);
        const url = 'http://127.0.0.1:50030/upload/' + selectedFile.name; // Replace with your server URL
        const urlFlag = "http://127.0.0.1:50030/clearFlagOverwrite/" + selectedFile.name + "/" + blockSize
        // no need to chunk transfer
        const chunks = getChunks(fileContent); // Split the data into chunks
        
        const headers = new Headers();
        // no need to chunk transfer
        
        headers.append('Content-Type', 'text/plain;charset=utf-8');
        headers.append('Transfer-Encoding', 'chunked');
        
        // headers.append('Accept-Encoding', 'gzip'); // Include the Accept-Encoding header
        headers.append('Access-Control-Allow-Origin', '*');
        
        

        // no need to chunk transfer
        try {
          const responses = [];
          
          for (let index = 0; index < chunks.length; index++) {
            const chunk = chunks[index];
      
            const response = await fetch(url, {
              method: 'POST',
              body: chunk,
              headers: headers,
            });
      
            responses.push(response);
      
            if (response.ok) {
              console.log(`Chunk ${index + 1} uploaded successfully`);
              // Handle the successful response for the chunk
              setDisableButton(false)

              const postData = {
                status: 'clear',
              };

              await fetch(urlFlag, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
              }).then((response) => {
                if (response.ok) {
                  // Successful request
                  return response.json();
                } else {
                  // Handle error response
                  throw new Error('Error: ' + response.status);
                }
              })
              .then((data) => {
                // Handle the response data
                console.log('Response:', data);
              })
              .catch((error) => {
                // Handle the error
                console.error('Error:', error);
              });

            } else {
              console.error(`Error uploading chunk ${index + 1}:`, response.status);
              // Handle the error response for the chunk
            }
          }
      
          // Process the responses as needed
          responses.forEach((response, index) => {
            // Handle the response for each chunk
            console.log(`Response for chunk ${index + 1}:`, response);
          });
        } catch (error) {
          console.error('Error uploading chunks:', error);
          // Handle any network or other errors
        }


      };
      
      reader.readAsText(file);
      

      
    } else {
      console.log("No file selected.")
    }
    
  };

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} />
        { disableButton ? <p><em>Uploading...</em></p> : <button className='btn btn-primary' onClick={handleUpload}>Upload</button> }
      </div>
      <div>
        <input value={blockSize} onChange={handleClickSize} size={inputSize}  ></input>
        { fileSize == "Default Block Size" ? <text>{fileSize}</text> : <text>default blocksize - Data is total {fileSize} bytes</text> } 
      </div>
  
    </>
  );
};

export default FileUpload;