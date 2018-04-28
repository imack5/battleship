const PORT          = 8080;
const express       = require("express");
const app           = express();

app.use(express.static("."));

app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
});