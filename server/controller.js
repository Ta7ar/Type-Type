const { Wpm } = require("./models");
const saveData = (wpm) => {
  Wpm.findOne({ wpm }, async function (err, wpmDoc) {
    if (err) throw err;
    if (!wpmDoc) {
      //Document does not exist, create it
      try {
        await Wpm.create({ wpm, frequency: 1 });
      } catch (error) {
        throw error;
      }
    } else {
      try {
        //if we find a document, increment its frequency count
        wpmDoc.frequency += 1;
        await wpmDoc.save();
      } catch (error) {
        throw error;
      }
    }
  });
};

const getData = async () => {
  try {
    const wpmArr = await Wpm.find({}, "wpm frequency -_id").sort("wpm").exec();
    return wpmArr;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { saveData, getData };
