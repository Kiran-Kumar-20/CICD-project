# Automated Web Development Environment (Docker + Jenkins + Nginx) 🚀

A containerized CI/CD demo using Docker Compose, Jenkins, GitHub and Nginx.  
Designed to run on Docker Desktop (WSL2 on Windows), macOS, or Linux.

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/) 🐳  
[![WSL2](https://img.shields.io/badge/WSL2-Compatible-green.svg)](https://docs.microsoft.com/en-us/windows/wsl/) 🪟  
[![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red.svg)](https://www.jenkins.io/) 🤖

Table of contents
- Prerequisites ✅
- Quick start ⚡
- Accessing services 🌐
- Jenkins pipeline setup 🧩
- Project structure 📁
- Common Docker commands 🐳
- Troubleshooting 🛠️
- Security notes 🔒
- Contributing 🤝
- License 📜
- Author 👤

## Prerequisites ✅
- Docker Desktop (latest) with WSL2 enabled on Windows (or Docker Engine on Linux/macOS)  
- Git (version control) 🐙  
- At least 4 GB RAM (8 GB recommended) and ~10 GB free disk space 💾  
- Optional: GitHub personal access token (for Jenkins / webhooks) 🔑

## Quick start ⚡
1. Clone the repository:
```bash
git clone https://github.com/Kiran-Kumar-20/CICD-project.git
cd CICD-project
```

2. Start Docker Desktop (if using Windows/macOS) and ensure it's running. 🖥️

3. Run the setup script for your platform:

- Linux / WSL2:
```bash
./scripts/setup.sh
```

- Windows (PowerShell):
```powershell
.\scripts\setup.bat
```

4. Or start services manually with Docker Compose:
```bash
docker compose up -d --build
```

## Accessing services 🌐
- Web application (Nginx): http://localhost:8081 🌀  
- Jenkins: http://localhost:9090/jenkins 🤖

Get the initial Jenkins admin password:
```bash
docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
```

## Jenkins — Configure pipeline (overview) 🧩
1. Open Jenkins at http://localhost:9090/jenkins and complete the setup wizard:
   - Use the initial admin password above.
   - Install suggested plugins.
   - Create an admin user.

2. Add GitHub credentials:
   - Manage Jenkins → Credentials → System → Global credentials → Add Credentials  
   - Kind: Username with password  
   - Username: your GitHub username  
   - Password: GitHub personal access token (classic token with `repo` scope) 🔐  
   - ID: e.g. `github-token`

3. Create a Multibranch Pipeline:
   - New Item → Name: `CICD-project` → Multibranch Pipeline  
   - Branch Sources → Add source → Git  
     - Repository: `https://github.com/Kiran-Kumar-20/CICD-project.git`  
     - Credentials: `github-token`  
   - Build Configuration: Script Path: `Jenkinsfile`  
   - Save → Jenkins will scan branches and create jobs per branch 🔎

4. Trigger a build:
   - Open the branch job (e.g., `main`) → Build Now ▶️

Pipeline stages (example):
- Checkout ✅
- Build (Docker image) 🏗️
- Test (validation) ✅
- Deploy (to Nginx container) 🚀
- Health check ❤️‍🩹

## Project structure 📁
```
CICD-project/
├── docker-compose.yml       # Compose for Jenkins + webapp
├── Jenkinsfile              # Pipeline definition
├── README.md
├── .gitignore
├── jenkins/
│   ├── Dockerfile           # Custom Jenkins image
│   └── ...                  # additional Jenkins config
├── webapp/
│   ├── Dockerfile           # Nginx image (serving webapp/html)
│   ├── nginx.conf
│   └── html/
│       ├── index.html
│       ├── styles.css
│       └── script.js
└── scripts/
    ├── setup.sh             # Linux / WSL2 setup
    └── setup.bat            # Windows setup
```

## Common Docker / Compose commands 🐳
Show running containers:
```bash
docker compose ps
```

View logs:
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f jenkins
docker compose logs -f webapp
```

Stop / start / restart:
```bash
docker compose down
docker compose up -d
docker compose restart
```

Rebuild containers:
```bash
docker compose build --no-cache
docker compose up -d --force-recreate
```

Get Jenkins initial password (again):
```bash
docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
```

## Troubleshooting 🛠️
- Docker Desktop not starting:
  - Windows: `wsl --status`, `wsl --update`, restart Docker Desktop 💡
  - Ensure WSL2 installed: `wsl --install` and set default: `wsl --set-default-version 2`

- Port conflicts:
  - Default mappings: host 9090 → container 8080 (Jenkins), host 8081 → container 80 (webapp)  
  - Edit `docker-compose.yml` and rebuild if needed 🔧

- Jenkins not accessible:
```bash
docker compose ps
docker compose logs -f jenkins
docker compose restart jenkins
```

- Web app not loading:
```bash
docker compose ps
docker compose logs -f webapp
docker compose restart webapp
```

## Security notes 🔒
- Change default passwords and admin credentials after first login.  
- Use GitHub personal access tokens for Jenkins credentials — avoid storing plain passwords in the repo.  
- Limit token scopes to the minimum required (e.g., `repo` for private repositories).

## Customization tips 🛠️
- Add Jenkins plugins by updating `jenkins/Dockerfile` and `jenkins-plugin-cli --plugins`.  
- Change host ports in `docker-compose.yml` to avoid conflicts.  
- Edit files under `webapp/html/` to modify the served web content.

## Contributing 🤝
1. Fork the repository  
2. Create a feature branch:
```bash
git checkout -b feature/your-feature
```
3. Commit changes:
```bash
git commit -am "Add feature: description"
```
4. Push and open a Pull Request:
```bash
git push origin feature/your-feature
```

## License 📜
This is just for demonstrating how Jenkins automation helps in web development 

## Author 👤
M. Kiran Kumar Reddy
