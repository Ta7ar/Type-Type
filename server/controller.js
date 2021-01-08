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

  Cpm.findOne({ wpm }, async function (err, cpmDoc) {
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
        await pmDoc.save();
      } catch (error) {
        throw error;
      }
    }
  });
};
module.exports = { saveData };
