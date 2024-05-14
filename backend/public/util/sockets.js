import { Server } from "socket.io";

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

        socket.on("client-submits-chat-message", (data) => {
            io.emit("server-broadcasts-chat-message", data);
        });

        socket.on("disconnect", () => {
            faces = faces.filter((face) => face.id !== socket.id);
            io.emit("update-faces", { faces: faces });        
        });
    });
}

export default setupSocketServer;
