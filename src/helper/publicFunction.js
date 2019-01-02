const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .then(data => res.json(data))
    .catch(next)
}

module.exports = asyncMiddleware
