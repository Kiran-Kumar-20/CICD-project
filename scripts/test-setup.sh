#!/bin/bash

# Test script to validate the setup

echo "=== Testing CI/CD Setup ==="
echo ""

ERRORS=0

# Test 1: Check required files exist
echo "Test 1: Checking required files..."
REQUIRED_FILES=(
    "docker-compose.yml"
    "Jenkinsfile"
    "README.md"
    "jenkins/Dockerfile"
    "webapp/Dockerfile"
    "webapp/nginx.conf"
    "webapp/html/index.html"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ✗ $file missing"
        ERRORS=$((ERRORS + 1))
    fi
done

# Test 2: Validate Docker Compose syntax
echo ""
echo "Test 2: Validating Docker Compose syntax..."
if docker compose config > /dev/null 2>&1; then
    echo "  ✓ docker-compose.yml is valid"
else
    echo "  ✗ docker-compose.yml has errors"
    ERRORS=$((ERRORS + 1))
fi

# Test 3: Validate Dockerfiles
echo ""
echo "Test 3: Validating Dockerfiles..."
if [ -f "jenkins/Dockerfile" ]; then
    if grep -q "FROM jenkins/jenkins:lts" jenkins/Dockerfile; then
        echo "  ✓ Jenkins Dockerfile is valid"
    else
        echo "  ✗ Jenkins Dockerfile may have issues"
        ERRORS=$((ERRORS + 1))
    fi
fi

if [ -f "webapp/Dockerfile" ]; then
    if grep -q "FROM nginx:alpine" webapp/Dockerfile; then
        echo "  ✓ Webapp Dockerfile is valid"
    else
        echo "  ✗ Webapp Dockerfile may have issues"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Test 4: Check HTML files
echo ""
echo "Test 4: Validating HTML files..."
if [ -f "webapp/html/index.html" ]; then
    if grep -q "<!DOCTYPE html>" webapp/html/index.html; then
        echo "  ✓ index.html is valid HTML"
    else
        echo "  ✗ index.html may have issues"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Test 5: Check Jenkinsfile syntax
echo ""
echo "Test 5: Validating Jenkinsfile..."
if [ -f "Jenkinsfile" ]; then
    if grep -q "pipeline {" Jenkinsfile; then
        echo "  ✓ Jenkinsfile has pipeline syntax"
    else
        echo "  ✗ Jenkinsfile may have issues"
        ERRORS=$((ERRORS + 1))
    fi
fi

# Summary
echo ""
echo "=== Test Summary ==="
if [ $ERRORS -eq 0 ]; then
    echo "✓ All tests passed!"
    exit 0
else
    echo "✗ $ERRORS test(s) failed"
    exit 1
fi
