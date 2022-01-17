import * as React from 'react'
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { NoSsr, Skeleton } from '@mui/material'
import axios from 'axios'
import serverConfig from '#src/server/server-config'
import { WeatherResponse } from '#src/server/dto/open-weather'
import CurrentWeather from '#src/app/components/CurrentWeather'
import Destinations from '#src/app/components/Destinations'
import TopDestinations from '#src/app/components/TopDestinations'

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { data } = await axios.get<WeatherResponse>(serverConfig.openWeatherApiUrl, {
    params: {
      appid: serverConfig.openWeatherApiKey,
      q: `${query.city}, ${query.region}, ${query.country}`,
      units: 'metric',
    },
  })
  return {
    props: {
      city: String(query.city),
      temperature: data.main.temp,
      description: data.weather[0]?.main || 'Unknown',
    },
  }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<Props> = (props) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TopDestinations />
        <CurrentWeather
          city={props.city}
          description={props.description}
          temperature={props.temperature}
        />
        <NoSsr fallback={<Skeleton variant="rectangular" width={600} height={300} />}>
          <Destinations />
        </NoSsr>
      </Box>
    </Container>
  )
}

export default Home
