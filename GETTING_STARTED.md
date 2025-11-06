# Getting Started - Complete Guide

## ⚡ Quick Start (5 Minutes)

### Prerequisites Check
- [ ] Docker Desktop installed
- [ ] Docker Desktop running
- [ ] WSL2 enabled (Windows only)
- [ ] Git installed

### Step 1: Clone Repository
```bash
git clone https://github.com/Kiran-Kumar-20/CICD-project.git
cd CICD-project
```

### Step 2: Run Setup
**Linux/WSL2:**
```bash
./scripts/setup.sh
```

**Windows:**
```cmd
scripts\setup.bat
```

### Step 3: Access Services
Wait ~30 seconds, then open:
- **Web App**: http://localhost:8081
- **Jenkins**: http://localhost:9090/jenkins

### Step 4: Get Jenkins Password
```bash
docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
```

## 🎯 What You Get

### 1. Modern Web Application
- Professional landing page
- Responsive design
- Running on Nginx
- Hot-reload capability

### 2. Jenkins CI/CD Server
- Pre-configured with plugins
- Ready for pipelines
- Docker integration
- GitHub integration

### 3. Complete Development Environment
- Containerized services
- Isolated networking
- Persistent storage
- Easy management

## 📖 Detailed Guides

### For First-Time Users
→ Read [QUICKSTART.md](QUICKSTART.md)

### For WSL2 Setup on Windows
→ Read [docs/WSL2_SETUP.md](docs/WSL2_SETUP.md)

### For Jenkins Configuration
→ Read [docs/JENKINS_SETUP.md](docs/JENKINS_SETUP.md)

### For Understanding the Solution
→ Read [docs/SOLUTION_OVERVIEW.md](docs/SOLUTION_OVERVIEW.md)

### For Problems/Issues
→ Read [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## 🔧 Common Commands

### Start Everything
```bash
docker compose up -d
```

### Stop Everything
```bash
docker compose down
```

### View Logs
```bash
docker compose logs -f
```

### Restart a Service
```bash
docker compose restart webapp
docker compose restart jenkins
```

### Rebuild Everything
```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

## 🎨 Customize Your Web App

1. Edit files in `webapp/html/`:
   - `index.html` - Content
   - `styles.css` - Styling
   - `script.js` - Functionality

2. Restart webapp:
   ```bash
   docker compose restart webapp
   ```

3. View at http://localhost

## 🚀 Set Up CI/CD Pipeline

1. Access Jenkins at http://localhost:9090/jenkins
2. Click "New Item"
3. Name: "webapp-pipeline"
4. Type: "Pipeline"
5. Configure:
   - Pipeline script from SCM
   - SCM: Git
   - Repository URL: Your repo
   - Branch: */main
   - Script Path: Jenkinsfile
6. Save and "Build Now"

## ✅ Verify Everything Works

Run the test script:
```bash
./scripts/test-setup.sh
```

Should see:
```
✓ All tests passed!
```

## 📊 Architecture Overview

```
┌─────────────────────────────────┐
│     Your Computer               │
│  (Docker Desktop + WSL2)        │
│                                 │
│  ┌──────────────────────────┐  │
│  │   Jenkins (Port 8080)    │  │
│  │   - CI/CD Automation     │  │
│  │   - Build & Deploy       │  │
│  └──────────────────────────┘  │
│              ↓                  │
│  ┌──────────────────────────┐  │
│  │   Web App (Port 80)      │  │
│  │   - Nginx Server         │  │
│  │   - Your Website         │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

## 🎓 Learning Path

### Beginner
1. Run setup script
2. Access web application
3. Explore the HTML/CSS/JS
4. Make simple changes

### Intermediate
1. Configure Jenkins
2. Create a pipeline
3. Trigger automated builds
4. Understand Dockerfile

### Advanced
1. Customize Jenkins pipeline
2. Add new services
3. Implement monitoring
4. Deploy to production

## 💡 Tips

1. **WSL2 Users**: Keep project in WSL2 filesystem for best performance
2. **Windows Users**: Use WSL2 terminal for commands
3. **Mac/Linux Users**: Everything works natively
4. **First Time**: Initial Docker image builds take 5-10 minutes
5. **Stuck?**: Check [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## 🆘 Need Help?

1. **Quick issues**: Run `docker compose down && docker compose up -d`
2. **Check logs**: Run `docker compose logs -f`
3. **Validate setup**: Run `./scripts/test-setup.sh`
4. **Still stuck**: Check documentation in `docs/` folder

## 🌟 What Makes This Special?

### Traditional Setup (RHEL-8 + Apache)
- Takes hours to configure
- OS-specific
- Hard to replicate
- Complex dependencies

### This Setup (Docker + WSL2)
- Takes minutes to setup
- Works everywhere
- One command to start
- Completely isolated

## 📦 What's Included?

### Services
- ✅ Jenkins CI/CD server
- ✅ Nginx web server
- ✅ Docker networking
- ✅ Persistent volumes

### Code
- ✅ Sample web application
- ✅ Jenkins pipeline
- ✅ Docker configurations
- ✅ Setup automation

### Documentation
- ✅ README with full details
- ✅ Quick start guide
- ✅ WSL2 setup guide
- ✅ Jenkins guide
- ✅ Troubleshooting guide
- ✅ Solution overview

### Scripts
- ✅ Automated setup (Linux)
- ✅ Automated setup (Windows)
- ✅ Validation tests

## 🎉 Success Criteria

You know it's working when:
- ✅ http://localhost shows the web application
- ✅ http://localhost:8080/jenkins shows Jenkins
- ✅ `docker compose ps` shows both containers running
- ✅ `./scripts/test-setup.sh` passes all tests

## 🚀 Ready to Start?

Just run:
```bash
./scripts/setup.sh
```

Then open http://localhost in your browser!

---

**Questions?** Check the comprehensive guides in the `docs/` folder!
