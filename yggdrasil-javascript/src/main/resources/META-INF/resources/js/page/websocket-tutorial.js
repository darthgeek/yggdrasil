require("../lib/common.js");
var $ = require("jquery");
var log = require("../lib/logger").getLogger("page/websocket-tutorial.js", "INFO");

var webstomp = require("webstomp-client");
var client = webstomp.client("ws://localhost:8080/endpoint/websocket");

$(function() {
  $("#sendButton").click(function() {
    client.send("/app/hello", JSON.stringify({ "text": $("#sendText").val()}));
  });

  client.connect("sockuser", "sockpass", function() {
    log.info("connected");
    client.subscribe("/topic/helloResponse", function(message) {
      log.info("received response:" + message);
      $("#responses").append("<div>" + message.body + "</div>");
    });
    client.subscribe("/topic/messages", function(message) {
      log.info("received message:" + message);
      $("#messages").append("<div>" + message.body + "</div>");
    });
  }, function(err) {
    log.error("error connecting");
    log.error(err);
  });
});

//
// var sock = new SockJS("http://localhost:8080/socket/hello");
// sock.co
// sock.onopen = function () {
//   log.info("open");
//   sock.send({text: "test"});
// };
// sock.onmessage = function (e) {
//   log.info("message", e.data);
// };
// sock.onclose = function () {
//   log.info("close");
// };
