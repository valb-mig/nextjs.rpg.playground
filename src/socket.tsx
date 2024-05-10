"use client";

import { io } from "socket.io-client";
export const socket = io('ws://172.25.0.2:4000');