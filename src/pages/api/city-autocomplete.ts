import { PlacesResult } from '#src/server/dto/places'
import serverConfig from '#src/server/server-config'
import axios from 'axios'
import { NextApiHandler } from 'next'

export type CityAutocompleteResponse = {
  results: PlacesResult['predictions']
}

type ErrorData = { error: string }

const handler: NextApiHandler<CityAutocompleteResponse | ErrorData> = async (req, res) => {
  try {
    const { data } = await axios.get<PlacesResult>(serverConfig.placesApiUrl, {
      params: {
        key: serverConfig.placesApiKey,
        input: req.query.input,
        types: '(cities)',
      },
    })

    res.json({
      results: data.predictions,
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'internal error' })
  }
}

export default handler
