const { stampHash } = require('zeitstempel');
const fs = require('fs');

async function main() {
  const testHash = 'a'.repeat(64);
  console.log('Sending hash to OpenTimestamps calendars...');
  try {
    const otsBytes = await stampHash(testHash);
    fs.writeFileSync('test-proof.ots', otsBytes);
    console.log('SUCCESS! test-proof.ots created, size:', otsBytes.length, 'bytes');
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

main();