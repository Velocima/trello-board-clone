docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
docker exec -it kanban_test_api bash -c "npm install && npm run unitTests"