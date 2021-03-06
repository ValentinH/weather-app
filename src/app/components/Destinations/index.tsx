import React from 'react'

import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Typography,
} from '@mui/material'
import CityAutocomplete from './CityAutocomplete'
import { useLocalStorage } from 'usehooks-ts'
import axios from 'axios'
import { WeatherAtLocationResponse } from '#src/pages/api/weather-at-location'
import { DestinationItem } from '#src/app/types/destination'

const Destinations = () => {
  const [destinations, setDestinations] = useLocalStorage<DestinationItem[]>(
    'favorite-destinations',
    []
  )
  const [isAdding, setIsAdding] = React.useState(false)

  const onAddDestination = async (city: string) => {
    const alreadyExists = destinations.find((d) => d.name === city)
    if (alreadyExists) {
      return
    }
    setIsAdding(true)

    try {
      const { data } = await axios.get<WeatherAtLocationResponse>('/api/weather-at-location', {
        params: { location: city },
      })
      const newDestination = {
        name: city,
        temperature: data.temperature,
      }
      setDestinations([...destinations, newDestination])
    } catch (e) {
      console.error(e)
    } finally {
      setIsAdding(false)
    }
  }

  const onDelete = (destination: string) => {
    setDestinations(destinations.filter((d) => d.name !== destination))
  }

  return (
    <Card sx={{ width: '100%', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" textAlign="center" paragraph>
          Your favorite destinations
        </Typography>
        <CityAutocomplete onSelect={onAddDestination} />
        <List>
          {destinations.map((destination) => (
            <ListItem
              key={destination.name}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(destination.name)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={destination.name}
                secondary={`temperature: ${destination.temperature}??C`}
              />
            </ListItem>
          ))}
        </List>
        {destinations.length === 0 && !isAdding && (
          <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
            No favorite destination yet ????
          </Typography>
        )}
        {isAdding && <Skeleton variant="rectangular" height={60} />}
      </CardContent>
    </Card>
  )
}

export default Destinations
