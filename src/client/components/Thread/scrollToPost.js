export default function scrollToPost(thread) {
	const $thread = $(thread);

	$thread.on('click', '.quotelink', function( event ){
		event.stopPropagation()
		const href = event.target.getAttribute('href')
		const $post = $thread.find(href)
		const offset = $post[0].offsetTop

		console.log($thread)
		console.log()
		console.log(`scroll offset is ${offset}`)

		$thread.animate({
			scrollTop: offset
		}, 600);

		$post.addClass('highlight')
		setTimeout(()=>$post.removeClass('highlight'), 2000)
		return false
	})
}