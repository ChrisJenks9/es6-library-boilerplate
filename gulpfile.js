'use strict';

const gulp = require('gulp');
const semver = require('semver');
const ContentDeploy = require('content-deploy');

gulp.task('deploy', function () {
  const version = require('./package.json').version;

  return new ContentDeploy({
    files: {
      sources: ['dist/*.js'],
      copy: {
        'dist/sif-decode.min.js': [
          `es6-libray-boilerplate-${version}.browser.min.js`,
          `es6-libray-boilerplate-${semver(version).major}-latest.browser.min.js`
        ],
      },
      ignore: [
        'dist/es6-libray-boilerplate.browser.min.js',
        'dist/es6-libray-boilerplate.node.min.js'
      ]
    },
    cdm: {
      apiUsername: process.env.CDM_API_USERNAME,
      apiPassword: process.env.CDM_API_PASSWORD,
      commitMessage: `CSDK-0000: publish version ${version}`,
      platforms: [
        {
          type: ContentDeploy.Platform.type.hmof,
          deploymentDescriptorFolderPath: '/deployment_descriptor/hmh/johnb',
          contentPath: '/data/content/tools/common/sdks/es6-libray-boilerplate',
          svnSplitRepository: ContentDeploy.Platform.svnSplitRepository.hmofDefault,
          deploymentEnvs: ['Cert_Review'],
        },
        {
          type: ContentDeploy.Platform.type.tck6,
          deploymentDescriptorFolderPath: '/deployment_descriptor/hmh/johnb',
          contentPath: '/data/content/tools/common/sdks/build/static/es6-libray-boilerplate',
          svnSplitRepository: ContentDeploy.Platform.svnSplitRepository.tck6Default,
          deploymentEnvs: ['Cert_Review'],
        },
        {
          type: ContentDeploy.Platform.type.hmhone,
          deploymentDescriptorFolderPath: '/deployment_descriptor/hmh/johnb',
          contentPath: '/data/content/tools/common/sdks/es6-libray-boilerplate',
          svnSplitRepository: ContentDeploy.Platform.svnSplitRepository.hmofDefault,
          deploymentEnvs: ['Development', 'INT'],
        },
      ],
    },
  }).deploy();
});
