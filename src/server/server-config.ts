const ensureEnv = (key: string) => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`process.env.${key} is missing`)
  }
  return value
}

const serverConfig = {
  openWeatherApiKey: ensureEnv('OPEN_WEATHER_MAP_API_KEY'),
  openWeatherApiUrl: ensureEnv('OPEN_WEATHER_MAP_API_URL'),
  placesApiKey: ensureEnv('PLACES_API_KEY'),
  placesApiUrl: ensureEnv('PLACES_API_URL'),
}

export default serverConfig
