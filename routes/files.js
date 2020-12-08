const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: '/server/uploads' // this saves your file into a directory called "uploads"
});

const File = require('../models/File');

router.post('/upload', upload.single('file'), function(req, res) {
    /**
        {
            fieldname: 'file',
            originalname: 'tally.txt',
            encoding: '7bit',
            mimetype: 'text/plain',
            destination: '/server/uploads',
            filename: '6511cdc94dc12f35d000968e49f1f3da',
            path: '/server/uploads/6511cdc94dc12f35d000968e49f1f3da',
            size: 158
        }
    */

    let tempfile = req.file;
    delete tempfile.fieldname;
    
    let file = new File(tempfile);
    file.save();
    
    res.json({id: file.id});
});
router.get('/upload/:id', upload.single('file'), function(req, res) {
    const id = req.params.id;
    let file = req.file;
    res.json({id: file.filename});
});

module.exports = router;
