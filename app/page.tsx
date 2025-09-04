export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">
				My Portfolio
			</h1>
			<p className="mb-4">
				{`My name is Christopher Kaiser and this is where I post my work, opinions, and random stuff. I love Go, NeoVim, Kubernetes, and Nextjs amongst other things. I have 6 years of full-stack experience and love starting new projects. Feel free to look around, use my code on github, or reach out to me.`}
			</p>
			<p className="mb-4">
				{`I am currently open to work. Please reach out to me on `}
				<a href="https://www.linkedin.com/in/chris-a-kaiser/">Linkedin (chris-a-kaiser)</a>
				{` if you are interested in hiring me.`}
			</p>
		</section>
	)
}
