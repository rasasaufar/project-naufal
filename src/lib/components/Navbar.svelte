<script lang="ts">
	import { onMount } from 'svelte';

	let activeSection = 'home';
	let isMenuOpen = false;
	const navItems = [
		{ id: 'home', label: 'HOME' },
		{ id: 'about', label: 'ABOUT' },
		{ id: 'process', label: 'PROCESS' },
		{ id: 'work', label: 'WORK' },
		{ id: 'contact', label: 'CONTACT' }
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{
				// Triggers when 30% of the section is visible
				threshold: 0.3
			}
		);

		navItems.forEach((item) => {
			const el = document.getElementById(item.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});

	function smoothScroll(targetId: string) {
		const target = document.getElementById(targetId);
		if (!target) return;

		const navOffset = window.innerWidth < 768 ? 72 : 0;
		const targetPosition = target.getBoundingClientRect().top + window.scrollY - navOffset;
		const startPosition = window.scrollY;
		const distance = targetPosition - startPosition;
		const duration = 1200; // 1.2s smooth cinematic delay
		let start: number | null = null;

		// custom expoInOut easing function for high tension feel
		function easing(t: number, b: number, c: number, d: number) {
			t /= d / 2;
			if (t < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
			t--;
			return (c / 2) * (-Math.pow(2, -10 * t) + 2) + b;
		}

		function animation(currentTime: number) {
			if (start === null) start = currentTime;
			const timeElapsed = currentTime - start;
			const run = easing(timeElapsed, startPosition, distance, duration);
			window.scrollTo(0, run);

			if (timeElapsed < duration) {
				requestAnimationFrame(animation);
			} else {
				// Final snap to target if slight decimals occur
				window.scrollTo(0, targetPosition);
			}
		}

		requestAnimationFrame(animation);
		activeSection = targetId; // set preemptively
		isMenuOpen = false;
	}

	function getNavClass(itemId: string, currentActive: string) {
		if (currentActive === itemId) {
			return currentActive === 'contact' ? 'border-black text-black' : 'border-white text-white';
		}
		return currentActive === 'contact'
			? 'border-transparent text-neutral-400 hover:text-black'
			: 'border-transparent text-neutral-500 hover:text-white';
	}
</script>

<nav
	class="fixed top-0 z-50 flex w-full max-w-full items-center justify-between backdrop-blur-xl transition-all duration-[800ms] {activeSection ===
	'contact'
		? 'bg-white/80 shadow-sm'
		: 'bg-neutral-950/60'} px-4 py-4 sm:px-6 md:px-8 lg:px-12 lg:py-6"
>
	<button
		on:click={() => smoothScroll('home')}
		class="font-headline max-w-[70vw] cursor-pointer text-left text-lg leading-none font-black tracking-normal uppercase transition-opacity hover:opacity-75 sm:text-xl lg:text-2xl {activeSection ===
		'contact'
			? 'text-black'
			: 'text-white'}"
	>
		PORTOFOLIO NAUFAL
	</button>

	<div class="font-headline hidden gap-12 text-xs font-bold tracking-normal uppercase md:flex">
		{#each navItems as item (item.id)}
			<button
				on:click={() => smoothScroll(item.id)}
				class="cursor-pointer border-b-2 pb-1 transition-all duration-[600ms] {getNavClass(
					item.id,
					activeSection
				)}"
			>
				{item.label}
			</button>
		{/each}
	</div>

	<button
		type="button"
		on:click={() => (isMenuOpen = !isMenuOpen)}
		class="flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden {activeSection ===
		'contact'
			? 'border-black/15 bg-black/5 text-black'
			: 'border-white/10 bg-white/5 text-white'}"
		aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
		aria-expanded={isMenuOpen}
	>
		<span class="material-symbols-outlined">
			{isMenuOpen ? 'close' : 'menu'}
		</span>
	</button>

	{#if isMenuOpen}
		<div
			class="absolute top-full right-4 left-4 mt-2 overflow-hidden rounded-xl border shadow-2xl md:hidden {activeSection ===
			'contact'
				? 'border-black/10 bg-white text-black'
				: 'border-white/10 bg-neutral-950 text-white'}"
		>
			<div class="flex flex-col p-2">
				{#each navItems as item (item.id)}
					<button
						on:click={() => smoothScroll(item.id)}
						class="font-headline flex min-h-11 items-center justify-between rounded-lg px-4 text-sm font-bold tracking-normal uppercase transition-colors {activeSection ===
						item.id
							? activeSection === 'contact'
								? 'bg-black text-white'
								: 'bg-white text-black'
							: activeSection === 'contact'
								? 'text-neutral-600 hover:bg-black/5'
								: 'text-neutral-300 hover:bg-white/10'}"
					>
						{item.label}
						{#if activeSection === item.id}
							<span class="material-symbols-outlined text-base">north_east</span>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</nav>
