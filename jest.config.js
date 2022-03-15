/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const path = require('path')
module.exports = {
  preset: 'ts-jest',
  testEnvironment :'jsdom',
  transform: {
      '\\.m?jsx?$': 
          'babel-jest'
      ,
      '\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: [
      // for cross platform
      `node_modules\\${path.sep}(?!(konva))`
  ]
}