pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Build & Test') {
            steps {
                script {
                    sh 'mvn clean verify'
                }
            }
        }

        stage('SonarQube') {
            steps {
                withSonarQubeEnv('sonarqube-server'){
                     sh "mvn sonar:sonar -Dsonar.projectKey=school-service -Dsonar.projectName='School-Service'"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // This could be deploying to a server or creating a Docker image
                    //sh 'mvn deploy'
                    echo 'Deploying JAR...'
                }
            }
        }
    }

    post {
        success {
            // This block will be executed if the pipeline is successful
            echo 'Pipeline successful!'

            // You can add additional post-success actions here
        }

        failure {
            // This block will be executed if the pipeline fails
            echo 'Pipeline failed!'

            // You can add additional post-failure actions here
        }
    }
}
