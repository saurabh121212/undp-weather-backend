'use strict'

const multer = require('multer');

class Multer{
    constructor(fileTypes, maxSize = 20, dest="/"){
        this.maxSize = maxSize*1024*1024;
        this.fileTypes = fileTypes;
        this.dest = dest;

        this.fileFilter = (req, file, cb) => {
            console.log("file mimetype -> ", file.mimetype);
             if(this.fileTypes.includes(file.mimetype)){
                 cb(null, true);
             }
             else{
                 const invalidFileErr = new Error(`Invalid file '${file.originalname}' of type ${file.mimetype} . Allowed types are - ${this.fileTypes}`);
                 cb(invalidFileErr, false);
             }
        }

    }
    get upload(){
        return multer({
           storage: multer.diskStorage({
              destination: (req, file, cb) =>{
                  cb(null, "public/" + this.dest);
              },
              filename: (req, file, cb) => {
                  let fileName = file.originalname.replace(/[^a-zA-Z0-9.]/g,'_');
                  const newFileName = Date.now().toString() + '-' + fileName;
                  cb(null, newFileName);
              }
           }),
           fileFilter: this.fileFilter,
           limits: {
               fileSize: this.maxSize
           }             
        })
    }
}

module.exports = {Multer};