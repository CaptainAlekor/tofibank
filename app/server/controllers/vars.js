let vars = {

}

module.exports = {
  getVar: function(key) {
    return vars[key];
  },
  setVar: function(key, value) {
    vars[key] = value;
  }
};