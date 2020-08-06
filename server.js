const express = require("express");
var app = express();
const nbx = require("noblox.js");
var port = process.env.PORT;

app.get("/", function (req, res) {
  res.send("Usage Example: https://shout-proxy.glitch.me/shout?groupId=(Your Group ID) or https://shout-proxy.glitch.me/members?groupId=(Your Group ID)")
});

app.get("/shout", function (req, res) {
  var groupId = req.query.groupId;
  nbx
    .getShout(groupId)
    .catch(function (error) {
      res.send(
        "You do not have permissions to view the shout for the group or the group you entered is invalid."
      );
    })
    .then((shout) => {
      res.send(shout);
    });
});

app.get("/members", function (req, res) {
  var groupId = req.query.groupId;
  nbx
    .getGroup(groupId)
    .catch(function (error) {
      res.send(
        "You do not have permissions to view the members for the group or the group you entered is invalid."
      );
    })
    .then((groupInfo) => {
      res.send(groupInfo.memberCount.toString());
    });
});

var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
