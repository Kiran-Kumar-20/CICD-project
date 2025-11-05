# WSL2 Configuration Guide for Docker Desktop

This guide helps you properly configure WSL2 for optimal Docker Desktop performance.

## Prerequisites

- Windows 10 version 2004 or higher (Build 19041 or higher)
- Windows 11 (any version)

## Installation Steps

### 1. Enable WSL2

Open PowerShell as Administrator and run:

```powershell
# Enable WSL
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# Enable Virtual Machine Platform
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart your computer
Restart-Computer
```

After restart, continue:

```powershell
# Set WSL2 as default version
wsl --set-default-version 2

# Install Ubuntu (or your preferred distro)
wsl --install -d Ubuntu
```

### 2. Update WSL2 Kernel

```powershell
wsl --update
```

### 3. Configure Docker Desktop

1. Open Docker Desktop
2. Go to **Settings** (gear icon)
3. Navigate to **General**
   - ✓ Check "Use the WSL 2 based engine"
4. Navigate to **Resources → WSL Integration**
   - ✓ Enable integration with your default WSL distro
   - ✓ Enable integration with additional distros if needed
5. Click **Apply & Restart**

### 4. Verify Installation

Open a WSL terminal and run:

```bash
# Check WSL version
wsl --list --verbose

# Check Docker is accessible
docker --version
docker compose version

# Test Docker
docker run hello-world
```

## Performance Optimization

### Increase WSL2 Memory Limit

Create/edit `%USERPROFILE%\.wslconfig`:

```ini
[wsl2]
memory=8GB
processors=4
swap=2GB
localhostForwarding=true
```

Restart WSL2:
```powershell
wsl --shutdown
```

### Use WSL2 File System

For best performance, store your project files in the WSL2 file system.

## Best Practices

1. **Always use WSL2 file system** for Docker volumes and projects
2. **Allocate sufficient resources** in .wslconfig
3. **Keep WSL2 and Docker Desktop updated**
4. **Use Docker Compose** for multi-container applications

---

Need help? Create an issue on the GitHub repository!
