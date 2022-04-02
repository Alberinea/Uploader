import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const CSRFtoken = document.head.querySelector(
    'meta[name="csrf-token"]',
  ).content;

  const serverParams = {
    url: '/api/upload',
    headers: {
      'X-CSRF-TOKEN': CSRFtoken,
    },
    process: {
      onload: (res) => {
        const data = JSON.parse(res);
        const file = [data.file];
        setFileData([...fileData, ...file]);
        setShowAlert(true);
      },
    },
  };

  registerPlugin(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImageResize,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
  );

  return (
    <section className="pt-lg-5 px-lg-5 pt-4 px-2">
      {showAlert ? (
        <div
          className="alert alert-success alert-dismissible fade show py-2
          d-flex justify-center"
          role="alert"
        >
          <strong className="me-2">File Uploaded!</strong>{' '}
          <Link
            className="me-1"
            to={`/files/${fileData[fileData.length - 1].name}`}
          >
            Click here
          </Link>{' '}
          to see the file.
          <button
            style={{ fontSize: '0.7rem' }}
            type="button"
            className="btn-close pt-2"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      ) : null}
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        onaddfile={() => setShowAlert(false)}
        name="file"
        maxFileSize="5MB"
        acceptedFileTypes={['image/*', 'application/pdf', 'text/csv']}
        server={serverParams}
        allowRevert={true}
        allowMultiple={true}
      ></FilePond>
    </section>
  );
};

export default Home;
