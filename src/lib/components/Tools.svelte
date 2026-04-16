<script lang="ts">
	const tools = [
		{
			name: 'CAPCUT',
			iconDefault: 'https://api.iconify.design/hugeicons:capcut.svg?color=white',
			iconHover: 'https://api.iconify.design/hugeicons:capcut.svg?color=white'
		},
		{
			name: 'CANVA',
			iconDefault: 'https://api.iconify.design/simple-icons:canva.svg?color=white',
			iconHover: 'https://api.iconify.design/devicon:canva.svg'
		},
		{
			name: 'PREMIERE PRO',
			iconDefault: 'https://api.iconify.design/simple-icons:adobepremierepro.svg?color=white',
			iconHover: 'https://api.iconify.design/simple-icons:adobepremierepro.svg?color=%239999FF'
		},
		{
			name: 'AFTER EFFECTS',
			iconDefault: 'https://api.iconify.design/simple-icons:adobeaftereffects.svg?color=white',
			iconHover: 'https://api.iconify.design/simple-icons:adobeaftereffects.svg?color=%239999FF'
		},
		{
			name: 'LIGHTROOM',
			iconDefault: 'https://api.iconify.design/simple-icons:adobelightroom.svg?color=white',
			iconHover: 'https://api.iconify.design/simple-icons:adobelightroom.svg?color=%2331A8FF'
		},
		{
			name: 'PHOTOSHOP',
			iconDefault: 'https://api.iconify.design/simple-icons:adobephotoshop.svg?color=white',
			iconHover: 'https://api.iconify.design/simple-icons:adobephotoshop.svg?color=%2331A8FF'
		},
		{
			name: 'ILLUSTRATOR',
			iconDefault: 'https://api.iconify.design/simple-icons:adobeillustrator.svg?color=white',
			iconHover: 'https://api.iconify.design/simple-icons:adobeillustrator.svg?color=%23FF9A00'
		}
	];
</script>

<section class="border-outline-variant/10 bg-surface-container-lowest border-b px-12 py-24">
	<div class="mx-auto flex max-w-screen-2xl flex-col items-center">
		<span
			class="font-label mb-16 flex items-center gap-4 text-xs tracking-[0.2em] text-neutral-500 uppercase"
		>
			<span class="h-[1px] w-8 bg-neutral-500"></span>
			THE ARSENAL
			<span class="h-[1px] w-8 bg-neutral-500"></span>
		</span>

		<div class="flex flex-wrap justify-center gap-16 opacity-60 md:gap-24">
			{#each tools as tool}
				<div
					class="group flex cursor-default flex-col items-center gap-6 transition-all duration-500 hover:scale-110 hover:opacity-100"
				>
					<div class="relative h-12 w-12 md:h-16 md:w-16">
						<img
							src={tool.iconDefault}
							alt={tool.name}
							class="absolute inset-0 h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-0"
						/>
						<img
							src={tool.iconHover}
							alt={tool.name}
							class="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						/>
					</div>
					<span
						class="font-label text-[10px] tracking-widest text-neutral-600 transition-colors group-hover:text-white"
						>{tool.name}</span
					>
				</div>
			{/each}
		</div>
	</div>
</section>
