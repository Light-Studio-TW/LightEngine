const https = require('https');
const fs = require('fs')
const host = 'Light-Engine.icebrick01.repl.co'

module.exports = connect 

//連接
async function connect (values, func) {
  return new Promise((resolve, reject) => {
    https.get({ host: host, headers: values }, (resp)=>{
      let data = ''
      resp.on('data', (chunk) => {
        if (func !== undefined) {
          func(chunk.length)
        }
        data += chunk;
      })
      resp.on('end', () => {
        resolve(data)
      })
      
    }).on("error", (err) => {
      throw new Error('[Light Engine]: 無法連線到Light Engine的伺服器')
    })
  })
}