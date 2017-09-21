const chalk = require('chalk');
const Generator = require('yeoman-generator');
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);

    this.option('name', {
      type: String,
      required: false,
      description: 'Project name',
      alias: 'n',
      hide: false
    });

    this.option('git', {
      type: Boolean,
      required: false,
      description: 'Initialize a Git repository',
      default: false
    });
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('courses-md') + ' generator!'
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'name:',
        default: this.options.name || path.basename(process.cwd())
      }
    ];

    this.answers = await this.prompt(prompts);

    this.composeWith(require.resolve('generator-npm-init/app'), {
      name: this.answers.name,
      keywords: ['courses', 'markdown'],
      license: 'MIT',
      'skip-name': true,
      'skip-main': true,
      'skip-test': true,
      scripts: {
        build: 'courses-md build',
        start: 'courses-md'
      }
    });

    if (this.options.git) {
      this.composeWith(require.resolve('generator-git-init'), {
        commit: 'Initial commit'
      });
    }
  }

  writing() {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('config.js'),
      {
        name: JSON.stringify(this.answers.name)
      }
    );

    this.fs.copy(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js')
    );

    this.fs.copy(
      this.templatePath('subjects/courses-md/markdown.svg'),
      this.destinationPath('subjects/courses-md/markdown.svg')
    );

    this.fs.copy(
      this.templatePath('subjects/courses-md/README.md'),
      this.destinationPath('subjects/courses-md/README.md')
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: this.answers.name
      }
    );
  }

  install() {
    this.npmInstall(['courses-md'], {save: true});
  }

  end() {
    this.spawnCommand('npm', ['start']);
  }
};
