# Quick Start Guide

This guide will help you get the CI/CD environment running in minutes!

## Step-by-Step Instructions

### Step 1: Install Prerequisites

1. **Install Docker Desktop**
   - Windows/Mac: Download from https://www.docker.com/products/docker-desktop/
   - Linux: Follow instructions at https://docs.docker.com/engine/install/

2. **Enable WSL2 (Windows only)**
   ```powershell
   wsl --install
   wsl --set-default-version 2
   ```

3. **Configure Docker Desktop**
   - Open Docker Desktop
   - Go to Settings → General
   - ✓ Check "Use WSL 2 based engine"
   - Click "Apply & Restart"

### Step 2: Clone the Repository

```bash
git clone https://github.com/Kiran-Kumar-20/CICD-project.git
cd CICD-project
```

### Step 3: Start the Environment

**Option A: Using Setup Script (Recommended)**

Linux/WSL2:
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

Windows:
```cmd
scripts\setup.bat
```

**Option B: Manual Start**
```bash
docker compose up -d
```

### Step 4: Access Services

Wait 30 seconds for services to initialize, then access:

- **Web App**: http://localhost:8081
- **Jenkins**: http://localhost:9090/jenkins

### Step 5: Configure Jenkins

1. Get initial password:
   ```bash
   docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
   ```

2. Open http://localhost:8080/jenkins in your browser
3. Paste the password
4. Click "Install suggested plugins"
5. Create admin user
6. Click "Save and Finish"

### Step 6: Create Your First Pipeline

1. Click "New Item"
2. Name: "webapp-pipeline"
3. Type: "Pipeline"
4. Under Pipeline:
   - Definition: "Pipeline script from SCM"
   - SCM: "Git"
   - Repository URL: Your repo URL
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
5. Click "Save"
6. Click "Build Now"

## Verification

Run these commands to verify everything is working:

```bash
# Check containers are running
docker compose ps

# Check web app
curl http://localhost

# Check Jenkins
curl http://localhost:8080/jenkins
```

## Troubleshooting

### Containers not starting?
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Port conflicts?
Edit `docker-compose.yml` and change port numbers:
```yaml
ports:
  - "8081:8080"  # Jenkins
  - "8000:80"    # Web app
```

### Need help?
```bash
# View logs
docker compose logs -f

# Check Docker status
docker info

# Check WSL2 status (Windows)
wsl --status
```

## Next Steps

- Customize `webapp/html/index.html` for your application
- Modify `Jenkinsfile` for your build pipeline
- Add webhooks in GitHub for automatic builds
- Explore Jenkins plugins for additional functionality

## Support

For issues or questions, check the main README.md or create an issue on GitHub.

---

**You're all set! Happy coding! 🚀**
