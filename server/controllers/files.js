const File = require('../models/file.js');

const uploadPage = (req, res) => {
  res.render('upload');
};

const uploadFile = async (req, res) => {
  if (!req.files || !req.files.sampleFile) {
    return res.status(400).json({ error: 'No files were uploaded' });
  }

  const { sampleFile } = req.files;

  try {
    const newFile = new File(sampleFile);
    const doc = await newFile.save();
    return res.status(201).json({
      message: 'File stored successfully!',
      fileId: doc._id,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      error: 'Something went wrong uploading file!',
    });
  }
};

const retrieveFile = async (req, res) => {
  if (!req.query._id) {
    return res.status(400).json({ error: 'Missing file id!' });
  }

  let doc;
  try {
    doc = await File.findOne({ _id: req.query._id }).exec();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Something went wrong retrieving file!' });
  }

  if (!doc) {
    return res.status(404).json({ error: 'File not found!' });
  }

  res.set({

    'Content-Type': doc.mimetype,

    'Content-Length': doc.size,

    'Content-Disposition': `filename="${doc.name}"`, /* `attachment; filename="${doc.name}"` */
  });

  return res.send(doc.data);
};

module.exports = {
  uploadPage,
  uploadFile,
  retrieveFile,
};
