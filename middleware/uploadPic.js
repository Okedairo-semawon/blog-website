import multer from 'multer';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../Uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
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