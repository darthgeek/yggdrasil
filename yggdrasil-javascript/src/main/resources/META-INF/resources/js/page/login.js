/**
 * Created by jason on 7/21/2016.
 */
require("../lib/common.js");
var log = require("../lib/logger").getLogger("page/login.js");

$(function () {
  $('input[type="username"]').focus();

  $('input[type="username"],input[type="password"]').keyup(function () {
    if ($('input[type="username"]').val().length > 0
        && $('input[type="password"').val().length > 0) {
      $('input[type="submit"]').removeAttr('disabled');
    } else {
      $('input[type="submit"]').attr('disabled', 'disabled');
    }
  });

  $('.alert').delay(5000).slideToggle();
});