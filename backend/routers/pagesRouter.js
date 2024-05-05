import { Router } from 'express';
const router = Router();
import path from "path";

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/facemaker/facemaker.html'));
});

router.get("/chat/:roomName", (req, res) => {
    if (!req.session.user?.nickname) {
        return res.redirect("/");
    }
    res.sendFile(path.resolve('./public/chat.html'));
});

export default router;
