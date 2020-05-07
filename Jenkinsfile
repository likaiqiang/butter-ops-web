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
                sh 'echo `whoami`'
                sh 'sudo rm -rf /data/*'
                sh 'sudo cp -r /export/server/butter-ops-web/* /data && sudo rm -rf /export/server/butter-ops-web/*'
                sh 'sudo cp -r ./dist/* /export/server/butter-ops-web/'
            }
        }
    }
}
