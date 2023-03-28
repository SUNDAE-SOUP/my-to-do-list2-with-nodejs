const express = require('express');
const app = express();
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/todo", require("./routes/todoRouter"));



app.listen(3000, () => {
    console.log(`All goods on port 3000 😎`)
});
