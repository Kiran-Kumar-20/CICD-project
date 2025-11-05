pipeline {
    agent any
    
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
                        # Stop and remove old container if exists
                        docker stop webapp-server 2>/dev/null || true
                        docker rm webapp-server 2>/dev/null || true
                        
                        # Deploy new container
                        docker run -d \
                            --name webapp-server \
                            -p ${WEBAPP_PORT}:80 \
                            --network cicd-project_cicd-network \
                            -v $(pwd)/webapp/html:/usr/share/nginx/html:ro \
                            ${DOCKER_IMAGE}:latest
                        
                        echo "Application deployed successfully!"
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
                        curl -f http://localhost:${WEBAPP_PORT}/ || exit 1
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
