/**
 * Created by jason on 7/21/2016.
 */
require("../lib/common.js");
require("../../css/app.css");
var $ = require("jquery");
var log = require("../lib/logger").getLogger("page/login.js", "INFO");
var stringify = require("json-stringify");
require("admin-lte/plugins/iCheck/icheck.js");
require("admin-lte/plugins/iCheck/square/blue.css");

/*global gapi */

/**
 * Page specific functionality.
 * @constructor
 */
function Page() {
  var _this = this;
  $(function () {
    _this.init();
  });
}

/**
 * Initializes the page after DOM ready.
 */
Page.prototype.init = function () {
  $("input").iCheck({
    checkboxClass: "icheckbox_square-blue",
    radioClass: "iradio_square-blue",
    increaseArea: "20%"
  });

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
  $("#google-signout").click(this.signOutGoogle);
};

/**
 * Callback for Google signin widget to initialize the button once platform.js has finished loading.
 */
Page.prototype.initGoogleSignin = function () {
  window.gapi.signin2.render("google-signin-button", {
    "scope": "profile email",
    "width": 240,
    "height": 34,
    "longtitle": true,
    "theme": "light",
    "onsuccess": this.onGoogleSigninSuccess,
    "onfailure": this.onGoogleSigninFailure
  });
};

/**
 * Signs the user out of Google.
 */
Page.prototype.signOutGoogle = function () {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    log.info("user signed out of Google");
    $(".google-signout-row").hide();
    $(".google-signin-row").show();
  });
};

/**
 * Callback for Google sign-in widget to indicate the user has been successfully authorized.
 * @param googleUser Google account information
 */
Page.prototype.onGoogleSigninSuccess = function (googleUser) {
  log.info("Logged in as " + googleUser.getBasicProfile().getName());
  var idToken = googleUser.getAuthResponse().id_token;
  var form = $("#google-signin-form");
  form.find("input[name=token]").val(idToken);
  $(".google-signout-row").show();
  $(".google-signin-row").hide();
};

/**
 * Callback for Google sign-in widget to indicate the user was not successfully authenticated.
 * @param error error object from Google's Javascript API
 */
Page.prototype.onGoogleSigninFailure = function (error) {
  log.error("error authenticating with Google: " + stringify(error));
  var panel = $("#external-login-error");
  panel.find("span").html("Google responded with: " + error.reason);
  panel.slideDown("fast", function () {
    panel.delay(5000).slideUp();
  });
};

window.page = new Page();
window.gapi_onload = function() { window.page.initGoogleSignin(); };
