/**
 * File description:
 * Contains a component (useWeatherHook) responsible for fetching the data from the open-meto API.
 *
 * HOW TO GET WEATHER DATA
 * import useWeatherHook from './api_hooks/useWeatherHook';
 * const data = useWeatherHook(location);
 *
 * NOTE:
 * location is a string of the following format "latitude=63.4305&longitude=10.3951"
 * You may want to useState on both the location and the useWeatherHook to update them when changes occur.
 *
 */

import { useQuery } from '@tanstack/react-query'

const useWeatherHook = (location: string) => {
  // This can be changed if we want more weather data
  const url = `https://api.open-meteo.com/v1/forecast?${location}&hourly=temperature_2m,rain,cloudcover`

  const { data, isError, isLoading } = useQuery({
    queryKey: [location],
    queryFn: async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await res.json()
        return data
      } catch (error) {
        throw new Error('Error fetching weather data')
      }
    },
  })

  if (isError) {
    throw new Error('Error fetching weather data')
  }

  return { data, isLoading }
}

export default useWeatherHook
