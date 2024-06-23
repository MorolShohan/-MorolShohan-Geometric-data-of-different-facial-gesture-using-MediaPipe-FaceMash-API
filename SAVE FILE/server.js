const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.post('/saveLandmarkData', (req, res) => {
  const landmarks = req.body.landmarks;
  const sql = 'INSERT INTO landmarks (x, y, z) VALUES ?';
  const values = landmarks.map(landmark => [landmark.x, landmark.y, landmark.z]);

  db.query(sql, [values], (err, result) => {
    if (err) throw err;
    res.send('Landmark data saved');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
