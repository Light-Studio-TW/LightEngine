const si = require('systeminformation');

module.exports = { getBinPath, getContentPath }

async function getBinPath () {
  let os = (await si.osInfo()).codename
  if (os.includes('macOS') || os.includes('linux')) {
    return '/usr/local/bin/le' 
  }
}

async function getContentPath () {
  let os = (await si.osInfo()).codename
  let path = __dirname.split('/')
  if (os.includes('macOS')) {
    return `/Users/${path[2]}/Documents/LightEngine`
  }
}