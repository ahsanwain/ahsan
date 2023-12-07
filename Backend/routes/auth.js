import { Router } from "express";
import student from "../Database/schemas/student.js";
import { hashPassword, comparePassword } from "../Utils/helper.js";
import passport from "passport";


const router = Router();

// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     if(!username || !password){
//         res.status(400).send("Please enter username and password");
//     }
//     const studentDB = await student.findOne({ username: username });
//     if(!studentDB){
//         res.status(401).send("Invalid credentials");
//     }
//     const isValid = comparePassword(password, studentDB.password);
//     if(isValid) {
//         req.session.user = studentDB;
//         res.status(200).send(req.session.user);
//     } else {
//         res.status(401).send("Invalid credentials");
//     }
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(200).send(req.user); 
});

router.post('/register', async (req, res) => {
    const username = req.body.username;
    if(username && req.body.password){
        const studentDB = await student.findOne({ username: username });
        if(studentDB){
            res.status(400).send("User already exists");
        } else {
            const password = hashPassword(req.body.password);
            const newStudent = await student.create({
                username: username,
                password: password,
            });
            req.session.user = newStudent;
            res.send(req.session.user);
        }
    } else {
        res.status(400).send("Please enter username and password");
    }
});

router.post('/logout', (req, res) => {
    if(req.user){
        req.session.destroy();
        res.clearCookie('connect.sid', { path: '/'  });
        res.send("Logged out");
    } else {
        res.send("No user to log out");
    }
});

export default router;