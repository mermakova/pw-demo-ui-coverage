## Playwright test automation
Demo framework for UI automation testing with Playwright, Allure and optional test execution in Docker container.

> **Disclaimer**: Application under test includes only UI interface without any backend. This is a sample test framework for demonstration and training purposes, not representing full test coverege of the app under test in any way or form. 

## Features
* Basic test suites covering IoT Dashboard, general app UI elements and Auth pages
* Use of Page Object pattern
* Page Manager as single interface to access PO, used in a way to increase human test readability
* Helper class for pages accomodating common page actions, functions and checks 
* Tag set to group tests by features and priority 
* Allure reporting
* Additional configuration for a basic mobile testing run (iOS)
* Configuration for test run in a docker container with running webserver

### Ngx-Admin Angular 14 application from akveo.com
This is modified and more lightweight version of original application to practice UI Automation with Playwright. App modifications made by Artem Bondar.
The original repo is here: https://github.com/akveo/ngx-admin