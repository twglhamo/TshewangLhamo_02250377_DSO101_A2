pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        // Docker Hub configuration
        DOCKER_HUB_USERNAME = "twglhamo"  // Replace with your Docker Hub username
        DOCKER_IMAGE_NAME = "${DOCKER_HUB_USERNAME}/node-todo-app"
        DOCKER_IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '========== Checking out code from GitHub =========='
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: 'main']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [[$class: 'CloneOption', depth: 0, noTags: false, reference: '', shallow: false]],
                    submoduleCfg: [],
                    userRemoteConfigs: [[credentialsId: '', url: 'https://github.com/twglhamo/TshewangLhamo_02250377_DSO101_A2.git']]
                ])
            }
        }

        stage('Install') {
            steps {
                echo '========== Installing npm dependencies =========='
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo '========== Running build script =========='
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo '========== Running tests with JUnit reporting =========='
                sh 'npm test'
            }
            post {
                always {
                    echo '========== Publishing JUnit test results =========='
                    junit testResults: 'junit.xml', allowEmptyResults: true
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '========== Building and pushing Docker image =========='
                script {
                    // Build the Docker image
                    docker.build("${twglhamo}:${02250377}")

                    // Push to Docker Hub using stored credentials
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-creds') {
                        docker.image("${twglhamo}:${02250377}").push()
                        echo "Successfully pushed ${twglhamo}:${02250377} to Docker Hub"
                    }
                }
            }
        }
    }

    post {
        always {
            echo '========== Pipeline execution completed =========='
            cleanWs()
        }
        success {
            echo '========== Pipeline succeeded =========='
        }
        failure {
            echo '========== Pipeline failed =========='
        }
    }
}
