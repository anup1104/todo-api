pipeline {
  agent any

  environment {
    IMAGE_NAME = "simple-ci-cd-demo" // used if building docker
    DOCKER_TAG = "${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: '**/test-results.xml' // optional if you generate junit results
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          // Only build if docker is available on Jenkins agent
          sh '''
            if docker --version >/dev/null 2>&1; then
              docker build -t ${IMAGE_NAME}:${DOCKER_TAG} .
            else
              echo "Docker not available on agent, skipping docker build."
            fi
          '''
        }
      }
    }

    stage('Deploy (local run)') {
      steps {
        script {
          sh '''
            if docker --version >/dev/null 2>&1; then
              # stop existing container (if any) and run latest
              docker rm -f demo-app || true
              docker run -d --name demo-app -p 3000:3000 ${IMAGE_NAME}:${DOCKER_TAG}
              echo "App running on host:3000"
            else
              echo "Docker not available on agent; can't run container."
            fi
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Pipeline succeeded"
    }
    failure {
      echo "Pipeline failed"
    }
  }
}
