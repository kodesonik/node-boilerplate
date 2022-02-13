import multer from 'multer'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/'+file.fieldname)
    },
    filename: function (req, file, cb) {
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length - 1];
      cb(null,  Date.now().toString() + '.' + extension)
    }
  })
  
  var upload = multer({ storage: storage })

  export default upload
