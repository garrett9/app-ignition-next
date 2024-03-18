// Requirements...
import * as childProcess from 'child_process';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

const { execSync } = childProcess;

/**
 * Creates a path to an executable in the node_modules/.bin directory. Each
 * path segment is joined with the appropriate platform-specific separator as
 * a delimiter.
 *
 * @param {string} cmd The name of the executable.
 * @returns {string} The path to the executable.
 */
function getBinFile(cmd) {
  return path.join('node_modules', '.bin', cmd);
}

const host = process.env.NEXT_HOST || 'localhost';
const port = process.env.NEXT_PORT || 3000;

const command = [`${getBinFile('next')} dev`];
command.push(`-H ${host}`);
command.push(`-p ${port}`);

if (process.env.NEXT_HOST) {
  command.push(`-H ${process.env.NEXT_HOST}`);
}

const url = process.env.NEXT_PUBLIC_FRONTEND_URL || `http://${host}:${port}`;

// eslint-disable-next-line no-console
console.info(`\x1b[32m[AppIgnition] Your application will be hosted at ${url}`);
// eslint-disable-next-line no-console
console.info(
  '\x1b[32m[AppIgnition] Best of luck! Go build something amazing!\n',
);

execSync(command.join(' '), {
  stdio: [0, 1, 2],
});
