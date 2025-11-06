# Automated Web Development Environment using Docker Desktop

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![WSL2](https://img.shields.io/badge/WSL2-Compatible-green.svg)](https://docs.microsoft.com/en-us/windows/wsl/)
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red.svg)](https://www.jenkins.io/)

An automated web development environment with CI/CD pipeline using Git, GitHub, Jenkins, and Nginx web server, all running in Docker containers with WSL2 backend support.

## 🚀 Features

- **Docker-based Setup**: Completely containerized environment using Docker Desktop with WSL2
- **Jenkins CI/CD**: Automated build, test, and deployment pipeline
- **Nginx Web Server**: High-performance web server replacing Apache
- **Git Integration**: Seamless version control with GitHub
- **Easy Setup**: One-command setup scripts for Windows and Linux/WSL2
- **Production-Ready**: Includes health checks, logging, and monitoring

## 📋 Prerequisites

### Required
- **Docker Desktop** (latest version)
  - Download from: https://www.docker.com/products/docker-desktop/
  - Ensure WSL2 backend is enabled (Settings → General → Use WSL 2 based engine)
- **Git** (for version control)
  - Download from: https://git-scm.com/downloads

### System Requirements
- Windows 10/11 with WSL2 enabled, macOS, or Linux
- At least 4GB RAM (8GB recommended)
- 10GB free disk space
- Docker Desktop running

## 🔧 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Kiran-Kumar-20/CICD-project.git
cd CICD-project
```

### 2. Run Setup Script

**For Linux/WSL2:**
```bash
./scripts/setup.sh
```

**For Windows (CMD/PowerShell):**
```cmd
scripts\setup.bat
```

**Manual Setup (Alternative):**
```bash
docker compose build
docker compose up -d
```

### 3. Access the Services

Once the setup completes, you can access (ports chosen to avoid local conflicts):

- **Web Application**: http://localhost:8081
- **Jenkins Dashboard**: http://localhost:9090/jenkins

### 4. Configure Jenkins

1. Access Jenkins at http://localhost:9090/jenkins
2. Use the initial admin password displayed by the setup script (or retrieve it with):
   ```bash
   docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
   ```
3. Install suggested plugins
4. Create your first admin user
5. Start creating pipelines!

## 📁 Project Structure

```
CICD-project/
├── docker-compose.yml          # Docker Compose configuration
├── Jenkinsfile                 # Jenkins pipeline definition
├── README.md                   # This file
├── .gitignore                 # Git ignore rules
├── jenkins/
│   └── Dockerfile             # Custom Jenkins image with plugins
├── webapp/
│   ├── Dockerfile             # Nginx web server image
│   ├── nginx.conf             # Nginx configuration
│   └── html/
│       ├── index.html         # Sample web application
│       ├── styles.css         # Styling
│       └── script.js          # JavaScript functionality
└── scripts/
    ├── setup.sh               # Linux/WSL2 setup script
    └── setup.bat              # Windows setup script
```

## 🔄 CI/CD Pipeline

The Jenkins pipeline (`Jenkinsfile`) includes the following stages:

1. **Checkout**: Pulls the latest code from GitHub
2. **Build**: Builds the Docker image for the web application
3. **Test**: Runs validation tests on the application
4. **Deploy**: Deploys the application to the Nginx container
5. **Health Check**: Verifies the application is running correctly

### Setting Up the Pipeline in Jenkins

1. Log in to Jenkins at http://localhost:8080/jenkins
2. Click "New Item"
3. Enter a name (e.g., "webapp-pipeline")
4. Select "Pipeline" and click OK
5. Under "Pipeline" section, select "Pipeline script from SCM"
6. Choose "Git" as SCM
7. Enter your repository URL
8. Specify the branch (e.g., `*/main` or `*/master`)
9. Script Path: `Jenkinsfile`
10. Save and click "Build Now"

## 🐳 Docker Commands

### View Running Containers
```bash
docker compose ps
```

### View Logs
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f jenkins
docker compose logs -f webapp
```

### Stop Services
```bash
docker compose down
```

### Restart Services
```bash
docker compose restart
```

### Rebuild Containers
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 🛠️ Customization

### Modifying the Web Application

Edit files in `webapp/html/`:
- `index.html` - Main HTML content
- `styles.css` - Styling
- `script.js` - JavaScript functionality

After making changes, rebuild and restart:
```bash
docker compose restart webapp
```

Or trigger a Jenkins build to deploy automatically.

### Adding Jenkins Plugins

Edit `jenkins/Dockerfile` and add plugins to the `jenkins-plugin-cli --plugins` line:
```dockerfile
RUN jenkins-plugin-cli --plugins \
    git \
    github \
    your-new-plugin
```

Then rebuild:
```bash
docker compose build jenkins
docker compose up -d
```

## 🔒 Security Notes

- The Jenkins initial admin password is auto-generated and displayed during setup
- Change default passwords after first login
- Configure GitHub webhooks for automatic builds on push
- Use Jenkins credentials for sensitive information
- Keep Docker Desktop and containers updated

## 🐛 Troubleshooting

### Docker Desktop Not Starting
- Ensure WSL2 is properly installed: `wsl --status`
- Update WSL2: `wsl --update`
- Restart Docker Desktop

### Port Already in Use
If ports 80 or 8080 are in use, modify `docker-compose.yml` (this project defaults to 8081 for web app and 9090 for Jenkins):
```yaml
ports:
  - "9090:8080"  # Jenkins port on host
  - "8081:80"    # Web app port on host
```

### Jenkins Not Accessible
```bash
# Check if Jenkins is running
docker compose ps

# View Jenkins logs
docker compose logs jenkins

# Restart Jenkins
docker compose restart jenkins
```

### Web App Not Loading
```bash
# Check if webapp is running
docker compose ps

# View webapp logs
docker compose logs webapp

# Restart webapp
docker compose restart webapp
```

### WSL2 Issues on Windows
- Enable WSL2: `wsl --install`
- Set WSL2 as default: `wsl --set-default-version 2`
- Update WSL2 kernel: `wsl --update`

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [WSL2 Documentation](https://docs.microsoft.com/en-us/windows/wsl/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Kiran Kumar

## 🎯 What's Different from RHEL-8/Apache Setup?

This implementation replaces:
- ❌ **RHEL-8** → ✅ **Docker containers** (OS-agnostic, works on Windows/Mac/Linux)
- ❌ **Apache HTTP Server** → ✅ **Nginx** (lightweight, high-performance)
- ❌ **Manual server setup** → ✅ **Docker Compose** (automated, reproducible)
- ✅ **WSL2 Backend** for optimal Docker Desktop performance on Windows

## 🌟 Benefits of This Approach

1. **Platform Independent**: Works on any OS with Docker Desktop
2. **Reproducible**: Same environment everywhere
3. **Isolated**: Containers don't interfere with host system
4. **Easy to Reset**: Just rebuild containers
5. **Production-Like**: Matches modern deployment practices
6. **WSL2 Optimized**: Fast and efficient on Windows

---

**Ready to deploy? Run the setup script and you'll be up and running in minutes!** 🚀