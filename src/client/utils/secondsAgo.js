export default function secondsAgo(date) {
    return (Date.now() - date) / 1000
}
