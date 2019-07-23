import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const App = () => {
  const maxSize = 5242880;

  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles} = useDropzone({
    accept: 'image/jpeg, image/png, image/gif', 
    multiple: false,
    minSize: 0, 
    maxSize: maxSize, 
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={file.name}
        />
      </div>
    </div>
  ));

  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
  const isFileExist = files.length > 0;

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const uploadImg = files.forEach(file => {
    let url = 'http://localhost:8080/';
    let formData = new FormData();
    formData.append("file", file);

    axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(() => {alert(`upload 성공`)})
    .catch(e => {alert(`upload 실패`)})
  });

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
          {!isDragActive && !isFileExist && "Click me or drag a file to upload!"}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
          {isFileTooLarge && (<div className="text-danger mt-2">File is too large.</div>)}
          {isFileExist && (
            <>
            <div style={thumbsContainer}>
              {thumbs}
            </div>
            <button type="button" onClick={uploadImg}>Upload</button>
            </>
          )}
      </div>
    </section>
  );
}

export default App;