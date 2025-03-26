import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads', filename))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} -${file.originalname}`)
    }
})

const uploadPic = multer({
    storage: storage,
    limits: {
        filesize: 3 * 1024 * 1024 // 3MB
    }, 

    fileFilter: (req, file, cb) => {
        const ext = path.extname( file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb( new Error ('Only images are allowed'));
        }
        cb (null, true);
    }
})

export default uploadPic;