pipeline {
  agent any

  environment {
    IMAGE_NAME = "simple-ci-cd-demo"
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
        bat 'npm ci'
      }
    }

    stage('Test') {
      steps {
        bat 'npm test'
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: '**/test-results.xml'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          bat '''
            docker --version >nul 2>&1
            if %errorlevel%==0 (
              docker build -t %IMAGE_NAME%:%DOCKER_TAG% .
            ) else (
              echo Docker not available on agent, skipping docker build.
            )
          '''
        }
      }
    }

    stage('Deploy (local run)') {
      steps {
        script {
          bat '''
            docker --version >nul 2>&1
            if %errorlevel%==0 (
              docker rm -f demo-app 2>nul || echo No existing container to remove.
              docker run -d --name demo-app -p 3000:3000 %IMAGE_NAME%:%DOCKER_TAG%
              echo App running on host:3000
            ) else (
              echo Docker not available on agent; can't run container.
            )
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
