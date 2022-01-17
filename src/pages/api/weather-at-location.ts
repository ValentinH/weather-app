import { WeatherResponse } from '#src/server/dto/open-weather'
import { PlacesResult } from '#src/server/dto/places'
import serverConfig from '#src/server/server-config'
import axios from 'axios'
import { NextApiHandler } from 'next'

export type WeatherAtLocationResponse = {
  temperature: number
}

type ErrorData = { error: string }

const handler: NextApiHandler<WeatherAtLocationResponse | ErrorData> = async (req, res) => {
  try {
    const { data } = await axios.get<WeatherResponse>(serverConfig.openWeatherApiUrl, {
      params: {
        appid: serverConfig.openWeatherApiKey,
        q: req.query.location,
        units: 'metric',
      },
    })

    res.json({
      temperature: data.main.temp,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'internal error' })
  }
}

export default handler
