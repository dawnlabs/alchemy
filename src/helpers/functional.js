const pluck = key => obj => obj[key]

const map = f => mappable => mappable.map(f)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

module.exports = {
  pluck,
  map,
  compose
}
