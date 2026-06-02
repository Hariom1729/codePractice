require('dotenv').config({ path: require('path').join(__dirname, '.env') });
async function test() {
  const sandboxUrl = process.env.AWS_EXECUTION_URL;
  const apiKey = process.env.AWS_API_KEY;
  const code = `
console.log("ARGS WERE: " + process.argv.slice(2).join(', '));
`;
  const response = await fetch(sandboxUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey,
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ language: 'javascript', code, args: ['hello', 'world'] }),
  });
  console.log(await response.json());
}
test();
