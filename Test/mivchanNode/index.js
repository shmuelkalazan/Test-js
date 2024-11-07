const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5001;

const users = [
  {
    id: "123456789",
    firstName: "John",
    lastName: "Doe",
    address: "1234 Elm Street",
    city: "Springfield",
    mail: "john.doe@example.com",
    phone: "+1-555-1234",
    mobile: "0547241287",
  },
  {
    id: "234567891",
    firstName: "Jane",
    lastName: "Smith",
    address: "5678 Oak Avenue",
    city: "Riverside",
    mail: "jane.smith@example.com",
    phone: "+1-555-5678",
    mobile: "0547241287",
  },
  {
    id: "34567891234",
    firstName: "Alice",
    lastName: "Johnson",
    address: "9101 Maple Road",
    city: "Greenville",
    mail: "alice.johnson@example.com",
    phone: "+1-555-9101",
    mobile: "0547241287",
  },
  {
    id: "456789123",
    firstName: "Bob",
    lastName: "Brown",
    address: "2345 Pine Street",
    city: "Lakeside",
    mail: "bob.brown@example.com",
    phone: "+1-555-2345",
    mobile: "0547241287",
  },
  {
    id: "567891234",
    firstName: "Charlie",
    lastName: "Davis",
    address: "6789 Birch Lane",
    city: "Hilltop",
    mail: "charlie.davis@example.com",
    phone: "+1-555-6789",
    mobile: "0547241287",
  },
];
app.use(cors());

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
