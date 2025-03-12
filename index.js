const express = require('express');
const morgan = require('morgan');
const app = express();

require('dotenv').config();

const Person = require('./models/person');

app.use(express.static('dist'));
app.use(express.json());

morgan.token('requestBody', (req, res) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    return JSON.stringify(req.body);
  }
  return '';
});

app.use(
  morgan(function (tokens, req, res) {
    return JSON.stringify(
      [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
        tokens.requestBody(req, res),
      ].join(' ')
    );
  })
);

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('', (req, res) => {
  res.send('<h1>hello world</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

// app.get('/info', (req, res) => {
//   const reqDate = new Date().toDateString();
//   const reqTime = new Date().toLocaleTimeString();

//   res.send(`
//     Phonebook has info for ${persons.length} people
//     ${reqDate} ${reqTime}
//     `);
// });

// // fetching single set of data
// app.get('/api/persons/:id', (req, res) => {
//   const id = req.params.id;
//   const person = persons.find((person) => person.id === id);

//   if (person) {
//     res.json(person);
//   } else {
//     res.status(404).end();
//   }
// });

// // delete
// app.delete('/api/persons/:id', (req, res) => {
//   const id = req.params.id;
//   persons = persons.filter((person) => person.id === id);

//   res.status(204).end();
// });

// // add
// app.post('/api/persons', (req, res) => {
//   const id = Math.floor(Math.random());
//   const body = req.body;

//   const existingName = persons.find((person) => person.name === body.name);

//   if (!body.name || !body.number) {
//     return res.status(400).json({
//       error: 'Name or number missing',
//     });
//   }

//   if (existingName) {
//     return res.status(400).json({
//       error: 'Name already exists',
//     });
//   }

//   const person = {
//     name: body.name,
//     number: body.number,
//     id: id,
//   };

//   persons = persons.concat(person);

//   res.json(person);
// });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
