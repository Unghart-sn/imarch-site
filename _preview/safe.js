(function () {
  "use strict";
  var MAGIC = new Uint8Array([0x49, 0x4d, 0x53, 0x31]);
  var SALT_BYTES = 16;
  var IV_BYTES = 12;
  var PBKDF2_ITERATIONS = 600000;
  var PBKDF2_HASH = "SHA-256";
  var KEY_BITS = 256;

  function ensureCrypto() {
    if (!window.crypto || !window.crypto.subtle) {
      throw new Error("WebCrypto not available (need HTTPS or localhost)");
    }
  }
  function utf8Encode(s) { return new TextEncoder().encode(s); }
  function utf8Decode(b) { return new TextDecoder().decode(b); }
  function bytesToBase64(bytes) {
    var bin = "";
    var chunkSize = 0x8000;
    for (var i = 0; i < bytes.length; i += chunkSize) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
    }
    return btoa(bin);
  }
  function base64ToBytes(b64) {
    var bin = atob(b64);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function concatBytes() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) total += arguments[i].length;
    var out = new Uint8Array(total);
    var offset = 0;
    for (var j = 0; j < arguments.length; j++) {
      out.set(arguments[j], offset);
      offset += arguments[j].length;
    }
    return out;
  }
  async function deriveKey(password, salt) {
    ensureCrypto();
    var km = await crypto.subtle.importKey(
      "raw", utf8Encode(password), { name: "PBKDF2" }, false, ["deriveBits"]
    );
    var bits = await crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: salt, iterations: PBKDF2_ITERATIONS, hash: PBKDF2_HASH },
      km, KEY_BITS
    );
    return new Uint8Array(bits);
  }
  async function importAesKey(rawKey) {
    return crypto.subtle.importKey("raw", rawKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
  }
  async function encryptPackage(name, dataBytes, password) {
    ensureCrypto();
    var salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
    var iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
    var rawKey = await deriveKey(password, salt);
    var aesKey = await importAesKey(rawKey);
    var payload = JSON.stringify({ name: name, data: bytesToBase64(dataBytes) });
    var ciphertext = new Uint8Array(
      await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, aesKey, utf8Encode(payload))
    );
    return concatBytes(MAGIC, salt, iv, ciphertext);
  }
  async function decryptPackage(blob, password) {
    ensureCrypto();
    if (blob.length < MAGIC.length + SALT_BYTES + IV_BYTES + 16) {
      throw new Error("Blob too short");
    }
    for (var i = 0; i < MAGIC.length; i++) {
      if (blob[i] !== MAGIC[i]) throw new Error("Bad magic (not an IMARCH safe blob)");
    }
    var salt = blob.slice(MAGIC.length, MAGIC.length + SALT_BYTES);
    var iv = blob.slice(MAGIC.length + SALT_BYTES, MAGIC.length + SALT_BYTES + IV_BYTES);
    var ciphertext = blob.slice(MAGIC.length + SALT_BYTES + IV_BYTES);
    var rawKey = await deriveKey(password, salt);
    var aesKey = await importAesKey(rawKey);
    var plaintext;
    try {
      plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, aesKey, ciphertext);
    } catch (e) {
      throw new Error("Decryption failed - wrong password or corrupted blob");
    }
    var parsed = JSON.parse(utf8Decode(new Uint8Array(plaintext)));
    return { name: parsed.name, data: base64ToBytes(parsed.data) };
  }
  async function encryptFile(file, password) {
    var buf = new Uint8Array(await file.arrayBuffer());
    return encryptPackage(file.name, buf, password);
  }
  window.imarchSafe = {
    encryptPackage: encryptPackage,
    decryptPackage: decryptPackage,
    encryptFile: encryptFile,
    bytesToBase64: bytesToBase64,
    base64ToBytes: base64ToBytes,
    MAGIC_LEN: MAGIC.length,
    SALT_BYTES: SALT_BYTES,
    IV_BYTES: IV_BYTES,
    PBKDF2_ITERATIONS: PBKDF2_ITERATIONS
  };
})();