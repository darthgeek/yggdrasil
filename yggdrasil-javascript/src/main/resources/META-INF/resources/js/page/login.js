/**
 * Created by jason on 7/21/2016.
 */
require("../lib/common.js");
require("../../css/app.css");
var $ = require("jquery");
var log = require("../lib/logger").getLogger("page/login.js", "INFO");

function onSuccess(googleUser) {
  log.info("Logged in as " + googleUser.getBasicProfile().getName());
  var id_token = googleUser.getAuthResponse().id_token;
  var form = $("#google-signin-form");
  form.find("input[name=token]").val(id_token);
  $(".google-action-button").removeAttr("disabled");
}

function onFailure(error) {
  log.error(error);  // TODO: display this error to user
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
}

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

  $(".alert").delay(5000).slideToggle();

  $("#google-signout").click(function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      log.info("user signed out of google")
      $(".google-action-button").attr("disabled", "disabled");
    });
  });
});
