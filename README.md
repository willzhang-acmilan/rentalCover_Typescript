# RentelCover UI Automation with CI/CD integrated

## Overview
This project is designed to automate end-to-end testing for a web application using Typescript and Playwright. In addition, CI/CD is integrated with github actions and Jenkins

  
## Technologies Used
- **Programming Language**: Typescript
- **Framework**: Playwright
- **Dependency Management**: npm


**Set up local project**
```shell
$ git clone https://github.com/willzhang-lb/rentCover.git
$ cd Parabank-typescript
```

**Install dependencies**
```shell
npm ci
```

**Install playwright**
```shell
npx playwright install
```

**Run test**
```shell
npx playwright test
```

**Project Structure**
```

├───.github
│   └───workflows
├───pages
├───tests
