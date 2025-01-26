import { updateRepo } from './gitHandler.js';
import { installDependencies } from './processHandler.js';

export async function pipeline(req, res) {
    try {
        console.log("Updating the repository and installing dependencies...");

        await updateRepo();
        console.log('Repository updtaed successfully.');

        await installDependencies();
        console.log('Dependencies installed successfully and Expo started succesfully.');

        res.status(200).send({
            message: 'Repository updated, dependencies installed and Expo launched successfully',
        });
    } catch (error) {
        console.error('Error occured while running the pipeline :', error);

        let statusCode = 500;
        let errorMessage = 'Internal error occured';

        if (error.message.includes('git')) {
            statusCode = 503; 
            errorMessage = 'Error while trying to get the repository';
        } else if (error.message.includes('dependencies')) {
            statusCode = 500;
            errorMessage = 'Error while trying to install the dependencies';
        }

        res.status(statusCode).send({
            error: errorMessage,
            details: error.message,
        });
    }
}