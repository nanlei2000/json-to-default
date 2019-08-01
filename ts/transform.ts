type Default = string | number | boolean | null

function getDefault(value: Default): Default {
  if (value === null) {
    return null
  }
  if (typeof value === 'string') {
    return ''
  }
  if (typeof value === 'number') {
    return 0
  }
  if (typeof value === 'boolean') {
    return false
  }
  return '错误'
}

function isPlainObject(obj: unknown): obj is object {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function jsonToDefault(json: any): string {
  function loop(json: any): any {
    if (Array.isArray(json)) {
      if (json.length) {
        return [loop(json[0])]
      } else {
        return []
      }
    }
    if (isPlainObject(json)) {
      return Object.keys(json).reduce((prev, key) => {
        return {
          ...prev,
          [key]: loop(json[key]),
        }
      }, {})
    }
    return getDefault(json)
  }
  return JSON.stringify(loop(json), null, 2)
}
document.getElementById('src')!.addEventListener('input', function(e) {
  let value = (e.target.value + '').trim()
  if (!value) {
    document.getElementById('output')!.value = ''
    return
  }
  try {
    document.getElementById('output')!.value = jsonToDefault(JSON.parse(value))
  } catch (error) {
    document.getElementById('output')!.value = error
  }
})
