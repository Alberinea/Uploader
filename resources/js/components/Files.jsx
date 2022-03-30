import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Files() {
  const [files, setFiles] = useState([]);

  useEffect(async () => {
    const response = await (await fetch('/api/files')).json();
    setFiles(response.data);
  }, []);

  const getFileImage = (file) => {
    if (file.file_type === 'application/csv') {
      return `https://upload.wikimedia.org/wikipedia/commons/c/c6/.csv_icon.svg`;
    } else if (file.file_type === 'application/pdf') {
      return 'https://upload.wikimedia.org/wikipedia/commons/6/6c/PDF_icon.svg';
    } else {
      return `https://drive.google.com/uc?export=download&id=${file.path_id}`;
    }
  };

  return (
    <section className="p-5">
      <div className="container text-center">
        {files.length ? (
          <div className="row gy-3 text-center">
            {files.map((file) => (
              <Link
                className="d-block text-black col-lg-2 text-decoration-none"
                to={'/files/' + file.name}
                key={file.name}
              >
                <div className="card">
                  <img
                    style={{ height: '200px' }}
                    src={getFileImage(file)}
                    className="card-img-top"
                    alt="image"
                  ></img>
                  <h5 className="card-title pt-2 fs-6 text-truncate px-3 ">
                    {file.name}
                  </h5>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default Files;
