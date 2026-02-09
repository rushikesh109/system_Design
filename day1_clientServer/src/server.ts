import express from "express";
import type { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET all users
app.get("/users", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

// GET user by id
app.get("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.json({ success: true, data: user });
});

// POST create user
app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body as Partial<User>;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "Name and email are required",
    });
  }

  const newUser: User = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({ success: true, data: newUser });
});

// PUT update user
app.put("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  users[index] = {
    ...users[index],
    ...req.body,
  };

  res.json({ success: true, data: users[index] });
});

// DELETE user
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  users.splice(index, 1);

  users = users.map((user, index) => ({
    ...user,
    id: index + 1,
  }));

  res.json({ success: true, message: "User deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
