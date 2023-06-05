const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const Botly = require("botly");
const botly = new Botly({
    accessToken: pageAccessToken,
    verifyToken: verificationToken,
    webHookPath: yourWebHookPath,
    notificationType: Botly.CONST.REGULAR,
    FB_URL: 'https://graph.facebook.com/v2.6/'
});
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({
  verify: botly.getVerifySignature(process.env.APP_SECRET)
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/webhook", botly.router());

app.get('/', (req, res) => {
  res.render('index');
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});