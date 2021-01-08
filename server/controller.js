const { Wpm, Cpm } = require("./models");
const saveData = (wpm, cpm) => {
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

  Cpm.findOne({ cpm }, async function (err, cpmDoc) {
    if (err) throw err;
    if (!cpmDoc) {
      //Document does not exist, create it
      try {
        await Cpm.create({ cpm, frequency: 1 });
      } catch (error) {
        throw error;
      }
    } else {
      try {
        //if we find a document, increment its frequency count
        cpmDoc.frequency += 1;
        await cpmDoc.save();
      } catch (error) {
        throw error;
      }
    }
  });
};

const getData = async () => {
  try {
    const wpmArr = await Wpm.find({}, "wpm frequency -_id").sort("wpm").exec();
    const cpmArr = await Cpm.find({}, "cpm frequency -_id").sort("cpm").exec();
    return { wpmArr, cpmArr };
  } catch (error) {
    console.error(error);
  }
};
module.exports = { saveData, getData };
