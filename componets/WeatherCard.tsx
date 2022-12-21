import React, { useState } from 'react'
import { Text, Paper, Group, TextInput, Button } from '@mantine/core';

import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })


type Props = {}

function WeatherCard({ }: Props) {

  const [cityInput, setCityInput] = useState<string>()
  const [weatherData, setWeatherData] = useState<any>({})
  console.log(weatherData);

  /**
   * @url https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
   * @icon http://openweathermap.org/img/wn/10d@2x.png
   * It fetches data from the OpenWeatherMap API, and if the response is not an error, it sets the
   * weather data to the state.
   * @returns The data object is being returned.
   */
  const getWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=metric`)
      const data = await response.json()

      // if (data.cod === '404') throw data
      if (data?.cod === '404' || data?.cod === '400') {
        alert(`${data.cod} : ${data.message}`)
        return
      }
      setWeatherData(data)

    } catch (error) {
      console.log(error);
    } finally {
      setCityInput('')
    }
  }

  return (
    <Paper withBorder p='lg' style={{ maxWidth: '500px' }} >
      <Group position='apart'>
        <Text className={inter.className} size='xl' weight={600}>
          Get The Weather!
        </Text>
      </Group>
      <Group position='apart' mb='md'>
        <Text className={inter.className} size='md'>
          Enter city name, and get the weather below.
        </Text>
      </Group>
      <Group position='apart' mb='md'>
        <TextInput
          className={inter.className}
          size='lg'
          label='City name'
          placeholder='ex: Bangkok'
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
      </Group>
      <Group position='apart'>
        <Button size='md' onClick={getWeatherData} mb='md'>
          Get Weather
        </Button>
      </Group>

      {Object.keys(weatherData).length !== 0 &&
        <>
          <Group position='left'>
            <Text className={inter.className}>
              <strong>{`${weatherData.name}, ${weatherData.sys.country}`}</strong>
            </Text>
          </Group>
          <Group position='left'>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='image' />
            <Text className={inter.className} size='xl' weight={600}>
              {weatherData.main.feels_like} &deg;C
            </Text>

          </Group>
          <Group position='left'>
            <Text className={inter.className} weight={500}>
              Feels like {weatherData.main.feels_like} &deg;C. {weatherData.weather[0].main}, {weatherData.weather[0].description}
            </Text>
          </Group>
        </>
      }
    </Paper>
  )
}

export default WeatherCard