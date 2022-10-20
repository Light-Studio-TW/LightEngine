#!/usr/bin/env node
const fs = require('fs')
var exec = require('child_process').exec

console.log('[Light Engine]: 正在加載Light Engine的CLI')

fs.writeFileSync('/usr/local/bin/le', `#!/usr/bin/env node
require('${__dirname}/menu.js')(process)
`)
exec(`chmod +x /usr/local/bin/le`)