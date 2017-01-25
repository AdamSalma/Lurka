export default ({ url }, res, next) => {
    log.http(url); 
    next()
}
