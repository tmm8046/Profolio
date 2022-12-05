const mongoose = require('mongoose');
const _ = require('underscore');

let Project = {};

const setName = (name) => _.escape(name).trim();
const setDesc = (desc) => _.escape(desc).trim();
const setImage = (img) => _.escape(img).trim();

const ProjSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  img: {
    type: String,
    required: true,
    trim: true,
    set: setImage,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
    set: setDesc,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

ProjSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  img: doc.img,
  desc: doc.desc,
});

ProjSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return Project.find(search).select('name age').lean().exec(callback);
};

Project = mongoose.model('Project', ProjSchema);

module.exports = Project;
