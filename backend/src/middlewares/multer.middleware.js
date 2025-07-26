const multer= require("multer")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
<<<<<<< HEAD
        cb(null, './public/temp')
=======
        cb(null, './public/uploads/temp')
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

module.exports = {storage}