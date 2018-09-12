function set (key, value) {
  let obj = {}
  obj[key] = value
  localStorage.setItem(key, JSON.stringify(obj))
}

function get (key) {
  if (localStorage.getItem(key) === undefined || localStorage.getItem(key) === null) {
    return false
  }

  return (JSON.parse(localStorage.getItem(key)))[key]
}

function remove (keys) {
  keys.map(item => {
    localStorage.removeItem(item)
  })
}

function exist (key) {
  if (localStorage.getItem(key) === undefined || localStorage.getItem(key) === null) {
    return false
  }

  return true
}

export default {
  set,
  get,
  remove,
  exist
}
