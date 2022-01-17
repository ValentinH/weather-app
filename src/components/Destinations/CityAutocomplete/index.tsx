import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
import axios from 'axios'
import { CityAutocompleteResponse } from '#src/pages/api/city-autocomplete'

type Value = CityAutocompleteResponse['results'][number]

type Props = {
  onSelect: (value: string) => void
}

const CityAutocomplete = ({ onSelect }: Props) => {
  const [value, setValue] = React.useState<Value | null>(null)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState<CityAutocompleteResponse['results']>([])

  const fetchResults = React.useMemo(
    () =>
      throttle(async (input) => {
        const { data } = await axios.get<CityAutocompleteResponse>('/api/city-autocomplete', {
          params: { input },
        })
        return data.results
      }, 200),
    []
  )

  React.useEffect(() => {
    let active = true

    if (inputValue === '') {
      setOptions([])
      return undefined
    }

    fetchResults(inputValue)?.then((results) => {
      if (active) {
        setOptions(results)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetchResults])

  return (
    <Autocomplete
      id="city-autocomplete"
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options)
        setValue(newValue)
        if (newValue) {
          onSelect(newValue.description)
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
      }}
      noOptionsText="Input a city name"
      classes={{}}
      renderInput={(params) => (
        <TextField
          color="primary"
          variant="outlined"
          {...params}
          label="Add a destination"
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting.main_text_matched_substrings
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        )

        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box component={LocationOnIcon} sx={{ color: 'text.secondary', mr: 2 }} />
              </Grid>
              <Grid item xs>
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}

                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}

export default CityAutocomplete
