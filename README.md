# vSAN Bot WebUI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

WebUI Preview:
![WebUI](https://github-vcf.devops.broadcom.net/vcf/vSAN-Bot-WebUI/blob/main/webUI.png)

## Node.js version demand

Node.js version v16.20.2
Recommend to use `nvm` to exchange your local node.js version
```
export https_proxy=proxy.vmware.com:3128

brew install nvm
source $(brew --prefix nvm)/nvm.sh
export NVM_DIR=~/.nvm

nvm install 16.20.2 
nvm use 16.20.2
```

If you hit the issue below, please run command `npm install -g @angular/cli@16.2.10`
```
# ng --version
Node.js version v16.20.2 detected.
The Angular CLI requires a minimum Node.js version of v18.19.

Please update your Node.js version or visit https://nodejs.org/ for additional instructions.
```

## Development server

Run `ng build` to build dev server.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/webpack-dev-server/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Or run `ng g c component-name`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
