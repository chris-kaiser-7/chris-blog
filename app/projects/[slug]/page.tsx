import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getProjectPosts } from 'app/utils/posts'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
	let posts = getProjectPosts()

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export function generateMetadata({ params }) {
	let post = getProjectPosts().find((post) => post.slug === params.slug)
	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
	} = post.metadata
	let ogImage = image
		? image
		: `${baseUrl}/og?title=${encodeURIComponent(title)}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `${baseUrl}/projects/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

export default function Project({ params }) {
	let post = getProjectPosts().find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `${baseUrl}${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `${baseUrl}/project/${post.slug}`,
						author: {
							'@type': 'Person',
							name: 'My Portfolio',
						},
					}),
				}}
			/>
			<h1 className="title font-semibold text-2xl tracking-tighter">
				{post.metadata.title}
			</h1>
			<a
				className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
				rel="noopener noreferrer"
				target="_blank"
				href={`${post.metadata.github}`}
			>
				<ArrowIcon />
				<p className="ml-2 h-7">view source</p>

			</a>
			<div className="flex justify-between items-center mt-2 mb-8 text-sm">
				<p className="text-sm text-neutral-600 dark:text-neutral-400">
					{formatDate(post.metadata.publishedAt)}
				</p>
			</div>
			<article className="prose">
				<CustomMDX source={post.content} />
			</article>
		</section >
	)
}

function ArrowIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
				fill="currentColor"
			/>
		</svg>
	)
}
