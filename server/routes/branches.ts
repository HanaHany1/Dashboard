import { Express, Request, Response } from "express";
import { Server } from "http";

export function registerBranchRoutes(httpServer: Server, app: Express) {
  app.get("/api/branches", (req: Request, res: Response) => {
    res.json([
      { id: "branch1", name: "Nasr City" },
      { id: "branch2", name: "Heliopolis" },
      { id: "branch3", name: "Maadi" }
    ]);
  });
}
