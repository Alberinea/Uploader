# Uploader

A simple app that allows anyone to upload pdf, csv and all image types. 

**Backend**: Laravel8

**Frontend**: React

**Database**: Free Mysql Cloud with 5mb space

**Server to store files**: Google Drive

## Libraries used

- [FilePond](https://pqina.nl/filepond/) for interactive drag n' drop uploader.

## Features

- Supports Pdf, Csv and all image types. 5mb Limit.
- Image Resizing
- File Deletion
- Dynamic Routing

## Things that could be improved or implemented

- Search and Filter
- Better resizing GUI
- Lazy loading
- Pagination
- Auth
- File Rating
- More File Detail UI
- More advanced page UI

## Deployment issues fixed

- Fixed resizing did not work because ext-gt was not installed on heroku
- Fixed bug could not upload more than 2mb by loading customized user.ini

## Demo

[Live Demo](https://uploader-13.herokuapp.com)