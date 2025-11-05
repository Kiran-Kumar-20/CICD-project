#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  CI/CD Environment Setup Script${NC}"
echo -e "${BLUE}  Docker Desktop with WSL2${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if Docker is installed
echo -e "${YELLOW}Checking Docker installation...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker Desktop first.${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}Docker is not running. Please start Docker Desktop.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker is installed and running${NC}"

# Check if Docker Compose is available
echo -e "${YELLOW}Checking Docker Compose...${NC}"
if ! docker compose version &> /dev/null; then
    echo -e "${RED}Docker Compose is not available. Please update Docker Desktop.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker Compose is available${NC}"

# Check if running on WSL2
echo -e "${YELLOW}Checking WSL2...${NC}"
if grep -qi microsoft /proc/version; then
    echo -e "${GREEN}✓ Running on WSL2${NC}"
elif [[ "$OSTYPE" == "darwin"* ]] || [[ "$OSTYPE" == "msys" ]]; then
    echo -e "${YELLOW}⚠ Running on native OS (Docker Desktop should handle WSL2 backend)${NC}"
else
    echo -e "${YELLOW}⚠ Not running on WSL2, but continuing...${NC}"
fi

# Build and start containers
echo ""
echo -e "${YELLOW}Building and starting containers...${NC}"
docker compose down 2>/dev/null
docker compose build

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to build containers. Please check the error messages above.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Containers built successfully${NC}"

# Start services
echo -e "${YELLOW}Starting services...${NC}"
docker compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to start containers. Please check the error messages above.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Services started successfully${NC}"

# Wait for Jenkins to be ready
echo ""
echo -e "${YELLOW}Waiting for Jenkins to initialize (this may take a minute)...${NC}"
sleep 30

# Get Jenkins initial admin password
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${GREEN}Your CI/CD environment is now running:${NC}"
echo ""
echo -e "  📦 Web Application: ${BLUE}http://localhost${NC}"
echo -e "  🔧 Jenkins Dashboard: ${BLUE}http://localhost:8080/jenkins${NC}"
echo ""

# Try to get Jenkins initial password
if docker exec jenkins-cicd test -f /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null; then
    JENKINS_PASSWORD=$(docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null)
    if [ ! -z "$JENKINS_PASSWORD" ]; then
        echo -e "${YELLOW}Jenkins Initial Admin Password:${NC}"
        echo -e "${GREEN}${JENKINS_PASSWORD}${NC}"
        echo ""
    fi
fi

echo -e "${YELLOW}Useful Commands:${NC}"
echo "  - View logs: docker compose logs -f"
echo "  - Stop services: docker compose down"
echo "  - Restart services: docker compose restart"
echo "  - View running containers: docker compose ps"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
