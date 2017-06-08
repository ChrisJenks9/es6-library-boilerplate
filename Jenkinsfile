pipeline {
  agent any
  triggers { pollSCM('H/2 * * * *') }
  parameters {
    booleanParam(name: 'DO_DEPLOY_STAGES', defaultValue: false, description: 'If checked the assets will be deployed to their configured destinations')
  }
  stages {
    stage('Setup') {
      steps {
        sshagent(['jenkins-csl-key']) {
          checkout scm
          sh 'npm prune'
          sh 'npm install'
        }
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Acceptance Test') {
      environment {
        EXPRESS_DOMAIN = '172.17.77.1'
      }
      steps {
        sh 'npm run acceptance-test'
      }
    }
    stage('Deploy To CDM') {
      when {
        expression { params.DO_DEPLOY_STAGES == true }
      }
      environment {
        CDM_API_USERNAME = credentials('CDM_API_USERNAME')
        CDM_API_PASSWORD = credentials('CDM_API_PASSWORD')
      }
      steps {
        sh 'npm run deploy-cdm'
        echo 'Deploy To CDM'
      }
    }
    stage('Deploy To NPM') {
      when {
        expression { params.DO_DEPLOY_STAGES == true }
      }
      steps {
        sh 'npm publish'
        echo 'Deploy To NPM'
      }
    }
    stage('Sync docs on Confluence') {
      when {
        expression { params.DO_DEPLOY_STAGES == true }
      }
      environment {
        CSL_CONFLUENCE_USERNAME = credentials('csl-confluence-username')
        CSL_CONFLUENCE_PASSWORD = credentials('csl-confluence-password')
      }
      steps {
        echo 'Syncing CHANGELOG to Confluence'
        sh 'sed -i -e \'s/\\[-CONFLUENCE_USERNAME-\\]/\'"$CSL_CONFLUENCE_USERNAME"\'/g\' .md2confluence-rc'
        sh 'sed -i -e \'s/\\[-CONFLUENCE_PASSWORD-\\]/\'"$CSL_CONFLUENCE_PASSWORD"\'/g\' .md2confluence-rc'
        sh 'npm run pushdoc'
        sh 'git checkout .md2confluence-rc'
      }
    }
    stage('Cleanup') {
      steps {
        sh 'rm node_modules -rf'
      }
    }
  }
  post {
    success {
      slackSend color: 'good', message: "✓ ${env.JOB_NAME} build succeeded (<${env.BUILD_URL}|Open>)"
    }
    failure {
      slackSend color: 'warning', message: "✖ ${env.JOB_NAME} build failed (<${env.BUILD_URL}|Open>)"
    }
  }
}
