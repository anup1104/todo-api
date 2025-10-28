pipeline {
  agent any

  environment {
    IMAGE_NAME = "simple-ci-cd-demo"
    DOCKER_TAG = "${env.BUILD_NUMBER}"
    START_PORT = 3000
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
              echo Building Docker image: %IMAGE_NAME%:%DOCKER_TAG%
              docker build -t %IMAGE_NAME%:%DOCKER_TAG% .
            ) else (
              echo Docker not available on agent; skipping Docker build.
            )
          '''
        }
      }
    }

    stage('Deploy (auto port)') {
      steps {
        script {
          bat '''
            docker --version >nul 2>&1
            if %errorlevel%==0 (
              setlocal enabledelayedexpansion
              set PORT=%START_PORT%

              :check_port
              docker ps --format "{{.Ports}}" | findstr /C:":!PORT!->" >nul
              if !errorlevel! == 0 (
                echo Port !PORT! is in use, checking next port...
                set /a PORT=!PORT!+1
                goto check_port
              )

              echo Using available port !PORT!
              docker rm -f demo-app 2>nul || echo No existing container to remove.

              docker run -d --name demo-app -p !PORT!:3000 %IMAGE_NAME%:%DOCKER_TAG%
              echo --------------------------------------------------------
              echo App is running locally at: http://localhost:!PORT!
              echo --------------------------------------------------------
              endlocal
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
      echo "✅ Pipeline succeeded!"
    }
    failure {
      echo "❌ Pipeline failed."
    }
  }
}
