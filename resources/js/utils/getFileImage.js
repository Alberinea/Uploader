const getFileImage = (file, override = false) => {
  if (file.file_type === 'text/csv' && !override) {
    return `https://upload.wikimedia.org/wikipedia/commons/c/c6/.csv_icon.svg`;
  } else if (file.file_type === 'application/pdf' && !override) {
    return 'https://upload.wikimedia.org/wikipedia/commons/6/6c/PDF_icon.svg';
  } else {
    return `https://drive.google.com/uc?export=download&id=${file.path_id}`;
  }
};

export default getFileImage;
