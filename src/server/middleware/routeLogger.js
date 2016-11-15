export default function  ({ url }, res, next) {
	log.http(`Request: ${url}`);
    next()
}