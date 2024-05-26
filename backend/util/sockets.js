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

        // should only happen when the server restarts
        if (!socket.request.session.user) {
            socket.emit("logout", {});
            return;
        }

        socket.request.session.user.id = socket.id;

        const faceInfo = socket.request.session.user;
        faceInfo.id = socket.id;
        faces.push(faceInfo);
        
        socket.emit("receive-id", { id: socket.id });
        io.emit("update-faces", { faces: faces });

        socket.on("client-submits-chat-message", ({ id, message }) => {
            // let safeMessage = escape(filterProfanity(message));
            let safeMessage = filterProfanity(escape(message));
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

        socket.on("client-updates-pupils", (data) => {
            data.id = socket.id;
            socket.broadcast.emit("update-pupils", data);
        });

        socket.on("client-winks", (data) => {
            data.id = socket.id;
            socket.broadcast.emit("update-winks", data);
        });

        socket.on("client-sleeps", (data) => {
            data.id = socket.id;
            socket.broadcast.emit("update-sleep", data);
        });

        socket.on("client-wakes", (data) => {
            data.id = socket.id;
            socket.broadcast.emit("update-wake", data);
        });

        socket.on("disconnect", () => {
            faces = faces.filter((face) => face.id !== socket.id);
            io.emit("update-faces", { faces: faces });        
        });
    });
}

export default setupSocketServer;
