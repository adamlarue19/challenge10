const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./main/public/assets/js/index');
const db = require('./db/db.json')
// Helper method for generatiing ids
const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

app.get('/api/notes',(req, res) => res.json(db));

fs.readFile('./db/reviews.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    // Convert string into JSON object
    const parsedReviews = JSON.parse(data);

    // Add a new review
    parsedReviews.push(newReview);

    // Write updated reviews back to the file
    fs.writeFile(
      './db/reviews.json',
      JSON.stringify(parsedReviews, null, 4),
      (writeErr) =>
        writeErr
          ? console.error(writeErr)
          : console.info('Successfully updated reviews!')
    );
  }
});




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);