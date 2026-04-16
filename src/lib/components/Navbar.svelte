<script lang="ts">
	import { onMount } from 'svelte';

	let activeSection = 'home';
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

		const targetPosition = target.getBoundingClientRect().top + window.scrollY;
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
	}

	function getNavClass(itemId, currentActive) {
		if (currentActive === itemId) {
			return currentActive === 'contact' ? 'border-black text-black' : 'border-white text-white';
		}
		return currentActive === 'contact'
			? 'border-transparent text-neutral-400 hover:text-black'
			: 'border-transparent text-neutral-500 hover:text-white';
	}
</script>

<nav
	class="fixed top-0 z-50 flex w-full max-w-full items-center justify-between px-12 py-6 backdrop-blur-xl transition-all duration-[800ms] {activeSection ===
	'contact'
		? 'bg-white/80 shadow-sm'
		: 'bg-neutral-950/60'}"
>
	<button
		on:click={() => smoothScroll('home')}
		class="font-headline cursor-pointer text-2xl font-black tracking-tighter uppercase transition-opacity hover:opacity-75 {activeSection ===
		'contact'
			? 'text-black'
			: 'text-white'}"
	>
		NAUFAL GANTENG
	</button>

	<div class="font-headline hidden gap-12 text-xs font-bold tracking-tighter uppercase md:flex">
		{#each navItems as item}
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

	<div class="md:hidden">
		<span
			class="material-symbols-outlined {activeSection === 'contact' ? 'text-black' : 'text-white'}"
		>
			menu
		</span>
	</div>
</nav>
