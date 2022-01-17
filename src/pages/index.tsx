import * as React from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: query,
})

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<Props> = ({ city, region, country }) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Weather app
        </Typography>
        <Typography>
          <b>City:</b> {city}
        </Typography>

        <Typography>
          <b>Region:</b> {region}
        </Typography>
        <Typography>
          {' '}
          <b>Country:</b> {country}
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
