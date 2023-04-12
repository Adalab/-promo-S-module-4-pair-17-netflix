// MongoDb III - 1.1

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const favoriteSchema = new Schema(
  {
    users: { type: Schema.Types.ObjectId, ref: "users" },
    movies: { type: Schema.Types.ObjectId, ref: "movies" },
    score: Number,
  },
  { collection: "favorite" }
);
const Favorite = mongoose.model("favorite", favoriteSchema);
module.exports = Favorite;
