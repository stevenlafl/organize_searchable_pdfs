const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    /** The sender's name */
    sender: {
        type: String
    },
    /** Unix timestamp when the PDF was received */
    received: {
        type: String
    },
    /** The ID of the file */
    file: {
        type: String
    },
    /** The Text inside the PDF */
    text: {
        type: String,
    }
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
