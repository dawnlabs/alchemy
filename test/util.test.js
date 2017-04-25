/* global describe, it */
/* eslint-disable prefer-arrow-callback */

const { expect } = require('chai')
const { concatFiles, replaceSpaceCharacters } = require('../src/helpers/util')

describe('UTIL', function () {
  describe('concatFiles()', function () {
    it('concats files', () => {
      const files = [
        '/User/test/test.png',
        '/User/test/test.jpg',
      ]
      expect(concatFiles(files)).to.equal('test_test')
    })
    it('truncates long file names', () => {
      const files = [
        '/User/test/testaaaaaaaaaaaaaaaaaa.png',
        '/User/test/test.jpg',
      ]
      expect(concatFiles(files)).to.equal('testaaaaaa_test')
    })
    it('truncates final output name', () => {
      const files = [
        '/User/test/testaaaaaaaaaaaaaaaaaa.png',
        '/User/test/testaaaaaaaaaaaaaaaaaa.png',
        '/User/test/testaaaaaaaaaaaaaaaaaa.png',
        '/User/test/testaaaaaaaaaaaaaaaaaa.png',
        '/User/test/testaaaaaaaaaaaaaaaaaa.png',
        '/User/test/testaaaaaaaaaaaaaaaaaa.png',
      ]
      expect(concatFiles(files)).to.equal('testaaaaaa_testaaaaaa_testaaaaaa_testaaaaaa_testaa')
    })
  })

  describe('replaceSpaceCharacters()', function () {
    it('replace space characters with escaped space', () => {
      const fileName = 'This is a bad file name.png'
      expect(replaceSpaceCharacters(fileName)).to.equal('This\\ is\\ a\\ bad\\ file\\ name.png')
    })
  })
})
