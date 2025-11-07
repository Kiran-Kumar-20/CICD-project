# Automated Web Development Environment# Automated Web Development Environment using Docker Desktop



A CI/CD pipeline using Docker, Git, GitHub, Jenkins, and Nginx.[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

[![WSL2](https://img.shields.io/badge/WSL2-Compatible-green.svg)](https://docs.microsoft.com/en-us/windows/wsl/)

## Prerequisites[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red.svg)](https://www.jenkins.io/)



- **Docker Desktop** (latest version with WSL2 enabled)An automated web development environment with CI/CD pipeline using Git, GitHub, Jenkins, and Nginx web server, all running in Docker containers with WSL2 backend support.

- **Git** installed

- Windows 10/11, macOS, or Linux## 🚀 Features

- At least 4GB RAM, 10GB disk space

- **Docker-based Setup**: Completely containerized environment using Docker Desktop with WSL2

## Quick Start- **Jenkins CI/CD**: Automated build, test, and deployment pipeline

- **Nginx Web Server**: High-performance web server replacing Apache

### 1. Clone the Repository- **Git Integration**: Seamless version control with GitHub

- **Easy Setup**: One-command setup scripts for Windows and Linux/WSL2

```bash- **Production-Ready**: Includes health checks, logging, and monitoring

git clone https://github.com/Kiran-Kumar-20/CICD-project.git

cd CICD-project## 📋 Prerequisites

```

### Required

### 2. Start Docker Desktop- **Docker Desktop** (latest version)

  - Download from: https://www.docker.com/products/docker-desktop/

Ensure Docker Desktop is running before proceeding.  - Ensure WSL2 backend is enabled (Settings → General → Use WSL 2 based engine)

- **Git** (for version control)

### 3. Start Services  - Download from: https://git-scm.com/downloads



**Windows (PowerShell):**### System Requirements

```powershell- Windows 10/11 with WSL2 enabled, macOS, or Linux

scripts\setup.bat- At least 4GB RAM (8GB recommended)

```- 10GB free disk space

- Docker Desktop running

**Linux/WSL2:**

```bash## 🔧 Quick Start

./scripts/setup.sh

```### 1. Clone the Repository



**Manual Start:**```bash

```bashgit clone https://github.com/Kiran-Kumar-20/CICD-project.git

docker compose up -dcd CICD-project

``````



### 4. Access Services### 2. Run Setup Script



- **Web Application**: http://localhost:8081**For Linux/WSL2:**

- **Jenkins Dashboard**: http://localhost:9090/jenkins```bash

./scripts/setup.sh

### 5. Get Jenkins Initial Password```



```powershell**For Windows (CMD/PowerShell):**

docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword```cmd

```scripts\setup.bat

```

Copy the password, open Jenkins, and complete the setup wizard:

1. Paste the password**Manual Setup (Alternative):**

2. Install suggested plugins```bash

3. Create your admin userdocker compose build

4. Click "Save and Finish"docker compose up -d

```

## Setting Up the Pipeline

### 3. Access the Services

### 1. Configure GitHub Credentials in Jenkins

Once the setup completes, you can access (ports chosen to avoid local conflicts):

1. Go to **Manage Jenkins** → **Credentials**

2. Click **System** → **Global credentials (unrestricted)**- **Web Application**: http://localhost:8081

3. Click **Add Credentials**- **Jenkins Dashboard**: http://localhost:9090/jenkins

   - Kind: Username with password

   - Username: Your GitHub username### 4. Configure Jenkins

   - Password: GitHub Personal Access Token

   - ID: `github-token`1. Access Jenkins at http://localhost:9090/jenkins

4. Click **Create**2. Use the initial admin password displayed by the setup script (or retrieve it with):

   ```bash

**Create GitHub Token:** https://github.com/settings/tokens   docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword

- Generate new token (classic)   ```

- Select scopes: `repo` (all)3. Install suggested plugins

- Copy the token4. Create your first admin user

5. Start creating pipelines!

### 2. Create Multibranch Pipeline

## 📁 Project Structure

1. Jenkins Dashboard → **New Item**

2. Name: `CICD-project````

3. Type: **Multibranch Pipeline** → OKCICD-project/

4. **Branch Sources** → **Add source** → **Git**├── docker-compose.yml          # Docker Compose configuration

   - Project Repository: `https://github.com/Kiran-Kumar-20/CICD-project.git`├── Jenkinsfile                 # Jenkins pipeline definition

   - Credentials: Select `github-token`├── README.md                   # This file

5. **Build Configuration** → Script Path: `Jenkinsfile`├── .gitignore                 # Git ignore rules

6. Click **Save**├── jenkins/

7. Jenkins will automatically scan the repository and create jobs for each branch│   └── Dockerfile             # Custom Jenkins image with plugins

├── webapp/

### 3. Run the Pipeline│   ├── Dockerfile             # Nginx web server image

│   ├── nginx.conf             # Nginx configuration

1. Click on your pipeline job│   └── html/

2. Click on the `main` branch│       ├── index.html         # Sample web application

3. Click **Build Now**│       ├── styles.css         # Styling

4. Watch the pipeline execute through 5 stages:│       └── script.js          # JavaScript functionality

   - Checkout└── scripts/

   - Build    ├── setup.sh               # Linux/WSL2 setup script

   - Test    └── setup.bat              # Windows setup script

   - Deploy```

   - Health Check

## 🔄 CI/CD Pipeline

## Project Structure

The Jenkins pipeline (`Jenkinsfile`) includes the following stages:

```

CICD-project/1. **Checkout**: Pulls the latest code from GitHub

├── docker-compose.yml      # Orchestrates Jenkins + Nginx containers2. **Build**: Builds the Docker image for the web application

├── Jenkinsfile             # CI/CD pipeline definition3. **Test**: Runs validation tests on the application

├── jenkins/4. **Deploy**: Deploys the application to the Nginx container

│   └── Dockerfile          # Custom Jenkins image5. **Health Check**: Verifies the application is running correctly

├── webapp/

│   ├── Dockerfile          # Nginx web server### Setting Up the Pipeline in Jenkins

│   ├── nginx.conf          # Nginx configuration

│   └── html/               # Web application files1. Log in to Jenkins at http://localhost:8080/jenkins

└── scripts/2. Click "New Item"

    ├── setup.sh            # Linux/WSL2 setup script3. Enter a name (e.g., "webapp-pipeline")

    └── setup.bat           # Windows setup script4. Select "Pipeline" and click OK

```5. Under "Pipeline" section, select "Pipeline script from SCM"

6. Choose "Git" as SCM

## Common Commands7. Enter your repository URL

8. Specify the branch (e.g., `*/main` or `*/master`)

### View Running Containers9. Script Path: `Jenkinsfile`

```bash10. Save and click "Build Now"

docker compose ps

```## 🐳 Docker Commands



### View Logs### View Running Containers

```bash```bash

# All servicesdocker compose ps

docker compose logs -f```



# Specific service### View Logs

docker compose logs -f jenkins```bash

docker compose logs -f webapp# All services

```docker compose logs -f



### Stop Services# Specific service

```bashdocker compose logs -f jenkins

docker compose downdocker compose logs -f webapp

``````



### Restart Services### Stop Services

```bash```bash

docker compose restartdocker compose down

``````



### Rebuild Containers### Restart Services

```bash```bash

docker compose downdocker compose restart

docker compose build --no-cache```

docker compose up -d

```### Rebuild Containers

```bash

## Pipeline Stagesdocker compose down

docker compose build --no-cache

The Jenkins pipeline automates:docker compose up -d

```

1. **Checkout**: Pulls latest code from GitHub

2. **Build**: Creates Docker image for web application## 🛠️ Customization

3. **Test**: Validates required files exist

4. **Deploy**: Updates the running Nginx container### Modifying the Web Application

5. **Health Check**: Verifies application is accessible

Edit files in `webapp/html/`:

## Troubleshooting- `index.html` - Main HTML content

- `styles.css` - Styling

### Docker Desktop Not Running- `script.js` - JavaScript functionality

```powershell

Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"After making changes, rebuild and restart:

``````bash

docker compose restart webapp

Wait 15-30 seconds, then run `docker compose up -d````



### Port ConflictsOr trigger a Jenkins build to deploy automatically.

If ports 8081 or 9090 are in use, edit `docker-compose.yml`:

```yaml### Adding Jenkins Plugins

services:

  jenkins:Edit `jenkins/Dockerfile` and add plugins to the `jenkins-plugin-cli --plugins` line:

    ports:```dockerfile

      - "9090:8080"  # Change left numberRUN jenkins-plugin-cli --plugins \

  webapp:    git \

    ports:    github \

      - "8081:80"    # Change left number    your-new-plugin

``````



### Container ConflictsThen rebuild:

```bash```bash

docker rm -f jenkins-cicd webapp-serverdocker compose build jenkins

docker compose up -ddocker compose up -d

``````



## Author## 🔒 Security Notes



Kiran Kumar- The Jenkins initial admin password is auto-generated and displayed during setup

- Change default passwords after first login

## Repository- Configure GitHub webhooks for automatic builds on push

- Use Jenkins credentials for sensitive information

https://github.com/Kiran-Kumar-20/CICD-project- Keep Docker Desktop and containers updated


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