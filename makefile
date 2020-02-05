.PHONY: start
start: erase build up ## clean current environment, recreate dependencies and spin up again

.PHONY: stop
stop: ## stop environment
		docker-compose stop

.PHONY: rebuild
rebuild: start ## same as start

.PHONY: erase
erase: ## stop and delete containers, clean volumes.
		docker-compose stop
		docker-compose rm -v -f

.PHONY: build
build: ## build environment and initialize composer and project dependencies
		docker-compose build
		docker-compose run --rm php sh -lc 'xoff;COMPOSER_MEMORY_LIMIT=-1 composer install'

.PHONY: serve
serve: ## build production artifact
		docker-compose exec ionic sh -lc 'ionic serve'

.PHONY: composer-update
composer-update: ## Update project dependencies
		docker-compose run --rm php sh -lc 'xoff;COMPOSER_MEMORY_LIMIT=-1 composer update'

.PHONY: up
up: ## spin up environment
		docker-compose up -d

.PHONY: phpunit
phpunit: ## execute project unit tests
		docker-compose exec php sh -lc "./vendor/bin/phpunit $(conf)"

.PHONY: style
style: ## executes php analizers
		docker-compose run --rm php sh -lc './vendor/bin/phpstan analyse -l 6 -c phpstan.neon src tests'

.PHONY: cs
cs: ## executes php cs fixer
		docker-compose run --rm php sh -lc './vendor/bin/php-cs-fixer --no-interaction --diff -v fix'

.PHONY: cs-check
cs-check: ## executes php cs fixer in dry run mode
		docker-compose run --rm php sh -lc './vendor/bin/php-cs-fixer --no-interaction --dry-run --diff -v fix'

.PHONY: layer
layer: ## Check issues with layers
		docker-compose run --rm php sh -lc 'php bin/deptrac.phar analyze --formatter-graphviz=0'

.PHONY: xon
xon: ## activate xdebug simlink
		docker-compose exec php sh -lc 'xon'

.PHONY: xoff
xoff: ## deactivate xdebug
		docker-compose exec php sh -lc 'xoff'

.PHONY: sh
sh: ## gets inside a container, use 's' variable to select a service. make s=php sh
		docker-compose exec $(s) sh -l

.PHONY: logs
logs: ## look for 's' service logs, make s=php logs
		docker-compose logs -f $(s)

.PHONY: help
help: ## Display this help message
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
