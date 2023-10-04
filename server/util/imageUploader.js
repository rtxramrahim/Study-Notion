const cloudinary = require('cloudinary').v2
const imageUploadToCloudinary = async(file,folder,height,quality)=>{
    try{
        const options = {folder}
        if(height){
            options.height = {height}
        }
        if(quality){
            options.quality = {quality}
        }
        options.resource_type = "auto"
    
        return await cloudinary.uploader.upload(file.tempFilePath,options)
    }catch(err){
        console.log("err in uploading image")
        console.log(err)
    }
    
}

module.exports = imageUploadToCloudinary