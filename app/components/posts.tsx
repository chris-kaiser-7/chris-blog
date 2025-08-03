import Link from 'next/link'
import { formatDate, getBlogPosts, getProjectPosts } from 'app/utils/posts'

export function ProjectPosts() {
	let allProjects = getProjectPosts()
	return postsMarkup(allProjects, '/projects')
}

export function BlogPosts() {
	let allBlogs = getBlogPosts()
	return postsMarkup(allBlogs, '/blog')
}

function postsMarkup(postsGroup, path) {
	return (
		<div>
			{postsGroup
				.sort((a, b) => {
					if (
						new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
					) {
						return -1
					}
					return 1
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col space-y-1 mb-4"
						href={`${path}/${post.slug}`}
					>
						<div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
							<p className="text-neutral-600 dark:text-neutral-400 w-[150px] shrink-0 tabular-nums">
								{formatDate(post.metadata.publishedAt, false)}
							</p>
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
								{post.metadata.title}
							</p>
						</div>
					</Link>
				))}
		</div>
	)
}
