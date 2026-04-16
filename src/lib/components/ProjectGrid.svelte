<script lang="ts">
	const categories = [
		{
			title: 'PHOTOGRAPHY',
			description: 'Stark contrasts and geometric highlights.',
			items: [
				{
					id: '01',
					title: 'PRISM FLOW',
					category: 'LIGHT REFRACTION',
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuA_ikrrf9c3bqjQvazbu5w2ubq-zL4wApG1yvgKTs3rJwQApM0pQAkhpl-to7mDAISpqsYLoRPTWxRCTLSwaTFDy-vdXj_fuPbqJGHsDVI4mVXrEhiTvb53q3PSk6IosckhkHkmFtJy5-bfYwsrodzMZE-YdVamtyNwA8CTR4h38Kt4wcPVOIXgaLDSG5Yh9Xc8l3Aj3XqWndP5Dm-p9AHKcaAqKkQbEgYOKIBdAyy-7Rh0BYT1rSqHvSXV0T7iI3tZl3Nxhlf706MN'
				},
				{
					id: '02',
					title: 'NEO ARCHITECTURE',
					category: 'STRUCTURAL',
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuCuEwFSOiZMYpzE-_ZTU1_CR1zh7cmwMpCZKSUcbZGiSfne1_7dyv8JuiUK6W93JYBA_LsSihtXJsTK5JhRLMPDgX5QxJPYFNlUhO91s3UBdHMpUxLI95YMyqoVSZ5EoSkh4PAkQ-9pMU-a_tjOsWHcsU9_2iSAY3-mGnlnusvtQZtikXTO221WjFcUasn242RXHrpFOCWBVBtGpoki1_p8T6e2UYVRsocS3SIEkvPfztFMHWmhjZVsINbeQGWJOAhywHTjP1xk50my'
				}
			]
		},
		{
			title: 'DESIGN GRAFIS',
			description: 'High-tension editorial design and visual identity.',
			items: [
				{
					id: '03',
					title: 'VOID ARCHIVE',
					category: 'BRANDING',
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdzwDhN0QPoN6dRSZY92yeIBLKG1piffpiT8hBfBTB3Okz3hpa8_IUTwvBAK8BJt64qz-jHUo-mgOmyY_0iy-PmYkc1-vE5Pvf3gAxIaw30T1NPFykauHc-lLEibceg1UIBl2mGf1y5UgJwHfmKPBZkuui64UwlHnB5VcBwxYPgk-O4NSvQpYCdcW6PxSUAdFAudFZODvl0l19nYQhpizSw8vcNtcEob5NVpU4daiV2fUY60sa5k-L9rQB5fZlXk3LNrXx-2U-sEG'
				},
				{
					id: '04',
					title: 'PORTOFOLIO NAUFAL POSTER',
					category: 'TYPOGRAPHY',
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuBdQKGURQx5DuUxioLcyKl_enjf0U3n8dMnAEU9Z5yfyYagCc2B-4RwDyVVY_rjYfsLYxZ8hFeOLZzHRIqsxhKvRal8kAa8WlLqCeXX418KQJDAIJX8-nhFz-Q0li2p3yEdYPNXLXHcsR2QSGXdvcww8rYswooMglxfBRmPNrNH-UH5IIQ9gdVxmz1dE-yfVW1ecrU2owu5To4MklcvVJ0qt3LzB-hSv9UMuigVOCGWVOLjOWCZCrUfIjyLElVpee-2yOu9GDWP44tm'
				}
			]
		},
		{
			title: 'VIDEO EDITING',
			description: 'Dynamic cuts optimized for multi-platform engagement.',
			items: [
				{
					id: '05',
					title: 'INSTAGRAM REELS',
					category: 'FAST-PACED',
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuBdQKGURQx5DuUxioLcyKl_enjf0U3n8dMnAEU9Z5yfyYagCc2B-4RwDyVVY_rjYfsLYxZ8hFeOLZzHRIqsxhKvRal8kAa8WlLqCeXX418KQJDAIJX8-nhFz-Q0li2p3yEdYPNXLXHcsR2QSGXdvcww8rYswooMglxfBRmPNrNH-UH5IIQ9gdVxmz1dE-yfVW1ecrU2owu5To4MklcvVJ0qt3LzB-hSv9UMuigVOCGWVOLjOWCZCrUfIjyLElVpee-2yOu9GDWP44tm'
				},
				{
					id: '06',
					title: 'TIKTOK TRENDS',
					category: 'KINETIC',
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuCuEwFSOiZMYpzE-_ZTU1_CR1zh7cmwMpCZKSUcbZGiSfne1_7dyv8JuiUK6W93JYBA_LsSihtXJsTK5JhRLMPDgX5QxJPYFNlUhO91s3UBdHMpUxLI95YMyqoVSZ5EoSkh4PAkQ-9pMU-a_tjOsWHcsU9_2iSAY3-mGnlnusvtQZtikXTO221WjFcUasn242RXHrpFOCWBVBtGpoki1_p8T6e2UYVRsocS3SIEkvPfztFMHWmhjZVsINbeQGWJOAhywHTjP1xk50my'
				},
				{
					id: '07',
					title: 'YOUTUBE CINEMATICS',
					category: 'VLOG / DOCUMENTARY',
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuBkdzwDhN0QPoN6dRSZY92yeIBLKG1piffpiT8hBfBTB3Okz3hpa8_IUTwvBAK8BJt64qz-jHUo-mgOmyY_0iy-PmYkc1-vE5Pvf3gAxIaw30T1NPFykauHc-lLEibceg1UIBl2mGf1y5UgJwHfmKPBZkuui64UwlHnB5VcBwxYPgk-O4NSvQpYCdcW6PxSUAdFAudFZODvl0l19nYQhpizSw8vcNtcEob5NVpU4daiV2fUY60sa5k-L9rQB5fZlXk3LNrXx-2U-sEG'
				}
			]
		}
	];
