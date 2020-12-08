const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const upload = multer({
    dest: '/server/uploads' // this saves your file into a directory called "uploads"
});

const File = require('../models/File');

router.post('/', upload.single('file'), function(req, res) {
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

router.put('/:id', upload.single('file'), function(req, res) {
    
});

router.get('/:id', function(req, res) {
    File.findById(req.params.id, function(err, file) {
        if (!file)
            res.status(404).send("data is not found");
        else {
            res.json(file);
        }
    });
});

router.get('/:id/data', function(req, res) {
    File.findById(req.params.id, function(err, file) {
        if (!file)
            res.status(404).send("data is not found");
        else {
            let dataBuffer = fs.readFileSync(file.path);

            let buf = Buffer.from(dataBuffer);
            let encodedData = buf.toString('base64');

            res.setHeader('content-type', 'application/pdf');
            res.send(encodedData);
        }
    });
});
module.exports = router;
