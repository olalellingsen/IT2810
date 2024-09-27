import { expect, test } from 'vitest'
import getWeatherIcon from '../utils/getWeatherIcon'

// import weather icons
import rain from '../assets/rain.svg'
import sun from '../assets/sun.svg'
import cloud from '../assets/cloud.svg'
import sunCloud from '../assets/sunCloud.svg'

test('gets correct weather Icon for sunCloud', () => {
  expect(getWeatherIcon(0.4, 60)).toBe(sunCloud)
})

test('gets correct weather Icon for cloud', () => {
  expect(getWeatherIcon(0, 90)).toBe(cloud)
})

test('gets correct weather Icon for sun', () => {
  expect(getWeatherIcon(0.5, 10)).toBe(sun)
})

test('gets correct weather Icon for rain', () => {
  expect(getWeatherIcon(10, 60)).toBe(rain)
})
