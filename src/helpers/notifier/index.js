/* global Notification */
const invariant = require('invariant')
const { MERGE, CONVERT } = require('../constants')
const text = require('./text.json')

let imgPath

module.exports = {
  init,
  notify
}

function init (appPath) {
  imgPath = `${appPath}/img`
}

function notify ({ didSucceed, operation }) {
  invariant([MERGE, CONVERT].includes(operation), 'Invalid notification operation')

  const { title, body, icon } = genInfo(didSucceed, operation)

  const n = new Notification(title, {
    body,
    icon
  })

  return n
}

function genInfo (didSucceed, operation) {
  const index = getIndex()
  const operationText = operation === MERGE ? 'Merge' : 'Conversion'

  if (didSucceed) {
    return {
      title: `${operationText} complete!`,
      body: text.success[index],
      icon: `${imgPath}/success.png`
    }
  }

  return {
    title: `Oh no! ${operationText} failed.`,
    body: text.failure[index],
    icon: `${imgPath}/failure.png`
  }
}

function getIndex () {
  const rnd = Math.random()
  return Math.floor(rnd * text.messageCount)
}
