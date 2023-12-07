import mongoose, { mongo } from "mongoose";

mongoose.connect("mongodb://localhost:27017/StudentDB")
.then(console.log("DB Connected"))
.catch((err) => console.log(err));
