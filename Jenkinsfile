pipeline {
    agent any

    environment {
        BASE_URL = 'https://demo.playwright.dev/todomvc/'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**',
                             allowEmptyArchive: true

            archiveArtifacts artifacts: 'test-results/**',
                             allowEmptyArchive: true
        }
    }
}