import passport from "passport";
import {Strategy} from "passport-local";
import student from "../Database/schemas/student.js";
import { comparePassword } from "../Utils/helper.js";

passport.serializeUser((user, done) => {
    done(null, user._id);
    });

passport.deserializeUser(async (id, done) => {
    try {
        const studentDB = await student.findById(id);
        if(!studentDB) throw new Error("User not found");
        done(null, studentDB);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
  new Strategy(
    {
      usernameField: "username",
    },
    async(username, password, done) => {
      try {
        if(!username || !password){
          throw new Error("Please enter username and password");
        }
        const studentDB = await student.findOne({ username: username });
        if(!studentDB){
          throw new Error("Invalid credentials");
        }
        const isValid = comparePassword(password, studentDB.password);
        if(isValid) {
            console.log("Valid auth");
          return done(null, studentDB);
        } else {
            console.log("Invalid auth");
          return done(null, null);
        }

      } catch (error) {
        done(error, null);
      }

    }
    
  )
);
