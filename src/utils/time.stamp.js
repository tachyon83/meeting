export default (req, res, next) => {
    // console.log(req.headers)
    let currTime = new Date();
    let timeStamp = currTime.getHours() + ':' + currTime.getMinutes();
    console.log(`[TimeStamp] server called at: ${timeStamp}`)
    next()
}