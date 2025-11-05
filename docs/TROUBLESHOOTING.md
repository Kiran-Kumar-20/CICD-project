# Troubleshooting Guide

Common issues and solutions for the CI/CD environment.

## Docker Issues

### Issue: "Docker daemon is not running"

**Symptoms:**
- Cannot execute Docker commands
- Error: "Cannot connect to the Docker daemon"

**Solutions:**
1. **Windows/Mac:** Start Docker Desktop
2. **Linux:** Start Docker service
   ```bash
   sudo systemctl start docker
   ```
3. Verify Docker is running:
   ```bash
   docker info
   ```

### Issue: "Permission denied while trying to connect to Docker daemon"

**Symptoms:**
- Docker commands fail with permission errors

**Solutions:**
1. **Linux:** Add user to docker group
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```
2. **Inside Jenkins:** Fix socket permissions
   ```bash
   docker exec -u root jenkins-cicd chmod 666 /var/run/docker.sock
   ```

### Issue: "Port already in use"

**Symptoms:**
- Error: "Bind for 0.0.0.0:80 failed: port is already allocated"

**Solutions:**
1. Find process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :80
   
   # Linux/Mac
   lsof -i :80
   ```
2. Stop the process or change ports in `docker-compose.yml`:
   ```yaml
   ports:
     - "8081:8080"  # Jenkins
     - "8000:80"    # Web app
   ```

## WSL2 Issues

### Issue: "WSL 2 installation is incomplete"

**Symptoms:**
- Docker Desktop shows WSL2 error

**Solutions:**
1. Install WSL2 kernel update:
   - Download: https://aka.ms/wsl2kernel
2. Run the installer
3. Restart Docker Desktop

### Issue: "WSL integration not working"

**Symptoms:**
- Docker commands not available in WSL2

**Solutions:**
1. Enable WSL integration in Docker Desktop:
   - Settings → Resources → WSL Integration
   - Enable for your distro
2. Restart WSL:
   ```powershell
   wsl --shutdown
   ```

### Issue: Slow performance in WSL2

**Symptoms:**
- Docker operations are slow

**Solutions:**
1. Move project to WSL2 filesystem (not /mnt/c/):
   ```bash
   cd ~
   git clone <repo-url>
   ```
2. Increase WSL2 memory in `.wslconfig`:
   ```ini
   [wsl2]
   memory=8GB
   processors=4
   ```

## Jenkins Issues

### Issue: "Jenkins is not accessible"

**Symptoms:**
- Cannot access http://localhost:8080/jenkins
- Connection refused errors

**Solutions:**
1. Check if Jenkins container is running:
   ```bash
   docker compose ps
   ```
2. Check Jenkins logs:
   ```bash
   docker compose logs jenkins
   ```
3. Restart Jenkins:
   ```bash
   docker compose restart jenkins
   ```
4. Wait 30-60 seconds for Jenkins to fully start

### Issue: "Cannot find initial admin password"

**Symptoms:**
- Need password to unlock Jenkins

**Solutions:**
1. Get password from container:
   ```bash
   docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
   ```
2. If file doesn't exist, check if Jenkins is fully started:
   ```bash
   docker compose logs jenkins | grep "Jenkins is fully up"
   ```

### Issue: "Plugin installation fails"

**Symptoms:**
- Jenkins plugins fail to install

**Solutions:**
1. Check internet connectivity
2. Restart Jenkins:
   ```bash
   docker compose restart jenkins
   ```
3. Try manual plugin installation:
   - Manage Jenkins → Manage Plugins → Available
   - Search and install plugins manually

### Issue: "Build fails with 'docker: not found'"

**Symptoms:**
- Pipeline fails at Docker commands

**Solutions:**
1. Verify Docker socket is mounted:
   ```bash
   docker exec jenkins-cicd ls -la /var/run/docker.sock
   ```
2. Fix permissions:
   ```bash
   docker exec -u root jenkins-cicd chmod 666 /var/run/docker.sock
   ```
3. Restart Jenkins:
   ```bash
   docker compose restart jenkins
   ```

## Web Application Issues

### Issue: "Web app not loading"

**Symptoms:**
- http://localhost shows error or nothing

**Solutions:**
1. Check if webapp container is running:
   ```bash
   docker compose ps
   ```
2. Check webapp logs:
   ```bash
   docker compose logs webapp
   ```
