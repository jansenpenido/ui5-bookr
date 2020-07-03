var express = require('express');

const app = express();
const port = process.env.PORT || 8080

app.use(express.static('WebContent'));
app.use(express.static('./'));

var server = app.listen(port, function() {
	console.log("Listening on port " + port);
});