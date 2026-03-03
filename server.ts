
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import { CommunityPost, AppItem } from "./types";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = process.env.PORT || 3000;

  // In-memory state (resets on server restart)
  let posts: CommunityPost[] = [];
  let customApps: AppItem[] = [];

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // WebSocket Logic
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Initial sync
    socket.emit("sync_posts", posts);
    socket.emit("sync_apps", customApps);

    // Handle new post
    socket.on("create_post", (newPost: CommunityPost) => {
      posts = [newPost, ...posts];
      io.emit("post_created", newPost);
    });

    // Handle new app
    socket.on("add_app", (newApp: AppItem) => {
      customApps = [newApp, ...customApps];
      io.emit("app_added", newApp);
    });

    // Handle delete app
    socket.on("delete_app", (appId: string) => {
      customApps = customApps.filter(app => app.id !== appId);
      io.emit("app_deleted", appId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
