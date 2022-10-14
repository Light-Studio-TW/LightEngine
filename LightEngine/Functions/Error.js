module.exports = { error }

function error (type, content) {
  if (type === 'MP') {
    throw new Error(`[Light Engine] 缺少套件 ${content[0]} 請使用 ${content[1]} 來安裝`)
  } else if (type === 'MV') {
    throw new Error(`[Light Engine] 缺少必要參數 (${content})`)
  } else if (type === 'VMBS') {
    throw new Error(`[Light Engine] 參數 (${content}) 必須為字串`)
  } else if (type === 'VMBN') {
    throw new Error(`[Light Engine] 參數 (${content}) 必須為數字`)
  } else if (type === 'VMBB') {
    throw new Error(`[Light Engine] 參數 (${content}) 必須為布林值`)
  } else if (type === 'VMBA') {
    throw new Error(`[Light Engine] 參數 (${content}) 必須為陣列`)
  } else if (type === 'VMBO') {
    throw new Error(`[Light Engine] 參數 (${content}) 必須為物件`)
  } else if (type === 'VMBF') {
    throw new Error(`[Light Engine] 參數 (${content}) 必須為函數`)
  } else if (type === 'VMB') {
    throw new Error(`[Light Engine] 參數 (${content[0]}) 只能為 ${content[1]}`)
  } else if (type === 'OMV') {
    throw new Error(`[Light Engine] 物件 ${content[0]} 缺少必要參數 {${content[1]}}`)
  } else if (type === 'OVMBN') {
    throw new Error(`[Light Engine] 物件 ${content[0]} 的參數 {${content[1]}} 必須為數字`)
  } else if (type === 'OVMB') {
    throw new Error(`[Light Engine] 物件 ${content[0]} 的參數 {${content[1]}} 只能為 ${content[2]}`)
  } else if (type === 'GNF') {
    throw new Error(`[Light Engine] 找不到遊戲 ${content}`)
  } else if (type === 'DNF') {
    throw new Error(`[Light Engine] 找不到設備 ${content}`)
  } else if (type === 'TNF') {
    throw new Error(`[Light Engine] 找不到材質 ${content}`)
  } else if (type === 'ANF') {
    throw new Error(`[Light Engine] 找不到音頻 ${content}`)
  } else if (type === 'ONF') {
    throw new Error(`[Light Engine] 找不到物件 ${content}`)
  } else if (type === 'DID') {
    throw new Error(`[Light Engine] 重複ID (${content})`)
  }
}