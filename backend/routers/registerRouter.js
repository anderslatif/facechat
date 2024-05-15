import escape from "escape-html";
import filterProfanity from "../util/profanityFilter.js";
import { Router } from 'express';
const router = Router();

router.post('/api/register', (req, res) => {
    const { nickname, faceColor, browColor, eyeColor, mouthColor } = req.body;
    if (!nickname) {
        nickname = "Anonymous";
    }
    if (nickname.length > 16) {
        return res.status(400).send({ message: "Nickname is too long" });
    }

    if (!faceColor) {
        return res.status(400).send({ message: "Face color is required" });
    }
    if (!browColor) {
        return res.status(400).send({ message: "Brow color is required" });
    }
    if (!eyeColor) {
        return res.status(400).send({ message: "Eye color is required" });
    }
    if (!mouthColor) {
        return res.status(400).send({ message: "Mouth color is required" });
    }

    const chatRoomName = "public";

    req.session.user = { 
        nickname: escape(filterProfanity(nickname)), 
        faceColor: escape(faceColor), 
        eyeColor: escape(eyeColor), 
        mouthColor: escape(mouthColor), 
        browColor: escape(browColor),
        chatRoomName
    }

    res.send({ success: true, message: "Registration successful", chatRoomName });
});

export default router;
