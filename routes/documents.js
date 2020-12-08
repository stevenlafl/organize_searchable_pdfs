const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    dest: '/server/uploads' // this saves your file into a directory called "uploads"
});
const fs = require("fs");
const pdf = require("pdf-extraction");
const Document = require('../models/Document');
const File = require('../models/File');

router.get('/', function(req, res) {
    Document.find(function(err, documents) {
        if (err) {
            console.log(err);
        } else {
            res.json(documents);
        }
    });
});

router.post('/', function(req, res) {
    const document = new Document(req.body);

    File.findById(document.file, function(err, file) {
                 
        let dataBuffer = fs.readFileSync(file.path);
        pdf(dataBuffer).then(function (data) {

            document.text = data.text;
            document.save()
            .then(document => {
                res.status(200).json({'document': 'document added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new document failed');
            });
        });
    });
});

// Returns back the filename inside the upload folder.
router.get('/:id', function(req, res) {
    const id = req.params.id;
    Document.findById(id, function(err, document) {
        res.json(document);
    });
});

router.delete('/:id', function (req, res) {
    Document.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('deleted successfully!');
    })
});

router.put('/:id', async function(req, res) {
    Document.findById(req.params.id, function(err, document) {
        if (!document)
            res.status(404).send("data is not found");
        else
            document.title = req.body.title;
            document.sender = req.body.sender;
            document.received = req.body.received;
            document.file = req.body.file;

            File.findById(document.file, function(err, file) {
                 
                let dataBuffer = fs.readFileSync(file.path);

                document.text = dataBuffer.text;

                // document.save().then(document => {
                //     res.json('Document updated!');
                // })
                // .catch(err => {
                //     res.status(400).send("Update not possible");
                // });
            });
    });
});

module.exports = router;