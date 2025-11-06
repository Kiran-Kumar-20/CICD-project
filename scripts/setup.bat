@echo off
REM CI/CD Environment Setup Script for Windows
REM For Docker Desktop with WSL2

echo ========================================
echo   CI/CD Environment Setup Script
echo   Docker Desktop with WSL2
echo ========================================
echo.

REM Check if Docker is installed
echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo [OK] Docker is installed and running

REM Check if Docker Compose is available
echo Checking Docker Compose...
docker compose version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not available. Please update Docker Desktop.
    pause
    exit /b 1
)

echo [OK] Docker Compose is available

REM Stop and remove old containers
echo.
echo Stopping old containers...
docker compose down 2>nul

REM Build containers
echo.
echo Building containers...
docker compose build
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build containers. Please check the error messages above.
    pause
    exit /b 1
)

echo [OK] Containers built successfully

REM Start services
echo.
echo Starting services...
docker compose up -d
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start containers. Please check the error messages above.
    pause
    exit /b 1
)

echo [OK] Services started successfully

REM Wait for Jenkins to initialize
echo.
echo Waiting for Jenkins to initialize (this may take a minute)...
timeout /t 30 /nobreak >nul

REM Display success message
echo.
echo ========================================
echo [OK] Setup completed successfully!
echo ========================================
echo.
echo Your CI/CD environment is now running:
echo.
echo   Web Application: http://localhost:8081
echo   Jenkins Dashboard: http://localhost:9090/jenkins
echo.

REM Try to get Jenkins initial password
docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword 2>nul
if %errorlevel% equ 0 (
    echo.
    echo Jenkins Initial Admin Password is shown above
    echo.
)

echo Useful Commands:
echo   - View logs: docker compose logs -f
echo   - Stop services: docker compose down
echo   - Restart services: docker compose restart
echo   - View running containers: docker compose ps
echo.
echo Happy coding!
echo.
pause
