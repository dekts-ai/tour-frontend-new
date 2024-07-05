# vue-nativeboyproject

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Configure env
Add the correct env vars to your project, ask and admin for details
``` cp .env.example ./.env  ```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Running end-to-end tests
* This application uses [Playwright](https://playwright.dev/docs/intro) to run e2e tests,
* Install [Playwright](https://playwright.dev/docs/intro) browsers via 'npx playwright install'
* run tests: 
    *  ``` npm run e2e ```

### Other useful several commands:
* Run the end-to-end tests.
    * ``` npx playwright test ```
* Start the interactive UI mode.
    * ``` npx playwright test --ui ```
* Run the tests only on Desktop Chrome.
  * ``` npx playwright test --project=chromium ```
* Run the tests in a specific file.
    * ``` npx playwright test example ```
* Runs the tests in debug mode.
    * ``` npx playwright test --debug ```
* Auto generate tests with Codegen.
    * ``` npx playwright codegen ```
* Run Default e2e:
    * ``` npx playwright test ```
