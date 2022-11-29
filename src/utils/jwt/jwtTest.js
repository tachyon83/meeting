const jwt = require('jsonwebtoken')

const token = jwt.sign({ id: 123 }, 'secret', { expiresIn: '1s' })

const decoded = jwt.decode(token, { complete: true })
const decoded2 = jwt.decode(token)
console.log(6, decoded, decoded2)

// const verified = jwt.verify(token, 'secret2')
// console.log(10, verified)

const verified = jwt.verify(token, 'secret')
console.log(10, verified, typeof verified)

setTimeout(() => {
  // console.log(jwt.verify(token, 'secret'))
  try {
    jwt.verify(token, 'secret')
  } catch (e) {
    console.log(18, e, typeof e, Object.keys(e), e.name, e.message, e.expiredAt)
  }
}, 2000)
