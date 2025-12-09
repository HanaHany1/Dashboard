import express from "express";
import cors from "cors";
import router from "./routes"; // ← ده كده صح

const app = express();

app.use(cors());
app.use(express.json());

// use routes
app.use("/api", router);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
