<script lang="ts">
	// Helper function to generate an embeddable Google Drive link
	const getDriveEmbedUrl = (fileId: string) => `https://drive.google.com/file/d/${fileId}/preview`;

	// Helper function to generate a lightweight Google Drive thumbnail URL
	const getDriveThumbnailUrl = (fileId: string, size: number = 640) =>
		`https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;

	// Transition import for modal
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	type Project = {
		id: string;
		title: string;
		category: string;
		image?: string;
		videoId?: string;
		group?: string;
	};

	type Category = {
		title: string;
		description: string;
		type: string;
		items: Project[];
	};

	import projectsData from '$lib/data/projects.json';
	const categories: Category[] = projectsData;

	// Modal State
	let isModalOpen = false;
	let activeCategoryFilter: string | null = null;
	
	// Video Popup State
	let activeVideoProject: (Project & { type: string }) | null = null;

	// Image Slider State
	let activeImageList: Project[] = [];
	let activeImageIndex = 0;

	// Track loaded images for fade-in effect (plain object for reliable Svelte reactivity)
	let loadedImages: Record<string, boolean> = {};

	function onImageLoad(id: string) {
		loadedImages[id] = true;
		loadedImages = loadedImages; // trigger reactivity
	}

	// IntersectionObserver-based lazy loading action for modal items
	function lazyLoad(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						node.classList.add('is-visible');
						// Find any images with data-src and swap to real src
						const lazySources = node.querySelectorAll('[data-src]');
						lazySources.forEach((el) => {
							const dataSrc = el.getAttribute('data-src');
							if (dataSrc) {
								el.setAttribute('src', dataSrc);
								el.removeAttribute('data-src');
							}
						});
						observer.unobserve(node);
					}
				});
			},
			{ rootMargin: '200px 0px', threshold: 0.01 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	function openModal(categoryTitle?: string) {
		activeCategoryFilter = categoryTitle || null;
		isModalOpen = true;
		if (typeof window !== 'undefined') {
			document.body.style.overflow = 'hidden'; // Stop background scrolling
		}
	}

	function closeModal() {
		isModalOpen = false;
		if (typeof window !== 'undefined' && !activeVideoProject && activeImageList.length === 0) {
			document.body.style.overflow = ''; // Restore background scrolling
		}
	}

	function openVideoModal(project: Project, type: string) {
		activeVideoProject = { ...project, type };
		if (typeof window !== 'undefined') {
			document.body.style.overflow = 'hidden'; // Lock background
		}
	}

	function closeVideoModal() {
		activeVideoProject = null;
		// Only restore overflow if the main archive modal or image modal isn't open
		if (typeof window !== 'undefined' && !isModalOpen && activeImageList.length === 0) {
			document.body.style.overflow = ''; 
		}
	}

	function openImageModal(project: Project, projectList: Project[]) {
		activeImageList = projectList;
		const index = projectList.findIndex(p => p.id === project.id);
		activeImageIndex = index !== -1 ? index : 0;
		if (typeof window !== 'undefined') {
			document.body.style.overflow = 'hidden'; // Lock background
		}
	}

	function closeImageModal() {
		activeImageList = [];
		if (typeof window !== 'undefined' && !isModalOpen && !activeVideoProject) {
			document.body.style.overflow = ''; 
		}
	}

	function nextImage() {
		if (activeImageList.length > 0) {
			activeImageIndex = (activeImageIndex + 1) % activeImageList.length;
		}
	}

	function prevImage() {
		if (activeImageList.length > 0) {
			activeImageIndex = (activeImageIndex - 1 + activeImageList.length) % activeImageList.length;
		}
	}

	function getGroupedProjects(items: Project[]) {
		const groups: Record<string, Project[]> = {};
		for (const item of items) {
			const groupName = item.group || 'Ungrouped';
			if (!groups[groupName]) {
				groups[groupName] = [];
			}
			groups[groupName].push(item);
		}
		return groups;
	}

	// Helper to get a smaller thumbnail version of a Drive image URL for grid views
	function getSmallThumbnail(url: string | undefined): string {
		if (!url) return '';
		// Replace sz=w1080 with sz=w400 for grid thumbnails
		return url.replace(/sz=w\d+/, 'sz=w400');
	}

	// Helper to get the full-res version of a Drive image URL for the slider
	function getFullResImage(url: string | undefined): string {
		if (!url) return '';
		// Upgrade to w1600 for slider popup
		return url.replace(/sz=w\d+/, 'sz=w1600');
	}
</script>

<section id="work" class="bg-surface px-12 py-32">
	<div class="mx-auto max-w-screen-2xl">
		<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-8">
			<div class="lg:col-span-4">
				<div class="sticky top-32">
					<h2 class="font-headline mb-6 text-5xl font-black tracking-tighter uppercase">
						SELECTED<br />WORK
					</h2>
					<p class="font-body mb-8 max-w-xs text-sm leading-relaxed text-neutral-500">
						A curation of high-impact visual experiments and commercial collaborations spanning
						across photography, graphics, and video production.
					</p>
					
					<!-- Global Show More Button -->
					<button 
						on:click={() => openModal()}
						class="group flex cursor-pointer items-center space-x-3 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:text-neutral-400"
					>
						<span>VIEW ALL ARCHIVES</span>
						<span class="material-symbols-outlined transition-transform group-hover:translate-x-1">
							arrow_right_alt
						</span>
					</button>
				</div>
			</div>

			<div class="flex flex-col gap-24 lg:col-span-8">
				{#each categories as category (category.title)}
					<div>
						<div class="border-outline-variant/30 mb-8 border-b pb-6 flex justify-between items-end">
							<div>
								<h3 class="font-headline text-3xl font-bold tracking-tighter text-white uppercase">
									{category.title}
								</h3>
								<p class="font-label mt-2 text-xs tracking-widest text-neutral-500 uppercase">
									{category.description}
								</p>
							</div>
						</div>

						<div class="bg-outline-variant/20 grid grid-cols-1 gap-px md:grid-cols-2">
							<!-- ONLY slicing the first 2 items for homepage -->
							{#each category.items.slice(0, 2) as project (project.id)}
								<div class="bg-surface group relative flex flex-col overflow-hidden {
									category.type === 'video-landscape' ? 'aspect-video' : 
									(category.type === 'video-portrait' || category.type === 'design-story') ? 'aspect-9/16' : 'aspect-4/5'
								}">
									
									{#if category.type.startsWith('video')}
										<!-- Custom play icon overlay for animations -->
										<div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
											<span class="material-symbols-outlined text-6xl text-white opacity-80 backdrop-blur-sm">
												play_circle
											</span>
										</div>

										<!-- Click catcher to open video modal -->
										<button 
											class="absolute inset-0 z-30 cursor-pointer border-none bg-transparent outline-none focus:ring-0" 
											on:click={() => openVideoModal(project, category.type)} 
											aria-label="Play {project.title}"></button>
										
										<!-- Lightweight thumbnail preview instead of heavy iframe -->
										<div class="lazy-img-wrapper h-full w-full">
											{#if !loadedImages[project.id]}
												<div class="skeleton-loader absolute inset-0"></div>
											{/if}
											<img
												referrerpolicy="no-referrer"
												src={getDriveThumbnailUrl(project.videoId || '', 640)}
												alt={project.title}
												on:load={() => onImageLoad(project.id)}
												class="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 {loadedImages[project.id] ? 'opacity-100' : 'opacity-0'}"
											/>
										</div>
									{:else}
										<!-- Click catcher to open image modal using the active slice array context -->
										<button 
											class="absolute inset-0 z-30 cursor-pointer border-none bg-transparent outline-none focus:ring-0" 
											on:click={() => openImageModal(project, category.items.slice(0, 2))} 
											aria-label="View {project.title}"></button>

										<!-- Render Image for Design -->
										<div class="lazy-img-wrapper h-full w-full">
											{#if !loadedImages[project.id]}
												<div class="skeleton-loader absolute inset-0"></div>
											{/if}
											<img
												referrerpolicy="no-referrer"
												loading="lazy"
												src={project.image}
												alt={project.title}
												on:load={() => onImageLoad(project.id)}
												class="h-full w-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 {loadedImages[project.id] ? '' : '!opacity-0'}"
											/>
										</div>
									{/if}
									
									<!-- Info overlay -->
									<div class="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-linear-to-t {category.type.startsWith('video') ? 'from-black/80 via-transparent to-black/40' : 'from-black/90 via-transparent to-black/30'}">
										<div class="flex items-start justify-between">
											<span class="font-label text-[10px] tracking-widest text-white/80">
												PROJECT {project.id}
											</span>
											{#if !category.type.startsWith('video')}
												<span class="material-symbols-outlined text-white opacity-0 transition-opacity group-hover:opacity-100">
													north_east
												</span>
											{/if}
										</div>
										<div>
											<h4 class="font-headline mb-1 text-xl font-bold text-white">
												{project.title}
											</h4>
											<span class="font-label text-[10px] text-neutral-300">
												{project.category}
											</span>
										</div>
									</div>
								</div>
							{/each}
						</div>

						<!-- Show More Button per category -->
						<div class="mt-8 flex justify-center">
							<button 
								on:click={() => openModal(category.title)}
								class="rounded-full border border-neutral-700 px-6 py-2 text-xs font-semibold tracking-widest text-neutral-400 transition-colors hover:bg-white hover:text-black uppercase"
							>
								SEE ALL {category.title} PROJECTS
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- MODAL POPUP -->
{#if isModalOpen}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md md:p-8"
		transition:fade={{ duration: 250 }}
	>
		<!-- Background overlay closer -->
		<div class="absolute inset-0 bg-black/80" on:click={closeModal}></div>

		<!-- Modal Container -->
		<div 
			class="bg-surface relative flex h-full max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
			transition:slide={{ duration: 400, axis: 'y' }}
		>
			<!-- Modal Header -->
			<div class="flex items-center justify-between border-b border-white/10 p-6 md:px-10">
				<div>
					<h3 class="font-headline text-2xl font-black tracking-tighter text-white uppercase">
						{activeCategoryFilter ? `${activeCategoryFilter} ARCHIVE` : 'COMPLETE ARCHIVE'}
					</h3>
					<p class="font-body text-xs text-neutral-500">All extensive experiments & productions</p>
				</div>
				<button 
					on:click={closeModal}
					class="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white"
				>
					<span class="material-symbols-outlined text-white transition-colors group-hover:text-black">
						close
					</span>
				</button>
			</div>

			<!-- Modal Content / Scrollable Area -->
			<div class="flex-grow overflow-y-auto p-6 md:p-10">
				<div class="flex flex-col gap-16">
					{#each (activeCategoryFilter ? categories.filter(c => c.title === activeCategoryFilter) : categories) as category (category.title)}
						<div>
							<div class="mb-6 flex items-center gap-4">
								<h4 class="font-headline text-xl font-bold tracking-tight text-white uppercase">
									{category.title}
								</h4>
								<div class="h-px grow bg-white/10"></div>
							</div>

							<!-- conditional rendering for grouped view (Instagram story) or standard view -->
							{#if category.type === 'design-story' && category.items.some(p => p.group)}
								<div class="flex flex-col gap-8">
									{#each Object.entries(getGroupedProjects(category.items)) as [groupName, groupItems]}
										<div class="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
											<!-- Group Header (Folder look) -->
											<div class="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
												<div class="flex items-center gap-3">
													<span class="material-symbols-outlined text-neutral-400">folder_open</span>
													<h5 class="font-headline text-lg font-bold text-white sm:text-xl">{groupName}</h5>
												</div>
												<span class="font-label rounded-full bg-white/10 px-3 py-1 text-[10px] tracking-widest text-neutral-300">
													{groupItems.length} ITEM{groupItems.length > 1 ? 'S' : ''}
												</span>
											</div>
											
											<!-- Group Grid -->
											<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
												{#each groupItems as project (project.id)}
													<div use:lazyLoad class="bg-surface group relative flex aspect-9/16 flex-col overflow-hidden rounded-xl border border-white/5">
														<button 
															class="absolute inset-0 z-30 cursor-pointer border-none bg-transparent outline-none focus:ring-0" 
															on:click={() => openImageModal(project, groupItems)} 
															aria-label="View {project.title}"></button>
														
														<!-- Lazy loaded with skeleton -->
														<div class="lazy-img-wrapper h-full w-full">
															{#if !loadedImages['grp-' + project.id]}
																<div class="skeleton-loader absolute inset-0"></div>
															{/if}
															<img
																referrerpolicy="no-referrer"
																data-src={getSmallThumbnail(project.image)}
																alt={project.title}
																on:load={() => onImageLoad('grp-' + project.id)}
																class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 {loadedImages['grp-' + project.id] ? 'opacity-100' : 'opacity-0'}"
															/>
														</div>
														<!-- Simplified info overlay for modal -->
														<div class="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-t from-black/90 to-transparent">
															<h5 class="font-headline text-sm font-bold text-white">{project.title}</h5>
															<span class="font-label text-[9px] text-neutral-400 uppercase">{project.category}</span>
														</div>
													</div>
												{/each}
											</div>
										</div>
									{/each}
								</div>
							{:else}
								<!-- Grid inside modal uses 3 cols for smaller ratio, and masonry-like feel -->
								<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
									{#each category.items as project (project.id)}
										<div use:lazyLoad class="bg-surface group relative flex flex-col overflow-hidden rounded-xl border border-white/5 {
											category.type === 'video-landscape' ? 'aspect-video' : 
											(category.type === 'video-portrait' || category.type === 'design-story') ? 'aspect-9/16' : 'aspect-4/5'
										}">
											{#if category.type.startsWith('video')}
												<div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
													<span class="material-symbols-outlined text-4xl text-white opacity-80">play_circle</span>
												</div>

												<button 
													class="absolute inset-0 z-30 cursor-pointer border-none bg-transparent outline-none focus:ring-0" 
													on:click={() => openVideoModal(project, category.type)} 
													aria-label="Play {project.title}"></button>

												<!-- Lightweight thumbnail instead of heavy iframe -->
												<div class="lazy-img-wrapper h-full w-full">
													{#if !loadedImages['modal-' + project.id]}
														<div class="skeleton-loader absolute inset-0"></div>
													{/if}
													<img
														referrerpolicy="no-referrer"
														data-src={getDriveThumbnailUrl(project.videoId || '', 480)}
														alt={project.title}
														on:load={() => onImageLoad('modal-' + project.id)}
														class="h-full w-full object-cover transition-all duration-500 {loadedImages['modal-' + project.id] ? 'opacity-100' : 'opacity-0'}"
													/>
												</div>
											{:else}
												<button 
													class="absolute inset-0 z-30 cursor-pointer border-none bg-transparent outline-none focus:ring-0" 
													on:click={() => openImageModal(project, category.items)} 
													aria-label="View {project.title}"></button>

												<!-- Lazy loaded image with skeleton -->
												<div class="lazy-img-wrapper h-full w-full">
													{#if !loadedImages['modal-' + project.id]}
														<div class="skeleton-loader absolute inset-0"></div>
													{/if}
													<img
														referrerpolicy="no-referrer"
														data-src={getSmallThumbnail(project.image)}
														alt={project.title}
														on:load={() => onImageLoad('modal-' + project.id)}
														class="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 {loadedImages['modal-' + project.id] ? 'opacity-100' : 'opacity-0'}"
													/>
												</div>
											{/if}
											
											<!-- Simplified info overlay for modal -->
											<div class="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-t from-black/90 to-transparent">
												<h5 class="font-headline text-lg font-bold text-white">{project.title}</h5>
												<span class="font-label text-[9px] text-neutral-400 uppercase">{project.category}</span>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- INDIVIDUAL VIDEO PLAYER POPUP -->
{#if activeVideoProject}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="fixed inset-0 z-[150] flex items-center justify-center p-4 backdrop-blur-xl md:p-8"
		transition:fade={{ duration: 250 }}
	>
		<!-- Background overlay closer -->
		<div class="absolute inset-0 bg-black/95" on:click={closeVideoModal}></div>

		<!-- General Close Button top right of everything -->
		<button 
			on:click={closeVideoModal}
			class="absolute right-4 top-4 z-[160] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/30 border border-white/20 hover:scale-105 md:right-8 md:top-8"
		>
			<span class="material-symbols-outlined text-[24px]">close</span>
		</button>

		<!-- Video Container -->
		<div 
			class="relative flex w-full flex-col overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] {
				activeVideoProject.type === 'video-portrait' ? 'max-w-sm aspect-9/16' : 'max-w-5xl aspect-video'
			}"
			transition:slide={{ duration: 400, axis: 'y' }}
		>
			<!-- The auto-playing iframe wrapper -->
			<div class="h-full w-full bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden">
				<iframe
					src={getDriveEmbedUrl(activeVideoProject.videoId || '')}
					title={activeVideoProject.title}
					class="h-full w-full object-cover"
					frameborder="0"
					allow="autoplay; encrypted-media"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>
{/if}

<!-- IMAGE SLIDER POPUP -->
{#if activeImageList.length > 0}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div 
		class="fixed inset-0 z-[150] flex items-center justify-center p-4 backdrop-blur-xl md:p-8"
		transition:fade={{ duration: 250 }}
	>
		<div class="absolute inset-0 bg-black/95" on:click={closeImageModal}></div>

		<!-- Close Button Top Right -->
		<button 
			on:click={closeImageModal}
			class="absolute right-4 top-4 z-[160] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/30 border border-white/20 hover:scale-105 md:right-8 md:top-8"
		>
			<span class="material-symbols-outlined text-[24px]">close</span>
		</button>

		<!-- Slider Container -->
		<div class="relative flex w-full max-w-5xl items-center justify-center pointer-events-none">
			<!-- Previous arrow button if we have multiple items -->
			{#if activeImageList.length > 1}
				<button 
					on:click|stopPropagation={prevImage} 
					class="pointer-events-auto absolute left-0 z-[160] flex h-12 w-12 md:h-16 md:w-16 -translate-x-2 md:-translate-x-8 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-md hover:bg-white/20 transition-all border border-white/10 hover:scale-110"
				>
					<span class="material-symbols-outlined text-3xl">chevron_left</span>
				</button>
			{/if}

			<!-- Image Display -->
			<div class="pointer-events-auto relative flex max-h-[85vh] flex-col items-center">
				{#key activeImageIndex}
					<img 
						referrerpolicy="no-referrer"
						src={getFullResImage(activeImageList[activeImageIndex].image)} 
						alt={activeImageList[activeImageIndex].title}
						class="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
						in:fade={{ duration: 200 }}
					/>
				{/key}
				
				<!-- Counter bubble (e.g. "1 / 4") -->
				{#if activeImageList.length > 1}
					<div class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 backdrop-blur-md">
						<span class="text-xs font-bold tracking-widest text-white">{activeImageIndex + 1} / {activeImageList.length}</span>
					</div>
				{/if}
			</div>

			<!-- Next arrow button if we have multiple items -->
			{#if activeImageList.length > 1}
				<button 
					on:click|stopPropagation={nextImage} 
					class="pointer-events-auto absolute right-0 z-[160] flex h-12 w-12 md:h-16 md:w-16 translate-x-2 md:translate-x-8 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-md hover:bg-white/20 transition-all border border-white/10 hover:scale-110"
				>
					<span class="material-symbols-outlined text-3xl">chevron_right</span>
				</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	/* Skeleton loading animation */
	.skeleton-loader {
		background: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.03) 0%,
			rgba(255, 255, 255, 0.08) 50%,
			rgba(255, 255, 255, 0.03) 100%
		);
		background-size: 200% 100%;
		animation: skeleton-shimmer 1.5s ease-in-out infinite;
	}

	@keyframes skeleton-shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	/* Lazy image wrapper */
	.lazy-img-wrapper {
		position: relative;
		overflow: hidden;
	}

	.lazy-img-wrapper img {
		transition: opacity 0.5s ease;
	}
</style>
