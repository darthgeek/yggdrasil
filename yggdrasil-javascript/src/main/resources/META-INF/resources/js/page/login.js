/**
 * Created by jason on 7/21/2016.
 */
require("../lib/common.js");
require("../../css/app.css");
var $ = require("jquery");
var log = require("../lib/logger").getLogger("page/login.js", "INFO");
var stringify = require("json-stringify");

function onSuccess(googleUser) {
  log.info("Logged in as " + googleUser.getBasicProfile().getName());
  var idToken = googleUser.getAuthResponse().id_token;
  var form = $("#google-signin-form");
  form.find("input[name=token]").val(idToken);
  $(".google-action-button").removeAttr("disabled");
}

function onFailure(error) {
  log.error("error authenticating with Google: " + stringify(error));
  var panel = $("#external-login-error");
  panel.html("<p>Google responded with: " + error.reason + "</p>");
  panel.slideDown("fast", function() {
    panel.delay(5000).slideUp();
  });
}

window.gapi_onload = function() {
  window.gapi.signin2.render("google-signin", {
    "scope": "profile email",
    "width": 240,
    "height": 50,
    "longtitle": false,
    "theme": "light",
    "onsuccess": onSuccess,
    "onfailure": onFailure
  });
};

$(function () {
  $("input[type='username']").focus();

  $("input[type='username'],input[type='password']").keyup(function () {
    if ($("input[type='username']").val().length > 0
        && $("input[type='password'").val().length > 0) {
      $("#app-login").removeAttr("disabled");
    } else {
      $("#app-login").attr("disabled", "disabled");
    }
  });

  $(".alert:visible").delay(5000).slideUp();

  $("#google-signout").click(function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      log.info("user signed out of google");
      $(".google-action-button").attr("disabled", "disabled");
    });
  });
});
