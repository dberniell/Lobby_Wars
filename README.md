# Lobby_Wars

A project with using Symfony 5 as framework MVC and running with php7 and MySQL 8.

## Specs

<a href="https://dberniell.github.io/Lobby_Wars/" target="blank">Specs</a>

## Documentation

[Xdebug configuration](https://github.com/dberniell/Lobby_Wars/blob/master/docs/GetStarted/Xdebug.md)

## Implementations

- [x] Environment in Docker
- [x] MVC
- [x] Rest API
- [x] Front-End Client with Angular, Typescript, Ionic

## Stack

- PHP 7.3
- Angular 8
- Ionic 4

## Project Setup
Initial setup

`make start`

Build Environment

`make build`

Up environment:

`make start`

Execute tests:

`make phpunit`

Static code analysis:

`make style`

Code style fixer:

`make cs`

Code style checker:

`make cs-check`

Enter in php container:

`make s=php sh`

Disable\Enable Xdebug:

`make xoff`

`make xon`

## PHPStorm integration

PHPSTORM has native integration with Docker compose. That's nice but will stop your php container after run the test scenario. That's not nice when using fpm. A solution could be use another container just for that purpose. But I don't want. For that reason I use ssh connection.

IMPORTANT

> ssh in the container it's ONLY for that reason, if you've ssh installed in your production container, you're doing it wrong... 

Use ssh remote connection.
---

Host: 
- Docker: `localhost`

Port: 
 - `2323`

Filesystem mapping:
 - `{PROJECT_PATH}` -> `/app`

## Missing

- Some unit tests
- Tests e2e
- More comments on classes methods
- Offline first

## Start app

1. Access http://localhost:8100
2. Set contracts
3. Start trial!
4. Repeat as many times adding more roles signatures
5. Reload page to empty results