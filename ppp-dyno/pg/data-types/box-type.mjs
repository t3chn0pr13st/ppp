import { DataTypeOIDs } from '../definitions.mjs';

const BOX_PATTERN1 =
  /^\( *\( *(-?\d+\.?\d*) *, *(-?\d+\.?\d*) *\) *, *\( *(-?\d+\.?\d*) *, *(-?\d+\.?\d*) *\) *\)$/;
const BOX_PATTERN2 =
  /^\( *(-?\d+\.?\d*) *, *(-?\d+\.?\d*) *\) *, *\( *(-?\d+\.?\d*) *, *(-?\d+\.?\d*) *\)$/;
const BOX_PATTERN3 =
  /^(-?\d+\.?\d*) *, *(-?\d+\.?\d*) *, *(-?\d+\.?\d*) *, *(-?\d+\.?\d*)$/;

export const BoxType = {
  name: 'box',
  oid: DataTypeOIDs.box,
  jsType: 'object',
  arraySeparator: ';',
  parseBinary(v) {
    return {
      x1: v.readDoubleBE(0),
      y1: v.readDoubleBE(8),
      x2: v.readDoubleBE(16),
      y2: v.readDoubleBE(24)
    };
  },
  encodeBinary(buf, v) {
    buf.writeDoubleBE(v.x1);
    buf.writeDoubleBE(v.y1);
    buf.writeDoubleBE(v.x2);
    buf.writeDoubleBE(v.y2);
  },
  parseText(v) {
    const m =
      v.match(BOX_PATTERN1) || v.match(BOX_PATTERN2) || v.match(BOX_PATTERN3);

    if (!m) return undefined;

    return {
      x1: parseFloat(m[1]),
      y1: parseFloat(m[2]),
      x2: parseFloat(m[3]),
      y2: parseFloat(m[4])
    };
  },
  isType(v) {
    return (
      typeof v === 'object' &&
      typeof v.x1 === 'number' &&
      typeof v.y1 === 'number' &&
      typeof v.x2 === 'number' &&
      typeof v.y2 === 'number'
    );
  }
};
export const ArrayBoxType = {
  ...BoxType,
  name: '_box',
  oid: DataTypeOIDs._box,
  elementsOID: DataTypeOIDs.box
};
