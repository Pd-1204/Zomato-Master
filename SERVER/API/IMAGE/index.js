import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import { ImageModel } from "../../Database/image";

const router = express.Router();

//multer configuration
const storage = multer.memoryStorage();
const upload = multer({storage});


/* 
Route        /
des          uploading the given image to AWS S3 BUkCKET and then saving file to mongodb
params       none
access       public
method       POST
*/

