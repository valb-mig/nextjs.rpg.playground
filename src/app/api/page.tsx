"use client";

import { Server } from 'socket.io';

export default function handler(req: any, res: any) {
    if (!res.socket.server.io) {
        
        const httpServer = res.socket.server;

        const io = new Server(httpServer, {
            cors: {
                origin: 'localhost:3000'
            }
        });

        io.on('connection', (socket: any) => {
            console.log('user connected');

            socket.on('rollDice', (maxNumber: any) => {
                let randomNumber = Math.floor(Math.random() * (maxNumber - 1 + 1)) + 1
                io.emit('diceRoll', randomNumber);
            });

            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        httpServer
            .once("error", (err: any) => {
                console.error(err);
                process.exit(1);
            })
            .listen(3000, () => {
                console.log(`Server is listening on port ${3000}`);
            });
    }

    res.end();
}