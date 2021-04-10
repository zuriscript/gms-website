// Logs when the client route changes
exports.onRouteUpdate = ({ location }) => {
    window.PreviousPath = location.pathname;
  }
  
require("tailwindcss/dist/base.min.css")
require('typeface-nunito-sans')

require("prism-themes/themes/prism-atom-dark.css")
require("prismjs/plugins/command-line/prism-command-line.css")

