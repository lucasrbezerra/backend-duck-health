const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const PORT = 3333;

require('./database');

const app = express();

app.use(express.json());
app.use(cors({origin: `http://localhost:3000`}));
app.use(routes);

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});

