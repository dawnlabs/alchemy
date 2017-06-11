/* global describe, it */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai')
const { replaceSpaceCharacters } = require('../src/helpers/util')

describe('UTIL', function () {
  describe('replaceSpaceCharacters()', function () {
    it('replace space characters with escaped space', () => {
      const fileName = "This is a bad's file name.png"
      expect(replaceSpaceCharacters(fileName)).to.equal("This\\ is\\ a\\ bad\\'s\\ file\\ name.png")
    })
  })
})
