def call(Map config) {
    script {
        try {
            echo "🔧 Running Lint Checks..."
            
            dir(config.servicePath) {
                if (config.servicePath == 'backend') {
                    // ESLint for Node.js backend
                    sh '''
                        echo "Installing ESLint..."
                        npm install --save-dev eslint eslint-config-standard eslint-plugin-node
                        
                        # Create ESLint config if not exists
                        if [ ! -f ".eslintrc.js" ]; then
                            cat > .eslintrc.js << 'EOF'
module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error'
  }
};
EOF
                        fi
                        
                        echo "Running ESLint..."
                        npx eslint src/ --format json --output-file ../reports/eslint-report.json || true
                        npx eslint src/ --format table > ../reports/eslint-report.txt || true
                        
                        # Check for errors
                        ERROR_COUNT=$(cat ../reports/eslint-report.json | jq '[.[] | .errorCount] | add // 0')
                        echo "ESLint errors: $ERROR_COUNT"
                        
                        if [ "$ERROR_COUNT" -gt "10" ]; then
                            echo "❌ Too many ESLint errors found"
                            exit 1
                        fi
                    '''
                    
                } else if (config.servicePath == 'frontend') {
                    // TSLint/ESLint for Angular frontend
                    sh '''
                        echo "Installing Angular ESLint..."
                        npm install --save-dev @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/schematics @angular-eslint/template-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
                        
                        # Create ESLint config if not exists
                        if [ ! -f ".eslintrc.json" ]; then
                            cat > .eslintrc.json << 'EOF'
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "@typescript-eslint/recommended",
        "@angular-eslint/recommended",
        "@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ]
      }
    },
    {
      "files": ["*.html"],
      "extends": ["@angular-eslint/template/recommended"],
      "rules": {}
    }
  ]
}
EOF
                        fi
                        
                        echo "Running ESLint..."
                        npx eslint src/ --ext .ts,.html --format json --output-file ../reports/eslint-report.json || true
                        npx eslint src/ --ext .ts,.html --format table > ../reports/eslint-report.txt || true
                        
                        # Check for errors
                        ERROR_COUNT=$(cat ../reports/eslint-report.json | jq '[.[] | .errorCount] | add // 0')
                        echo "ESLint errors: $ERROR_COUNT"
                        
                        if [ "$ERROR_COUNT" -gt "10" ]; then
                            echo "❌ Too many ESLint errors found"
                            exit 1
                        fi
                    '''
                }
            }
            
            echo "✅ Lint checks completed successfully"
            
        } catch (Exception e) {
            echo "❌ Lint checks failed: ${e.getMessage()}"
            throw e
        }
    }
}