</script>

<section id="work" class="bg-surface px-12 py-32">
	<div class="mx-auto max-w-screen-2xl">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
			<div class="lg:col-span-4">
				<div class="sticky top-32">
					<h2 class="font-headline mb-6 text-5xl font-black tracking-tighter uppercase">
						SELECTED<br />WORK
					</h2>
					<p class="font-body max-w-xs text-sm leading-relaxed text-neutral-500">
						A curation of high-impact visual experiments and commercial collaborations spanning
						across photography, graphics, and video production.
					</p>
				</div>
			</div>

			<div class="flex flex-col gap-24 lg:col-span-8">
				{#each categories as category}
					<div>
						<div class="border-outline-variant/30 mb-8 border-b pb-6">
							<h3 class="font-headline text-3xl font-bold tracking-tighter text-white uppercase">
								{category.title}
							</h3>
							<p class="font-label mt-2 text-xs tracking-widest text-neutral-500 uppercase">
								{category.description}
							</p>
						</div>

						<div class="bg-outline-variant/20 grid grid-cols-1 gap-px md:grid-cols-2">
							{#each category.items as project}
								<div class="bg-surface group relative aspect-[4/5] overflow-hidden">
									<img
										loading="lazy"
										src={project.image}
										alt={project.title}
										class="h-full w-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
									/>
									<div class="absolute inset-0 flex flex-col justify-between p-8">
										<div class="flex items-start justify-between">
											<span class="font-label text-[10px] tracking-widest text-white/60">
												PROJECT {project.id}
											</span>
											<span
												class="material-symbols-outlined text-white opacity-0 transition-opacity group-hover:opacity-100"
											>
												north_east
											</span>
										</div>
										<div>
											<h4 class="font-headline mb-2 text-2xl font-bold text-white">
												{project.title}
											</h4>
											<span class="font-label text-[10px] text-neutral-400">
												{project.category}
											</span>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
