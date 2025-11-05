# Jenkins Configuration Guide

Complete guide to configure Jenkins for your CI/CD pipeline.

## Initial Setup

### 1. Access Jenkins

After starting the containers, access Jenkins at:
```
http://localhost:8080/jenkins
```

### 2. Unlock Jenkins

Get the initial admin password:
```bash
docker exec jenkins-cicd cat /var/jenkins_home/secrets/initialAdminPassword
```

Copy the password and paste it in the Jenkins unlock screen.

### 3. Install Plugins

When prompted, select **"Install suggested plugins"**. This will install:
- Git plugin
- GitHub plugin
- Pipeline plugin
- Docker plugin
- And many more essential plugins

Wait for the installation to complete (usually 2-5 minutes).

### 4. Create Admin User

Fill in the form to create your first admin user:
- Username: (your choice)
- Password: (strong password)
- Full name: (your name)
- Email: (your email)

Click "Save and Continue".

### 5. Configure Instance

Accept the default Jenkins URL or customize it.
Click "Save and Finish", then "Start using Jenkins".

## Creating Your First Pipeline

### Method 1: Pipeline from SCM (Recommended)

1. Click **"New Item"**
2. Enter item name: `webapp-pipeline`
3. Select **"Pipeline"**
4. Click **OK**

5. In the configuration page:
   - **Description**: "Automated build and deployment for web application"
   - Under **Pipeline** section:
     - **Definition**: Select "Pipeline script from SCM"
     - **SCM**: Select "Git"
     - **Repository URL**: Your GitHub repository URL
       ```
       https://github.com/Kiran-Kumar-20/CICD-project.git
       ```
     - **Branch Specifier**: `*/main` (or `*/master`)
     - **Script Path**: `Jenkinsfile`

6. Click **"Save"**

7. Click **"Build Now"** to run your first build!

### Method 2: Inline Pipeline Script

If you want to test without SCM:

1. Create a new Pipeline item
2. Under **Pipeline** section:
   - **Definition**: Select "Pipeline script"
   - Paste this script:

```groovy
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello from Jenkins!'
            }
        }
    }
}
```

3. Click "Save" and "Build Now"

## Configuring GitHub Integration

### 1. Add GitHub Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **(global)** domain
3. Click **"Add Credentials"**
4. Fill in:
   - **Kind**: Username with password
   - **Username**: Your GitHub username
   - **Password**: GitHub Personal Access Token
   - **ID**: `github-credentials`
   - **Description**: "GitHub Access Token"
5. Click **"Create"**

### 2. Generate GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click **"Generate new token"**
3. Select scopes:
   - `repo` (all)
   - `admin:repo_hook`
4. Copy the token (you won't see it again!)
5. Use this token as the password in Jenkins credentials

### 3. Configure Webhook (Optional)

For automatic builds on push:

1. In your GitHub repository, go to Settings → Webhooks
2. Click **"Add webhook"**
3. Fill in:
   - **Payload URL**: `http://your-jenkins-url/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Select "Just the push event"
4. Click **"Add webhook"**

## Pipeline Configuration

### Understanding the Jenkinsfile

The `Jenkinsfile` in this project has these stages:

1. **Checkout**: Gets code from GitHub
2. **Build**: Builds Docker image for web app
3. **Test**: Runs validation tests
4. **Deploy**: Deploys to Nginx container
5. **Health Check**: Verifies deployment

### Customizing the Pipeline

Edit `Jenkinsfile` to customize:

```groovy
pipeline {
    agent any
    
    environment {
        // Add your environment variables
        APP_NAME = 'my-webapp'
    }
    
    stages {
        stage('Your Stage') {
            steps {
                echo 'Your step here'
            }
        }
    }
}
```

## Monitoring Builds

### View Build History

- Click on your pipeline
- See list of builds with status (blue = success, red = failure)
- Click on a build number to see details

### View Console Output

- Click on a build number
- Click **"Console Output"**
- See real-time logs of the build

### View Build Trends

- Pipeline page shows trends over time
- Stage View shows duration of each stage

## Troubleshooting

### Build Fails: "Docker not found"

**Solution**: The Jenkins container needs access to Docker socket.
This is already configured in `docker-compose.yml`:
```yaml
volumes:
  - /var/run/docker.sock:/var/run/docker.sock
```

### Build Fails: Permission Denied

**Solution**: Jenkins user needs Docker permissions:
```bash
docker exec -u root jenkins-cicd chmod 666 /var/run/docker.sock
```

### Pipeline Not Triggering on Push

**Solution**: Check webhook configuration:
1. GitHub repo → Settings → Webhooks
2. Check recent deliveries
3. Ensure Jenkins URL is accessible from internet (or use ngrok for testing)

### Cannot Connect to GitHub

**Solution**: Check credentials:
1. Verify GitHub token is valid
2. Check token has required permissions
3. Test credentials in Jenkins

## Best Practices

1. **Use Declarative Pipeline** syntax (easier to read)
2. **Store credentials** in Jenkins, not in code
3. **Use environment variables** for configuration
4. **Add notifications** for build status
5. **Archive artifacts** for successful builds
6. **Clean workspace** regularly
7. **Use build parameters** for flexibility

## Advanced Configuration

### Adding Email Notifications

1. Go to **Manage Jenkins** → **Configure System**
2. Find **Extended E-mail Notification**
3. Configure SMTP server
4. Add to Jenkinsfile:

```groovy
post {
    success {
        emailext (
            subject: "Build Successful: ${env.JOB_NAME}",
            body: "Build ${env.BUILD_NUMBER} succeeded!",
            to: "your-email@example.com"
        )
    }
}
```

### Adding Slack Notifications

1. Install Slack Notification Plugin
2. Configure Slack in Jenkins
3. Add to Jenkinsfile:

```groovy
post {
    always {
        slackSend (
            color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger',
            message: "Build ${env.BUILD_NUMBER}: ${currentBuild.result}"
        )
    }
}
```

## Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Pipeline Syntax Reference](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Plugin Index](https://plugins.jenkins.io/)

---

Happy building! 🚀
