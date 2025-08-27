// Simple playground file for Stage 2 exercises
console.log('Stage 2: Command-Line Interface (CLI) Development');

// Example CLI code structure
function parseArguments(args: string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const value = args[i + 1];
      if (value && !value.startsWith('--')) {
        result[key] = value;
        i++; // Skip the next argument as it's the value
      } else {
        result[key] = 'true'; // Flag without value
      }
    }
  }
  return result;
}

console.log('Parsed arguments:', parseArguments(process.argv.slice(2)));
