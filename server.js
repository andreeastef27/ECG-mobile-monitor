const express = require('express');
const app = express();
const port = 3000; // Choose a port number

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '192.168.1.76', // Replace with your MySQL server host
  user: 'root', // Replace with your MySQL username
  password: 'Andredvd2.', // Replace with your MySQL password
  database: 'ecg' // Replace with your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define an endpoint for fetching patient data
app.get('/ecg/patients', (req, res) => {
    const query = 'SELECT * FROM patients';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      res.json(results);
    });
  });

  app.get('/ecg/doctors', (req, res) => {
    const query = 'SELECT * FROM doctors';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      res.json(results);
    });
  });

  app.post('/ecg/doctors', (req, res) => {
    console.log('Received a request to create a doctor:', req.body);
    const { name, email, password } = req.body;
  
    const query = `INSERT INTO doctors (doctor_name, password, email) VALUES (?, ?, ?)`;
    const values = [name, password, email];
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error("Error creating doctor:", err);
        return res.status(500).json({ error: "Error creating doctor. Please try again." });
      }
  
      console.log("Doctor created successfully:", results);
  
      return res.json({ message: "Doctor created successfully!" });
    });
  });

  app.post('/ecg/login', (req, res) => {
    console.log('Received a login request:', req.body);
    const { email, password } = req.body;
  
    const query = 'SELECT * FROM doctors WHERE email = ? AND password = ?';
    const values = [email, password];
  
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const doctor = results[0];
      return res.json({ success: true, doctor });
    });
  });
  
  app.get('/ecg/recordings', (req, res) => {
    const query = 'SELECT * FROM recordings';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      res.json(results);
    });

    });
    app.post('/ecg/newpatient', (req, res) => {
      console.log('Received a request to create a new patient:', req.body);
      const { name, birth_date, sex, age } = req.body;
    
      const query = `INSERT INTO patients (patient_name, birth_date, sex, age) VALUES (?, ?, ?, ?)`;
      const values = [name, birth_date, sex, age];
    
      connection.query(query, values, (err, results) => {
        if (err) {
          console.error("Error creating patient:", err);
          return res.status(500).json({ error: "Error creating patient. Please try again." });
        }
    
        console.log("Patient created successfully:", results);
    
        return res.json({ message: "Patient created successfully!" });
      });
  });
  
  
  
  
