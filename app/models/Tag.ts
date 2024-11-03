import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
});

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
export default Tag;
