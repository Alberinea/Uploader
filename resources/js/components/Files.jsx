import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getFileImage from '../utils/getFileImage';

function Files() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    const response = await (await fetch('/api/files')).json();
    setFiles(response.data);
    setIsLoading(false);
  }, []);

  return (
    <section className="pt-lg-5 px-lg-5 pt-4 px-2">
      <div className="container text-center">
        {!isLoading ? (
          <div className="row gy-3 text-center">
            {!files.length ? (
              <div className="fs-2">No Files</div>
            ) : (
              files.map((file) => (
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
              ))
            )}
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
