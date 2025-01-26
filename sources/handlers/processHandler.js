import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let expoProcess;

export async function installDependencies() {
    const repoPath = path.join(__dirname, '../repo');
    const nodeModulesPath = path.join(repoPath, 'node_modules');

    return new Promise((resolve, reject) => {
        if (!fs.existsSync(nodeModulesPath)) {
            console.log('node_modules folder is missing. Installing dependencies...');
        } else {
            console.log('node_modules folder already exists. Checking dependencies installation.');
        }

        console.log('Executing npm install...');
        exec('npm install', { cwd: repoPath }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error occured while installing dependancies : ${error}`);
                console.error(`stderr: ${stderr}`);
                reject(error);
                return;
            }

            console.log('Dependencies installed successfully.');
            console.log(`stdout: ${stdout}`);

            console.log('Checking if Expo is already running...');
            exec('lsof -ti:8081', (err, stdout, stderr) => {
                if (stdout) {
                    console.log(`A processus already use the 8081 port (PID: ${stdout.trim()}). Killing the processus...`);
                    exec(`kill -9 ${stdout.trim()}`, (killErr, killStdout, killStderr) => {
                        if (killErr) {
                            console.error('Error occured while trying to kill expo:', killStderr || killErr);
                        } else {
                            console.log('Expo processus killed successfully.');
                        }
                    });
                } else {
                    console.log('No processus found on the 8081 port.');
                }

                console.log('Starting Expo...');
                expoProcess = exec('npx expo start', { cwd: repoPath });

                expoProcess.stdout.on('data', (data) => {
                    console.log(`[Expo stdout] ${data}`);
                });

                expoProcess.stderr.on('data', (data) => {
                    console.error(`[Expo stderr] ${data}`);
                });

                expoProcess.on('close', (code) => {
                    if (code === 0) {
                        console.log('Expo launched successfully.');
                        resolve();
                    } else {
                        console.error(`Expo is been terminated with code ${code}`);
                        reject(new Error('Error while starting Expo'));
                    }
                });
            });
        });
    });
}