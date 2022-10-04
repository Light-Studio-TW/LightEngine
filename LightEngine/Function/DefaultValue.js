module.exports = { defaultValue }

function defaultValue (default_value, new_value) {
  if (new_value === undefined) {
    return default_value
  } else {
    let all_key = Object.keys(default_value)
    for (let run = 0; run < all_key.length; run++) {
      if (typeof default_value[all_key[run]] === 'object') {
        new_value[all_key[run]] = defaultValue(default_value[all_key[run]], new_value[all_key[run]])
      } else if (new_value[all_key[run]] === undefined) {
        new_value[all_key[run]] = default_value[all_key[run]]
      }
    }
    return new_value
  }
}