const express = require('express');
const app = express();
const port = process.env.PORT
const bodyParser = require("body-parser");
const Botly = require("botly");
const botly = new Botly({
  accessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  webHookPath: process.env.WB_PATH,
  notificationType: Botly.CONST.REGULAR,
  FB_URL: "https://graph.facebook.com/v13.0/",
});
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({
  verify: botly.getVerifySignature(process.env.APP_SECRET)
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/webhook", botly.router());

botly.on("message", (senderId, message, data) => {
  console.log(message)
});


app.get('/', (req, res) => {
  res.render('index');
});



app.listen(port || 3000, () => {
  console.log(`App listening on port ${port}`)
})