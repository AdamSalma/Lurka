export default function  ({ url }, res, next) {
	log.http(url);
    next()
}