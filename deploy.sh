#!/bin/bash
set -e

echo "🚀 Deploying Menyum to GitHub Pages..."
echo ""

# Check if git remote exists
if ! git remote | grep -q origin; then
  echo "📡 Adding GitHub remote..."
  git remote add origin https://github.com/dylbow/menyum.git
fi

# Stage all changes
echo "📦 Staging changes..."
git add -A

# Commit
echo "💾 Committing..."
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"

# Push to main
echo "⬆️  Pushing to GitHub..."
git push -u origin main --force

echo ""
echo "✅ Deployed!"
echo "🌐 Site will be live at: https://dylbow.github.io/menyum/"
echo ""
echo "⚙️  Configure GitHub Pages:"
echo "   1. Go to https://github.com/dylbow/menyum/settings/pages"
echo "   2. Source: Deploy from a branch"
echo "   3. Branch: main / (root)"
echo "   4. Save"
