# RentelCover UI Automation with CI/CD integrated

## Overview
This project is designed to automate end-to-end testing for a web application using Typescript and Playwright. In addition, CI/CD is integrated with github actions and Jenkins

## Assumptions Made
users can select any country for renting, select any date in future, select living country and vehicle type, change living country and vehivle type

## Issues Found
I try to locate some element by getByTestId method, but not working as the tag is data-test-id, not data-testid
  
## Technologies Used
- **Programming Language**: Typescript
- **Framework**: Playwright
- **Dependency Management**: npm

**Set up local project**
```shell
$ git clone https://github.com/willzhang-lb/rentCover.git
$ cd rentCover
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

