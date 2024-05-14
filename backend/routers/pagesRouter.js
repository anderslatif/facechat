import { Router } from 'express';
const router = Router();
import path from "path";

const avilableRooms = ["public"];

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/facemaker/facemaker.html'));
});

router.get("/chat/:roomName", (req, res) => {
    if (!req.session.user?.nickname) {
        return res.redirect("/");
    }
    const roomName = req.params.roomName;
    if (!avilableRooms.includes(roomName)) {
        return res.redirect("/");
    }

    res.sendFile(path.resolve('./public/chat/chat.html'));
});

export default router;
