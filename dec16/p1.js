const input =
  process.argv[4] == "t" ? require("./input-test") : require("./input");

function getOneLiteral(i) {
  let l = "";

  let chunk = "1";
  do {
    chunk = binary.substring(i, i + 1);
    l += binary.substring(i + 1, i + 5);
    i += 5;
  } while (chunk[0] == "1");

  return [l, i];
}

function toDecimal(decimal) {
  return parseInt(decimal, 2);
}

function toBin(number) {
  return number.toString(2);
}

const hexToBin = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  A: "1010",
  B: "1011",
  C: "1100",
  D: "1101",
  E: "1110",
  F: "1111",
};

let binary = input
  .split("")
  .map((x) => hexToBin[x])
  .join("");
binary = binary.substring(0, binary.match(/0+$/).index);

module.exports = () => {
  const packet = parsePacket(0);
  const versions = [];
  countPacket(packet, versions);

  return versions.reduce((a, c) => a + c, 0);
};

function countPacket(packet, versions) {
  if (packet.subPackets != undefined) {
    for (const subPack of packet.subPackets) {
      countPacket(subPack, versions);
    }
  }

  versions.push(toDecimal(packet.version));
}

function parsePacket(i) {
  while (i < binary.length) {
    const version = binary.substring(i, i + 3);
    i += 3;

    const packageId = binary.substring(i, i + 3);
    i += 3;

    if (toDecimal(packageId) == 4) {
      const [lit, newIndex] = getOneLiteral(i);
      const startIndex = i - 6;
      const packet = {
        version: version,
        packageId: packageId,
        start: startIndex,
        end: newIndex,
        literal: lit,
      };
      return packet;
    }

    const lengthType = binary.substring(i, i + 1);
    i += 1;

    const subpacketLengthDefinitionLength = lengthType == "0" ? 15 : 11;
    const isCountInstead = lengthType == "1";
    const subpacketLengthBinary = binary.substring(
      i,
      i + subpacketLengthDefinitionLength
    );
    i += subpacketLengthDefinitionLength;
    const subpacketLength = toDecimal(subpacketLengthBinary);
    const subPacketsEnd = i + subpacketLength;

    const subPackets = [];
    let loopCount = 0;
    while (
      (isCountInstead && loopCount < subpacketLength) ||
      (!isCountInstead && i < subPacketsEnd)
    ) {
      const packet = parsePacket(i);
      i = packet.end;
      subPackets.push(packet);
      loopCount++;
    }

    return (packet = {
      version: version,
      packageId: packageId,
      subPackets: subPackets,
      end: i,
    });
  }
}
