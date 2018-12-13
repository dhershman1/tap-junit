const fs = require('fs')
const path = require('path')

function mkDirs (str, cb) {
  const p = path.resolve(str)

  fs.mkdir(p, err => {
    if (!err) {
      return cb(null, p)
    }

    if (err.code === 'ENOENT') {
      if (path.dirname(p) === p) {
        return cb(err)
      }

      mkDirs(path.dirname(p), (e, made) => {
        if (e) {
          return cb(e, made)
        }

        return mkDirs(p, cb)
      })
    }
  })
}

function write (str, fileName, content) {
  return new Promise((resolve, reject) => {
    mkDirs(str, (err, data) => {
      if (err) {
        reject(err)
      } else {
        fs.writeFile(path.join(data, fileName), content, writeErr => {
          if (writeErr) {
            return reject(writeErr)
          }

          return resolve()
        })
      }
    })
  })
}

module.exports = write
