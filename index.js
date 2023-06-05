const express = require('express');
const app = express();
const port = process.env.PORT
const bodyParser = require("body-parser");
const request = require("request");
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
  if (message.recipient.id == "123123"){ // main

  } else if (message.recipient.id == "105785155764332"){
    
  } else if (message.recipient.id == "132577573157975"){
    const options = {
      url: 'https://diffy.yacinedjenidi.repl.co/webhook',
      method: 'POST',
      json: { message },
    };
    request(options, (error, response, body) => {
      if (error) {
        console.error('Error forwarding message:', error);
      } else {
        console.log('Message forwarded successfully:', body);
      }
    });
  } else if (message.recipient.id == "100328361810049"){

  }
});


app.get('/', (req, res) => {
  res.render('index');
});



app.listen(port || 3000, () => {
  console.log(`App listening on port ${port}`)
})