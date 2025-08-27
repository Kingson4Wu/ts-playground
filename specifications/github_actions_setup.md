# GitHub Actions Setup Guide

This project includes a GitHub Actions workflow that automatically verifies the project on every code commit. To use this workflow:

## Prerequisites

1. Push this repository to GitHub
2. Ensure the repository is public or you have GitHub Actions enabled for private repositories

## Setup Instructions

1. After pushing to GitHub, the workflow will automatically run on:
   - Every push to the `main` branch
   - Every pull request to the `main` branch

2. The workflow includes the following checks:
   - Code formatting verification
   - ESLint code linting
   - TypeScript compilation
   - Test execution
   - TypeScript type checking

## Customizing the Workflow

If you want to modify the workflow:
1. Edit `.github/workflows/ci.yml`
2. The workflow will automatically update on the next push

## Updating the README Badge

The README.md file contains a badge that shows the status of the workflow. After pushing to GitHub, you may need to update the badge URLs to match your actual repository:

1. Replace `your-username` in the badge URL with your actual GitHub username
2. The badge will then correctly show the status of your workflow

## Viewing Workflow Results

You can view the results of the workflow runs:
1. Go to the "Actions" tab in your GitHub repository
2. Click on individual workflow runs to see detailed logs
3. The badge in the README will show the status of the latest run