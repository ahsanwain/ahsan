import express from "express";
import studentsRouter from "./routes/students.js";
import authRouter from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./strategies/local.js";

const app = express();
const port = 5000;
import "./Database/index.js";

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "SDJWOD328UD8W37DO12876DNAJSDHU327EPKLKAJSDH",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/StudentDB",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/", studentsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
