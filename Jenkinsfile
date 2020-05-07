pipeline {
    agent {
        any
    }
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
        stage('Build project') {
            steps {
                sh 'npm build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'echo deploy'
            }
        }
    }
}
