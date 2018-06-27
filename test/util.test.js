/* global describe, it */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai')
const { replaceSpaceCharacters, getUniqueExtensions } = require('../src/helpers/util')

describe('UTIL', function () {
  describe('replaceSpaceCharacters()', function () {
    it('replace space characters with escaped space', () => {
      const fileName = "This is a bad's file name.png"
      expect(replaceSpaceCharacters(fileName)).to.equal("This\\ is\\ a\\ bad\\'s\\ file\\ name.png")
    })
  })

  describe('getUniqueExtensions', () => {
      it('should return no duplicate file extensions', () => {
          const files = [
              { name:'file-name_1.png' },
              { name:'file-name_2.jpg' },
              { name:'file-name_3.png' },
              { name:'file-name_4.jpg' },
              { name:'file-name_5.JPG' },
              { name:'file-name_6.JPEG' },
              { name:'file-name_7.JPEG' },
              { name:'file-name_7.gif' },
          ]

          expect(getUniqueExtensions(files)).to.deep.equal(['PNG', 'JPG', 'GIF']);
      })
  })
})
