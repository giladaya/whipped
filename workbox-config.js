module.exports = {
  "globDirectory": "src/",
  "globPatterns": [
    "**/*.{png,mp3,jpg,css,html,js,json}"
  ],
  "swDest": "src/sw.js",
  modifyURLPrefix: {
    '__': '/whipped/'
  }
};