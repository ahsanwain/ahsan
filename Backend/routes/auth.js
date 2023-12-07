import { Router } from "express";
import student from "../Database/schemas/student.js";

const router = Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(username && password){
        if (username === "admin" && password === "admin") {
            req.session.user = {
            username: username,
            };
        res.send(req.session.user);
        } else {
            res.send("Username or password incorrect");
        }
    } else {
        res.sendStatus(400).send("Please enter username and password");
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if(username && password){
        const studentDB = await student.findOne({ username: username });
        if(studentDB){
            res.send("User already exists");
        } else {
            const newStudent = await student.create({
                username: username,
                password: password,
            });
            req.session.user = {
                username: username,
            };
            res.send(req.session.user);
        }
    } else {
        res.send("Please enter username and password");
    }
});

router.post('/logout', (req, res) => {
    if(req.session.user){
        req.session.destroy(() => {
            res.send("Logged out");
        });
    } else {
        res.send("No user to log out");
    }
});

export default router;