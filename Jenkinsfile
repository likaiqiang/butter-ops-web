pipeline {
    agent any
    environment {
        PROJECT_ENV = 'test'
    }
    stages {

        stage('Checkout') {
            steps {
                sh 'echo stage checkout'
                checkout scm
            }
        }
        stage('Prepare project') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build project') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'rm -rf /data/*'
                sh 'cp -r /export/server/butter-ops-web/* /data && rm -rf /export/server/butter-ops-web/*'
                sh 'cp -r ./dist/* /export/server/butter-ops-web/'
            }
        }
    }
}
