import { DestinationItem } from '#src/app/types/destination'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

type Props = {}

const TopDestinations = ({}: Props) => {
  const [destinations, setDestinations] = useLocalStorage<DestinationItem[]>(
    'favorite-destinations',
    []
  )

  if (destinations.length < 2) {
    return null
  }
  const sortedDestinations = destinations.sort((a, b) => a.temperature - b.temperature)
  const hottest = sortedDestinations[sortedDestinations.length - 1]
  const coldest = sortedDestinations[0]
  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item>
          <Typography color="white">
            🏖 Warmest destination: <b>{hottest.name}</b>
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="white">
            ⛄ Coldest destination: <b>{coldest.name}</b>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TopDestinations
