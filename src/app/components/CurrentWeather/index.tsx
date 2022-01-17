import React from 'react'

import styled from '@emotion/styled'
import { Typography } from '@mui/material'

export const Item = styled('div')({
  color: 'white',
  textAlign: 'center',
})

type Props = {
  city: string
  description: string
  temperature: number
}

const CurrentWeather = ({ city, description, temperature }: Props) => {
  return (
    <Item>
      <Typography variant="h3">{city}</Typography>
      <Typography variant="subtitle1">{description}</Typography>
      <Typography variant="h1">{temperature}°</Typography>
    </Item>
  )
}

export default CurrentWeather
