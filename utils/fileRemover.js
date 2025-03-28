import fs from 'fs';
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const  __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileRemover = (filename) => {
    fs.unlink(path.join(__dirname, '../Uploads', filename), function (err) {
        if(err && err.code === 'ENOENT') {
            console.log(`File ${filename} doesn't exist `)
        }else  if (err ) {
            console.log(`Error occurrred while trying to delete ${filename}`)
        } else {
            console.log(`${filename} has been deleted successfully `)
        }
        
    })
}

export default fileRemover;