require('dotenv').config({ path: './utils/.env' });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})


const UploadRoute = require('express').Router();


UploadRoute.post("/", async (req, res) => {
    try {
        let {image} = req.body;
        let imageStr = `data:image/jpg;base64,${image}`;
        cloudinary.uploader.upload_large(imageStr, {width:150, crop: "scale"}, (err, result)=>{
            if(err) throw new Error(err)
            res.status(200).json(result)
        })
    } catch (error) {
        res.status(500).json({ error });
    }
});


module.exports = UploadRoute;