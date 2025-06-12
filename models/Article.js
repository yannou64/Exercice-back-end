import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    category: {
      type: String,
    },
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Article = mongoose.model("Article", articleSchema);
