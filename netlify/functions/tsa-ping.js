exports.handler = async () => {
  try {
    const r = await fetch('https://freetsa.org/tsr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/timestamp-query' },
      body: Buffer.from('00', 'hex'),
      signal: AbortSignal.timeout(10000),
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ tsa_reachable: true, status: r.status }),
    };
  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify({ tsa_reachable: false, error: e.message }),
    };
  }
};