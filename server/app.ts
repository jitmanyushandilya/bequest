// import express from "express";
// import cors from "cors";
// import crypto from "crypto"; // Importing crypto module for hashing

// const PORT = 8080;
// const app = express();
// const database = { hash: "" }; // Storing hash instead of raw data

// app.use(cors());
// app.use(express.json());

// // Function to create hash
// const hashData = (data: string): string => {
//   return crypto.createHash('sha256').update(data).digest('hex');
// };

// // Routes

// app.get("/", (req, res) => {
//   res.json({ hash: database.hash });
// });

// app.post("/", (req, res) => {
//   const hashedData = hashData(req.body.data);
//   database.hash = hashedData;
//   res.sendStatus(200);
// });

// // Add a new route for data recovery
// app.get("/recover", (req, res) => {
//   if (database.hash !== "") {
//     // If there is a valid hash in the database, return the original data
//     res.json({ data: database.hash });
//   } else {
//     // If there is no valid data in the database, return an error message
//     res.status(404).json({ error: "Data not found" });
//   }
// });


// // Verify data route
// app.post("/verify", (req, res) => {
//   const hashedData = hashData(req.body.data);
//   if (hashedData === database.hash) {
//     res.sendStatus(200); // Data is intact
//   } else {
//     res.sendStatus(409); // Data tampered
//   }
// });

// app.listen(PORT, () => {
//   console.log("Server running on port " + PORT);
// });

import express from "express";
import cors from "cors";
import crypto from "crypto";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto"; // Import crypto functions

const PORT = 8080;
const app = express();
const database = { encryptedData: "", iv: "", key: "" };

app.use(cors());
app.use(express.json());

// Generate a random encryption key and initialization vector (IV)
const generateEncryptionKeyAndIV = () => {
  const key = randomBytes(32); // 256 bits key
  const iv = randomBytes(16); // 128 bits IV
  return { key, iv };
};

// Encrypt data
const encryptData = (data: string, key: Buffer, iv: Buffer): string => {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const encrypted = cipher.update(data, "utf8", "hex") + cipher.final("hex");
  return encrypted;
};

// Decrypt data
// Decrypt data
const decryptData = (encryptedData: string, key: Buffer, iv: Buffer): string => {
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  const decrypted = decipher.update(encryptedData, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
};


app.get("/", (req, res) => {
  res.json({ encryptedData: database.encryptedData });
});

app.post("/", (req, res) => {
  const { data } = req.body;
  const { key, iv } = generateEncryptionKeyAndIV();
  const encryptedData = encryptData(data, key, iv);
  database.encryptedData = encryptedData;
  database.iv = iv.toString("hex");
  database.key = key.toString("hex");
  res.sendStatus(200);
});

// Verify data route
app.post("/verify", (req, res) => {
  const { data } = req.body;
  const decryptedData = decryptData(database.encryptedData, Buffer.from(database.key, "hex"), Buffer.from(database.iv, "hex"));
  if (data === decryptedData) {
    res.sendStatus(200); // Data is intact
  } else {
    res.sendStatus(409); // Data tampered
  }
});

// Data recovery route
app.get("/recover", (req, res) => {
  if (database.encryptedData !== "") {
    const decryptedData = decryptData(database.encryptedData, Buffer.from(database.key, "hex"), Buffer.from(database.iv, "hex"));
    res.json({ data: decryptedData });
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

