const multer= require("multer")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './public/uploads/temp')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

module.exports = {storage}