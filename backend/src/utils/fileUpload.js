const {v2} = require('cloudinary')
const fs = require('fs')

v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})

const uploadOnCloud = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await v2.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log('File uplaoded..!', response)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) 
    }
}

module.exports = {uploadOnCloud}
