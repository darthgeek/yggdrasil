module.exports = function(ms) {
  if (ms > 999) {
    return (ms / 1000).toFixed(2) + "s";
  } else {
    return ms + "ms";
  }
};