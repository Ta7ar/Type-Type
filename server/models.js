const mongoose = require("mongoose");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
const Schema = mongoose.Schema;

const wpmSchema = new Schema(
  {
    wpm: { type: Number, required: true, unique: true },
    frequency: { type: Number, required: true },
  },
  { versionKey: false }
);

const Wpm = mongoose.model("Wpm", wpmSchema);

module.exports = { Wpm };
