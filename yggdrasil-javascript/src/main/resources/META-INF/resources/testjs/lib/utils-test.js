var expect = require("chai").expect;
var utils = require("../../js/lib/utils.js");

describe("lib/utils.js", function () {
  describe("formatUtcDate", function () {
    describe("null", function () {
      it("formats as empty", function () {
        expect(utils.formatUtcDate(null, "yyyy/mm/dd")).to.equal("");
      });
    });
    describe("''", function () {
      it("formats as empty", function () {
        expect(utils.formatUtcDate("", "yyyy/mm/dd")).to.equal("");
      });
    });
    var date = new Date(1469041073000);
    describe(date, function () {
      it("formats as yyyy/mm/dd", function () {
        var formatDate = utils.formatUtcDate(date, "yyyy/mm/dd");
        expect(formatDate).to.equal("2016/07/20");
      });

      it("formats as yyyy/mm/dd hh:mm:ss'Z'", function () {
        var formatDate = utils.formatUtcDate(date, "yyyy/mm/dd hh:MM:ss'Z'");
        expect(formatDate).to.equal("2016/07/20 06:57:53Z");
      });
    });
    var timestamp = 1469041073000;
    describe(timestamp, function () {
      it("formats as yyyy/mm/dd", function () {
        var formatDate = utils.formatUtcDate(timestamp, "yyyy/mm/dd");
        expect(formatDate).to.equal("2016/07/20");
      });

      it("formats as yyyy/mm/dd hh:mm:ss'Z'", function () {
        var formatDate = utils.formatUtcDate(timestamp, "yyyy/mm/dd hh:MM:ss'Z'");
        expect(formatDate).to.equal("2016/07/20 06:57:53Z");
      });
    });
  });

  describe("formatDate", function () {
    describe("null", function () {
      it("formats as empty", function () {
        expect(utils.formatDate(null, "yyyy/mm/dd")).to.equal("");
      });
    });
    describe("''", function () {
      it("formats as empty", function () {
        expect(utils.formatDate("", "yyyy/mm/dd")).to.equal("");
      });
    });
    var date = new Date(1469041073000);
    describe(date, function () {
      it("formats as yyyy/mm/dd", function () {
        var formatDate = utils.formatDate(date, "yyyy/mm/dd");
        expect(formatDate).to.equal("2016/07/20");
      });

      it("formats as yyyy/mm/dd hh:mm:ss'Z'", function () {
        var formatDate = utils.formatDate(date, "yyyy/mm/dd hh:MM:ss'Z'", true);
        expect(formatDate).to.equal("2016/07/20 06:57:53Z");
      });
    });
    var timestamp = 1469041073000;
    describe(timestamp, function () {
      it("formats as yyyy/mm/dd", function () {
        var formatDate = utils.formatDate(timestamp, "yyyy/mm/dd");
        expect(formatDate).to.equal("2016/07/20");
      });

      it("formats as yyyy/mm/dd hh:mm:ss'Z'", function () {
        var formatDate = utils.formatDate(timestamp, "yyyy/mm/dd hh:MM:ss'Z'", true);
        expect(formatDate).to.equal("2016/07/20 06:57:53Z");
      });
    });
  });
});