const chalk = require('chalk');
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);

    this.argument('name', {
      type: String,
      required: false,
      description: 'Project name'
    });

    this.option('git', {
      type: Boolean,
      required: false,
      description: 'Initialize a Git repository',
      alias: 'g',
      default: true
    });
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('courses-md') + ' generator!'
    ));

    const prompts = [];

    if (!this.options.name) {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'name:',
        default: this.determineAppname()
      });
    }

    this.answers = prompts.length ? await this.prompt(prompts) : {};

    this.composeWith(require.resolve('generator-npm-init/app'), {
      name: this.answers.name || this.options.name,
      description: 'Courses written in Markdown',
      author: this._guessAuthor(),
      keywords: ['courses', 'markdown'],
      license: 'MIT',
      private: true,
      scripts: {
        build: 'courses-md build',
        start: 'courses-md'
      },
      'skip-name': true,
      'skip-main': true,
      'skip-repo': true,
      'skip-test': true,
      'skip-version': true
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('gitignore'),
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
      this.templatePath('src/subject/index.css'),
      this.destinationPath('src/subject/index.css')
    );

    this.fs.copy(
      this.templatePath('src/subject/index.js'),
      this.destinationPath('src/subject/index.js')
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
    let message = chalk.yellow('npm install');
    if (this._isBooleanOption('git', 'g', true, true)) {
      message += ` && ${chalk.yellow('git init')} && ${chalk.yellow('git commit -m "Initial commit"')}`;
    }

    this.log(`\n${message}`);

    this.npmInstall([ 'courses-md' ], { save: true });

    if (this._isBooleanOption('git', 'g', true, true)) {
      this.composeWith(require.resolve('generator-git-init'), {
        commit: 'Initial commit'
      });
    }
  }

  end() {
    this.log(`\n${chalk.yellow('npm start')}`);
    this.spawnCommand('npm', ['start']);
  }

  _guessAuthor() {
    const name = this.user.git.name();
    if (!name) {
      return;
    }

    const email = this.user.git.email();
    return email ? `${name} <${email}>` : name;
  }

  _isBooleanOption(name, alias, value, defaultValue) {
    const mainValue = this._toBoolean(this.options[name]);
    const aliasValue = this._toBoolean(this.options[alias]);

    return defaultValue ? mainValue && aliasValue === value : mainValue || aliasValue === value;
  }

  _toBoolean(value) {
    return !!value.toString().match(/^(?:1|y|yes|t|true)$/i);
  }
};
