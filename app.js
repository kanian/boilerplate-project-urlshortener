/** Install & Set up mongoose */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("dotenv").config();
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri);

/** Create a 'URL' Model */

const URLSchema = new Schema({
  original_url: String,
  short_url: String
});
const URL = mongoose.model("URL", URLSchema);

/** Create and Save an URL */

const createAndSaveURL = async function(original_url) {
  const found = await findByOriginalUrl(original_url);
  // If err
  if(found instanceof Error){
    throw found
  }
  // If already shortened, return old shortened
  if (found) {
    console.log(`already in ${found}`)
    return found;
  }

  const url = new URL({
    original_url
  });
  const saved = await url.save();
  saved.short_url = saved._id;
  await saved.save();
  return { original_url, short_url: saved.short_url };
};

/** Find an URL by ID */
const findURLById = async function(urlId) {
  return await URL.findById(urlId);
};

/** Find an URL by the original_url */
const findByOriginalUrl = async function(original_url) {
  return await URL.findOne({ original_url }).select('original_url short_url -_id');
};
exports.URLModel = URL;
exports.createAndSaveURL = createAndSaveURL;
exports.findURLById = findURLById;
