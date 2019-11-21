const steps = []

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  let chunk;
  // Use a loop to make sure we read all available data.
  while ((chunk = process.stdin.read()) !== null) {
    const time = Date.now()
    process.stdout.write(`recorded step at time ${time}`);
    steps.push(time)
  }
});

process.stdin.on('end', () => {
  process.stdout.write(`\n[${steps}]\n`);
});