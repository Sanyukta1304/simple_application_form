const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/saveEmployee", (req, res) => {

    const newEmployee = req.body;

    fs.readFile("employees.json", "utf8", (err, data) => {

        let employees = [];

        if (!err && data.length > 0) {
            employees = JSON.parse(data);
        }

        employees.push(newEmployee);

        fs.writeFile("employees.json", JSON.stringify(employees, null, 2), err => {

            if (err) {
                return res.status(500).send("Error saving data");
            }

            res.json({message:"Data saved successfully"});
        });

    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});