pipeline {
    agent any
    
    triggers {
        // Poll SCM roughly every 2 minutes (hashed per job)
        pollSCM('H/2 * * * *')
        // Tip: If you later switch to GitHub webhooks, you can use:
        // githubPush()
    }
    
    environment {
        DOCKER_IMAGE = 'webapp'
        DOCKER_TAG = "${BUILD_NUMBER}"
        WEBAPP_PORT = '80'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from GitHub...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                script {
                    // Build the web application Docker image
                    sh '''
                        cd webapp
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    // Basic validation tests
                    sh '''
                        echo "Testing HTML files exist..."
                        test -f webapp/html/index.html
                        test -f webapp/html/styles.css
                        test -f webapp/html/script.js
                        echo "All required files present!"
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                script {
                    sh '''
                        set -e
                        # If a compose-managed container is running, update its content in-place
                        if docker ps --format '{{.Names}}' | grep -q '^webapp-server$'; then
                          echo "webapp-server is running; updating static files via docker cp"
                          docker cp webapp/html/. webapp-server:/usr/share/nginx/html/
                        else
                          echo "webapp-server not running; starting a fresh container from the built image"
                          docker run -d \
                            --name webapp-server \
                            -p ${WEBAPP_PORT}:80 \
                            ${DOCKER_IMAGE}:latest
                        fi
                        echo "Deployment step finished"
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                script {
                    sh '''
                        sleep 5
                        # Check the webapp container directly on the Docker network
                        curl -f http://webapp-server:80/ || exit 1
                        echo "Health check passed!"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            echo "Application is running at http://localhost:${WEBAPP_PORT}"
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
