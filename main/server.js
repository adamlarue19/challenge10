const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
// Helper method for generatiing ids
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes',(req, res) => res.json(db));


// POST request to add a note
app.post('/api/notes', (req, res) => {
  // send message to user
  console.info('request recieved');

  const { title, text} = req.body;

  if (title && text) {
    // var for the object that needs to be saved\
    const newNote = {
      title,
      text,
      note_id: uuid()
    };

    // get existing notes
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);
  
      // Add a new note
      parsedNotes.push(newNote);
  
      // Write updated reviews back to the file
      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes, null, 4),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
      );
  //       fs.appendFile(
  //         './db/db.json',
  //        JSON.stringify(parsedNotes), (err) => {
  //         if (err) {
  //           console.error(err);
  //         }else{
  //           console.log("\nFile Contents of file after append:",
  //           fs.readFileSync('./db/db.json', "utf8"));
  //         }
  //       });
    };
  });
  const response = {
    status: 'success',
    body: newNote,
  };

  console.log(response);
  res.status(201).json(response);
} else {
  res.status(500).json('Error in posting Note');
}
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
)