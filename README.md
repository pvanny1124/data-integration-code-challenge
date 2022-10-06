I decided to use kafkajs which is a module that supplies developers with the legwork of setting up consumers/producers, and decided to bootstrap the project using nest.js to easily take advantage of its capabilities to create CRUD endpoints fast using the 'resourse' command via its CLI. And instead of worrying about handling a server with postgres or mysql, I instead went along with using SQLite for the purposes of moving the assignment along. For now, I created a producer service that enables the developer to publish messages to the consumer service that I built and it in turn forwards logs to the console. Every API interaction has its own custom built message that is sent to the consumer service via the topic that I created. For our example, I built CRUD endpoints for a cats entity. For example, upon finding a cat with our Read operation, the API produces a message saying "cat found: cat_name | cat_age | cat_breed" and is immediately logged on the consumer's side. For this example, I named the topic "cats" and is where each message is published to.

To start the server, spin up kafka using the docker compose file provided and run *npm run start* on a different terminal and wait for the consumer service to finish setup (should take a few seconds before you're able to ping the API through postman with the way that I designed the approach). Once the consumer is done starting up, API calls should now work.

Available endpoints:

POST /cats <br />
READ /cats <br />
READ /cats/:id <br />
PATCH /cats/:id <br />
DELETE cats/:id 

Use sample post request with json body: <br />
{ <br />
   &nbsp;   "name": "speeder", <br />
    &nbsp;  "breed": "abcde", <br />
    &nbsp;  "age": 42 <br />
}
