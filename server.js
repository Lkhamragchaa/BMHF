const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const db = require("./db");

const express = require("express");
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Update with your frontend URL
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

io.on("connection", async (socket) => {
    try {
        // Socket connection logic here

        socket.on("join_room", async (data) => {
            try {
                // Join room logic here
                await db.query('UPDATE users SET socket_id = ? WHERE id = ?', [socket.id, data.userId]);
                console.log(`User with id-${socket.id} joined room - ${data.roomId}`);
            } catch (error) {
                console.error('Error in join_room:', error);
            }
        });

        socket.on("send_msg", async (data) => {
            try {
                // Send message logic here
                const { senderId, recipientId, message } = data;

                // Save the message to the database
                await db.query('INSERT INTO messages (sender_id, recipient_id, message) VALUES (?, ?, ?)', [senderId, recipientId, message]);

                // Fetch the recipient's Socket ID from the database
                const [recipient] = await db.query('SELECT socket_id FROM users WHERE id = ?', [recipientId]);

                if (recipient && recipient.length > 0) {
                    const recipientSocketId = recipient[0].socket_id;

                    // Emit the message to the recipient's socket
                    io.to(recipientSocketId).emit("receive_msg", data);
                }
            } catch (error) {
                console.error('Error in send_msg:', error);
            }
        });

        // ... Other socket event handlers ...

        socket.on("disconnect", async () => {
            try {
                // Disconnect logic here
                await db.query('UPDATE users SET socket_id = NULL WHERE socket_id = ?', [socket.id]);
                console.log(`User with id-${socket.id} disconnected`);
            } catch (error) {
                console.error('Error in disconnect:', error);
            }
        });
    } catch (error) {
        console.error('Error in connection:', error);
    }
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Socket.io server is running on port ${PORT}`);
});
