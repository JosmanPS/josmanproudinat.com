const buffer = require('buffer')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const util = require('util')

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer
}

if (!util.isArrayBuffer && util.types && util.types.isArrayBuffer) {
  util.isArrayBuffer = util.types.isArrayBuffer
}

if (!util.isArrayBufferView) {
  util.isArrayBufferView = ArrayBuffer.isView
}

const origCreateHash = crypto.createHash
crypto.createHash = function (algorithm, options) {
  return origCreateHash.call(
    this,
    algorithm === 'md4' ? 'sha256' : algorithm,
    options
  )
}

const SHIM_HEADER =
  "/* node26-compat */try{var _b=require('buffer');if(!_b.SlowBuffer)_b.SlowBuffer=_b.Buffer;}catch(e){}\n"

const targetFiles = [
  path.join(
    __dirname,
    '..',
    'node_modules',
    'next',
    'dist',
    'compiled',
    'jsonwebtoken',
    'index.js'
  ),
  path.join(
    __dirname,
    '..',
    'node_modules',
    'next',
    'dist',
    'server',
    'next-server.js'
  ),
]

for (const filePath of targetFiles) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8')
      if (!content.startsWith('/* node26-compat */')) {
        fs.writeFileSync(filePath, SHIM_HEADER + content, 'utf8')
      }
    }
  } catch (_) {
    // Ignore read-only filesystem errors at runtime
  }
}
