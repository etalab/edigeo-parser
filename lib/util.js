import {PassThrough} from 'node:stream'

function bufferToStream(buffer) {
  const stream = new PassThrough()
  stream.push(buffer)
  stream.push(null)
  return stream
}

export {bufferToStream}
