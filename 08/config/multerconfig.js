const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

//diskstorage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images/profiles')
    },
    filename : function (req, file, cb){
        crypto.randomBytes(10, function(err, byte){
            const fname = byte.toString('hex') + path.extname(file.originalname);
            cb(null, fname)
        })
    }
})
const upload = multer({storage: storage});



module.exports = upload;
//export upload variable
