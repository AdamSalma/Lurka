import Velocity from 'velocity-animate'

export default function scrollToPost(thread) {
	const $thread = $(thread);

	$thread.on('click', '.quotelink', event => {
		event.stopPropagation()
		const href = event.target.getAttribute('href')
		const offset = $thread.find(href)[0].scrollHeight
		console.log($thread)
		console.log($thread.find(href))
		console.log(`scroll offset is ${offset}`)
		Velocity(thread, 'scroll', {
			offset: 100, 
			duration: 1000, 
			easing: "ease-in-out"
		})
		return false
	})
}