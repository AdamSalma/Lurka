export default function  ({ url }, res, next) {
	console.info("User request:", url);
    next()
}