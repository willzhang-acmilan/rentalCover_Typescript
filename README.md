# RentelCover UI Automation with CI/CD integrated

## Overview
This project is designed to automate end-to-end testing for a web application using Typescript and Playwright. In addition, CI/CD is integrated with github actions and Jenkins

## Assumptions Made
1. users can select any country for renting, select any date in future, select living country and vehicle type, change living country and vehicle type in home page,
2. users can send quote, change booking date, change currency, fill in personal detail, and fill in payment method detail in quote page
  
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
npx playwright test --headed
```

**Project Structure**
```

├───.github
│   └───workflows
├───pages
├───tests
├───types