3. Test nginx configuration:
   ```bash
   docker exec webapp-server nginx -t
   ```
4. Restart webapp:
   ```bash
   docker compose restart webapp
   ```

### Issue: "Changes to HTML not showing"

**Symptoms:**
- Modified files don't appear in browser

**Solutions:**
1. Clear browser cache (Ctrl+F5)
2. Restart webapp container:
   ```bash
   docker compose restart webapp
   ```
3. Check if volume is mounted correctly:
   ```bash
   docker inspect webapp-server | grep Mounts -A 10
   ```

## Build Pipeline Issues

### Issue: "Pipeline fails to checkout code"

**Symptoms:**
- Git checkout fails in Jenkins

**Solutions:**
1. Verify GitHub credentials in Jenkins
2. Check repository URL is correct
3. Ensure branch name is correct
4. Test Git access:
   ```bash
   git ls-remote <repo-url>
   ```

### Issue: "Build fails with network errors"

**Symptoms:**
- Cannot pull Docker images or access network

**Solutions:**
1. Check Docker network:
   ```bash
   docker network ls
   docker network inspect cicd-project_cicd-network
   ```
2. Recreate network:
   ```bash
   docker compose down
   docker compose up -d
   ```

### Issue: "Deployment fails"

**Symptoms:**
- Deploy stage fails in Jenkins pipeline

**Solutions:**
1. Check if webapp container exists:
   ```bash
   docker ps -a | grep webapp
   ```
2. Check Docker network connectivity:
   ```bash
   docker exec jenkins-cicd ping webapp-server
   ```
3. Review Jenkinsfile deploy stage
4. Check Jenkins console output for specific error

## General Issues

### Issue: "Out of disk space"

**Symptoms:**
- Build fails with "no space left on device"

**Solutions:**
1. Clean Docker system:
   ```bash
   docker system prune -a
   ```
2. Remove unused volumes:
   ```bash
   docker volume prune
   ```
3. Check disk space:
   ```bash
   df -h
   ```

### Issue: "Services won't start"

**Symptoms:**
- docker-compose up fails

**Solutions:**
1. Check Docker Compose syntax:
   ```bash
   docker compose config
   ```
2. View detailed logs:
   ```bash
   docker compose up
   ```
3. Remove and rebuild:
   ```bash
   docker compose down -v
   docker compose build --no-cache
   docker compose up -d
   ```

### Issue: "Cannot access services from host"

**Symptoms:**
- localhost URLs don't work

**Solutions:**
1. **Windows:** Ensure no firewall blocking
2. Check port mappings:
   ```bash
   docker compose ps
   ```
3. Try 127.0.0.1 instead of localhost
4. Check if ports are actually bound:
   ```bash
   netstat -an | grep 8080
   ```

## Getting More Help

### Collect Diagnostic Information

Run these commands and share output when asking for help:

```bash
# Docker version
docker --version
docker compose version

# System info
docker info

# Container status
docker compose ps

# All logs
docker compose logs

# Specific service logs
docker compose logs jenkins
docker compose logs webapp

# Docker networks
docker network ls

# Docker volumes
docker volume ls
```

### Reset Everything

If all else fails, complete reset:

```bash
# Stop and remove everything
docker compose down -v

# Remove all containers and images (careful!)
docker system prune -a -f

# Remove volumes
docker volume prune -f

# Rebuild from scratch
docker compose build --no-cache
docker compose up -d
```

### Useful Commands Reference

```bash
# View running containers
docker compose ps

# View all logs
docker compose logs -f

# Restart all services
docker compose restart

# Stop all services
docker compose down

# Start all services
docker compose up -d

# Rebuild specific service
docker compose build jenkins
docker compose up -d jenkins

# Access container shell
docker exec -it jenkins-cicd /bin/bash
docker exec -it webapp-server /bin/sh

# Check container resources
docker stats
```

## Still Having Issues?

1. Check the main [README.md](../README.md)
2. Review [QUICKSTART.md](../QUICKSTART.md)
3. Check [WSL2_SETUP.md](WSL2_SETUP.md) for WSL2 specific issues
4. Check [JENKINS_SETUP.md](JENKINS_SETUP.md) for Jenkins issues
5. Create an issue on GitHub with diagnostic information

---

Most issues can be resolved by restarting Docker Desktop and running:
```bash
docker compose down && docker compose up -d
```
