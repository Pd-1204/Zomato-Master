import express, { Router } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import { ImageModel } from "../../Database/image";
import { s3Upload } from "../../UTILS/AWS/s3";

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

Router.post("/", upload.single("file"), async(req,res)=>{
    try {
        const file = req.file;
        const bucketOptions = {
            Bucket: "pdzomatomaster",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read" 
        };
        const uploadImage = await s3Upload(bucketOptions);
        return res.status(200).json({uploadImage});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
});

export default Router;