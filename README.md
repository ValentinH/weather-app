# Weather app

## How to use

To start the app locally:

```sh
yarn install
yarn dev
```

You need to create an `.env` file at the root of the project.
You can copy the values from `.env.default`.

You can get an API key for `OPEN_WEATHER_MAP_API_KEY` here: https://openweathermap.org/price

Your can get an API key for `PLACES_API_KEY` here: https://developers.google.com/maps/documentation/places/web-service/get-api-key

## Future improvements

- store destinations somewhere better than local storage
- periodically refresh the current temperature for the destinations
- add integration tests
