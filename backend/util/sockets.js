import { Server } from "socket.io";
import escape from "escape-html";
import filterProfanity from "./profanityFilter.js";

const messageLengthLimit = 200;

function setupSocketServer(server, sessionMiddleware) {
    const io = new Server(server);

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));
    
    let faces = [];
    
    io.on("connection", (socket) => {
        socket.emit("receive-id", { id: socket.id });

        if (!socket.request.session.user) {
            return;
        }
        const faceInfo = socket.request.session.user;
        faceInfo.id = socket.id;
        faces.push(faceInfo);
        
        socket.emit("receive-id", { id: socket.id });
        io.emit("update-faces", { faces: faces });

        socket.on("client-submits-chat-message", ({ id, message }) => {
            // let safeMessage = escape(filterProfanity(message));
            let safeMessage = filterProfanity(message);
            if (safeMessage.length > messageLengthLimit) {
                safeMessage = safeMessage.substring(0, messageLengthLimit);
            }
            safeMessage = safeMessage.trim();
            // remove zero-width space characters
            safeMessage = safeMessage.replace(/[\u200B-\u200D\uFEFF]/g, '');
            if (safeMessage.length === 0) {
                return;
            }
            io.emit("server-broadcasts-chat-message", { id, message: safeMessage });
        });

        socket.on("disconnect", () => {
            faces = faces.filter((face) => face.id !== socket.id);
            io.emit("update-faces", { faces: faces });        
        });
    });
}

export default setupSocketServer;
