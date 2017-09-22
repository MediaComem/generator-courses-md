# Courses MD generator

> [Yeoman][yeoman] generator to bootstrap a [Courses MD][courses-md] repository.

[![npm version](https://badge.fury.io/js/generator-courses-md.svg)](https://badge.fury.io/js/generator-courses-md)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Requirements](#requirements)
- [Usage](#usage)
  - [Arguments](#arguments)
  - [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Requirements

* [Node.js](https://nodejs.org/) 8.x



## Usage

Install [Yeoman](http://yeoman.io) and the generator:

```bash
npm install -g yo generator-courses-md
```

Create a new directory in which to write your courses.
Go into it and run the generator:

```bash
mkdir courses
cd courses
yo courses-md
```

### Arguments

Run the generator with an additional argument to customize your project's name:

```bash
yo courses-md "Awesome Courses"
```

If not specified, the project name defaults to the name of the current working directory.

### Options

* `--git, -g false|true` Whether to initialize a Git repository and create a first commit (defaults to `true`).



[courses-md]: https://github.com/MediaComem/courses-md
[yeoman]: http://yeoman.io
