import { BufferReader } from '../protocol/buffer-reader.mjs';

export function decodeBinaryArray(buf, decoder, options) {
  if (!buf.length) return null;

  const io = new BufferReader(buf);
  const ndims = io.readInt32BE();

  io.readInt32BE(); // hasNulls
  io.readInt32BE(); // element oid

  if (ndims === 0) return [];

  const dims = [];
  const readDim = (level) => {
    const elemCount = dims[level];
    const target = new Array(elemCount);

    for (let i = 0; i < elemCount; i++) {
      if (level < dims.length - 1) {
        target[i] = readDim(level + 1);
        continue;
      }

      const len = io.readInt32BE();

      if (len === -1) target[i] = null;
      else target[i] = decoder(io.readBuffer(len), options);
    }

    return target;
  };

  for (let d = 0; d < ndims; d++) {
    dims[d] = io.readInt32BE();
    io.readInt32BE(); // LBound
  }

  return readDim(0);
}
