var crypto = require('crypto')
var storage = require('@google-cloud/storage')
var parallel = require('run-parallel')

function staticValue (value) {
  return function (req, file, cb) {
    cb(null, value)
  }
}

var defaultAcl = staticValue('private')
var defaultMetadata = staticValue(null)

function defaultFilepath (req, file, cb) {
  crypto.randomBytes(16, function (err, raw) {
    cb(err, err ? undefined : raw.toString('hex'))
  })
}

function getPublicUrl (bucket, filename) {
  return 'https://storage.googleapis.com/' + bucket + '/' + filename
}

function collect (storage, req, file, cb) {
  parallel([
    storage.bucket.bind(storage, req, file),
    storage.acl.bind(storage, req, file),
    storage.projectId.bind(storage, req, file),
    storage.keyFilename.bind(storage, req, file),
    storage.filepath.bind(storage, req, file),
    storage.metadata.bind(storage, req, file)
  ], function (err, values) {
    if (err) return cb(err)

    if (err) return cb(err)

    cb.call(storage, null, {
      bucket: values[0],
      acl: values[1],
      projectId: values[2],
      keyFilename: values[3],
      filepath: values[4],
      metadata: values[5]
    })
  })
}

// TODO: allow for metadata
function GoogleCloudStorage (opts) {
  switch (typeof opts.bucket) {
    case 'function': this.bucket = opts.bucket; break
    case 'string': this.bucket = staticValue(opts.bucket); break
    case 'undefined': throw new Error('Bucket is required')
    default: throw new TypeError('Expected opts.bucket to be undefined, string or function')
  }

  switch (typeof opts.acl) {
    case 'function': this.acl = opts.acl; break
    case 'string': this.acl = staticValue(opts.acl); break
    case 'undefined': this.acl = defaultAcl; break
    default: throw new TypeError('Expected opts.acl to be undefined, string or function')
  }

  switch (typeof opts.projectId) {
    case 'function': this.projectId = opts.projectId; break
    case 'string': this.projectId = staticValue(opts.projectId); break
    default: throw new TypeError('Expected opts.projectId to be string or function')
  }

  switch (typeof opts.keyFilename) {
    case 'function': this.keyFilename = opts.keyFilename; break
    case 'string': this.keyFilename = staticValue(opts.keyFilename); break
    default: throw new TypeError('Expected opts.keyFilename to be string or function')
  }

  switch (typeof opts.filepath) {
    case 'function': this.filepath = opts.filepath; break
    case 'string': this.filepath = staticValue(opts.filepath); break
    case 'undefined': this.filepath = defaultFilepath; break
    default: throw new TypeError('Expected opts.filepath to be undefined, string or function')
  }

  switch (typeof opts.metadata) {
    case 'function': this.metadata = opts.metadata; break
    case 'undefined': this.metadata = defaultMetadata; break
    default: throw new TypeError('Expected opts.metadata to be undefined or function')
  }
}

GoogleCloudStorage.prototype._handleFile = function (req, file, cb) {
  collect(this, req, file, function (err, opts) {
    if (err) return cb(err)

    var params = {
      projectId: opts.projectId,
      keyFilename: opts.keyFilename
    }

    var gcs = storage(params)

    var bucket = gcs.bucket(opts.bucket)

    var bucketFile = bucket.file(opts.filepath)

    var bucketStream = bucketFile.createWriteStream({ metadata: opts.metadata })

    file.stream.pipe(bucketStream)

    bucketStream.on('error', (err) => {
      file.cloudStorageError = err
      return cb(err)
    })

    bucketStream.on('finish', () => {
      file.cloudStorageObject = file.originalname
      file.url = getPublicUrl(opts.bucket, opts.filepath)
      return cb(null, file)
    })
  })
}

GoogleCloudStorage.prototype._removeFile = function (req, file, cb) {
  collect(this, req, file, function (err, opts) {
    if (err) return cb(err)

    var params = {
      projectId: opts.projectId,
      keyFilename: opts.keyFilename
    }

    var gcs = storage(params)

    var bucket = gcs.bucket(opts.bucket)

    var bucketFile = bucket.file(opts.filepath)

    bucketFile.delete(cb)
  })
}

module.exports = function (opts) {
  return new GoogleCloudStorage(opts)
}
