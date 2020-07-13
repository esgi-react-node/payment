start:
	docker-compose up -d db server adminer mongo
stop:
	docker-compose stop
fixture:
	docker-compose exec server node fixtures/fixture.js