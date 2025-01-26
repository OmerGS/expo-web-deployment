import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const REPO_URL = process.env.REPO_URL;
const LOCAL_DIR = path.resolve('./repo');
const git = simpleGit();

export async function updateRepo() {
    try {
        if (!fs.existsSync(LOCAL_DIR)) {
            console.log('Cloning the repository...');
            await git.clone(REPO_URL, LOCAL_DIR);
            console.log('Repository cloned successfully.');
        } else {
            console.log('The repository already exists.');
            await git.cwd(LOCAL_DIR);

            console.log('Updating the repository');
            await git.fetch();
            console.log('Fetching newest changes from the remote repository...');

            await git.reset(['--hard', process.env.BRANCH_NAME]);
            console.log(`Repository updated successfully with the latest version of ${process.env.BRANCH_NAME}.`);
        }
    } catch (error) {
        console.error('Error occured while cloning or fetching the repository :', error);
        throw new Error('Error occured with Git.');
    }
}