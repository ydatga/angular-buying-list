exports.createToken = () => {
  var l = 32;

  // 生成する文字列に含める文字セット
  var c = "abcdefghijklmnopqrstuvwxyz0123456789";

  var cl = c.length;
  var r = "";
  for (var i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }
  return r;
};
