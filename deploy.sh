#!/bin/bash
# Deploy script for GitHub Pages (branch-based deployment)
# This builds the Next.js app and copies output to root for gh-pages

set -e

echo "📦 Building Next.js app..."
npm run build

echo "🗑️ Cleaning old build files from root..."
# Remove old static files but keep source files
rm -rf _next 404 404.html _not-found

echo "📋 Copying build output to root..."
cp -r out/* .

echo "🔗 Ensuring CNAME is present..."
echo "harsh.software" > CNAME

echo "✅ Ready to commit and push!"
echo ""
echo "Run the following commands:"
echo "  git add ."
echo "  git commit -m 'Deploy: $(date +%Y-%m-%d)'"
echo "  git push origin gh-pages"
