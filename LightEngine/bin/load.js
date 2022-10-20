#!/usr/bin/env node
const fs = require('fs')
var exec = require('child_process').exec

const { getBinPath, getContentPath } = require('./getPath')

console.log('[Light Engine]: 正在加載Light Engine的CLI')

async function load () {
  let contentPath = await getContentPath()
  fs.writeFileSync(await getBinPath(), `#!/usr/bin/env node
  require('${contentPath}/index')
  `)
  exec(`chmod +xa ${await getBinPath()}`)
  let allFiles = getAllFiles(`${__dirname}/content`, undefined, '', [])
  try {
    fs.mkdirSync(contentPath)
  } catch (error) {}
  for (let run = 0; run < allFiles.length; run++) {
    if (allFiles[run].includes(' [FOLDER]')) {
      try {
        fs.mkdirSync(`${contentPath}/${allFiles[run].replaceAll(' [FOLDER]', '')}`)
      } catch (error) {}
    } else {
      fs.writeFileSync(`${contentPath}/${allFiles[run]}`, fs.readFileSync(`${__dirname}/content/${allFiles[run]}`))
    }
  }
  fs.writeFileSync(`${contentPath}/path.txt`, contentPath)
}
load()

//fs.copyFileSync(`${__dirname}/content`, '/usr/lib/LightEngine')
//exec(`chmod +x /usr/local/bin/le`)

//取得所有的檔案路徑
function getAllFiles (path, folder, nowFolder, files) {
  let filesInFolder = fs.readdirSync(path)
  for (let run = 0; run < filesInFolder.length; run++) {
    if (fs.lstatSync(`${path}/${filesInFolder[run]}`).isDirectory()) {
      if (nowFolder === '') {
        files.push(`${filesInFolder[run]} [FOLDER]`)
      } else {
        files.push(`${nowFolder}/${filesInFolder[run]} [FOLDER]`)
      }
      if (nowFolder === '') {
        files = getAllFiles (`${path}/${filesInFolder[run]}`, filesInFolder[run], filesInFolder[run], files)
      } else {
        files = getAllFiles (`${path}/${filesInFolder[run]}`, filesInFolder[run], `${folder}/${filesInFolder[run]}`, files)
      }
    } else {
      if (nowFolder === '') {
        files.push(`${filesInFolder[run]}`)
      } else {
        files.push(`${nowFolder}/${filesInFolder[run]}`) 
      }
    }
  }
  return files
}