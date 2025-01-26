# Expo CI/CD Workflow

This repository provides a streamlined CI/CD workflow for automating the deployment process of an Expo project. It ensures code verification, server synchronization, dependency installation, and deployment of the Expo development server for public testing.

## Features

- Code Verification: Automatically runs expo-doctor to check for any misconfigurations or issues in the code.
- API Integration: Sends a POST request to notify a server whenever updates are made in the repository.
- Repository Synchronization:
  - Clones the repository on the first deployment.
  - Pulls the latest changes from the dev branch for subsequent updates.
- Dependency Installation: Automatically installs all required project dependencies.
- Development Server Deployment: Launches the Expo server on a designated port, making the app accessible via a public URL.

## How It Works
1. Triggering the Pipeline: The pipeline is triggered whenever changes are pushed to the dev branch.
2. Code Verification with expo-doctor: The pipeline ensures the project is properly configured by running:
    ```bash
    npx expo-doctor
    ```
    If any issues are detected, the pipeline stops.

3. API Notification: A POST request is sent to a specified server to indicate the start of the deployment process.
4. Repository Synchronization: The server checks whether the repository exists locally:
    - First Deployment: Clones the repository.
    - Subsequent Updates: Pulls the latest changes from the dev branch.
5. Dependency Installation: Installs required dependencies with:
   ```bash
    npm install
    ```
6. Expo Server Launch: Starts the Expo development server on port 8081 (or a configurable port).
    The app is then accessible via the public URL: https://domain-name.com (if you configure your Apache or NGinx)

<hr>

## Getting Started
### Requirements
- Node.js (v18 or later)
- Git
- Expo CLI
- A server with access to the repository and the ability to run the Expo server.

### Installation
1. Clone this repository:
  ```bash
  git clone https://github.com/OmerGS/expo-web-deployement.git
  ```
2. Install dependencies:
  ```bash
  npm install
  ```

## Usage
1. Push changes to the dev branch to trigger the CI/CD pipeline.
2. Monitor the pipeline through your CI/CD platform (GitHub Actions, GitLab CI/CD, etc.).
3. The pipeline call the server and you will able to see the deployement.

## Note 
If you try to use a URL with an integrated port, such as `https://example.com:8756`, it might not work as expected. In my case, GitLab's request timed out each time before reaching the server. To resolve this, you need to use a subdomain, such as `pipeline.example.com`, which redirects to the designated port. This ensures proper routing and avoids timeout issues.

## 🧑‍💻 Author
Hey, I’m OmerGS, a dev from France 🇫🇷. 
Not much to say, but feel free to check out my other projects on ([GitHub](https://github.com/OmerGS?tab=repositories)) and visit [my website](https://omergs.com) for more.

   
