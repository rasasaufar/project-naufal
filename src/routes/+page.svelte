<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Tools from '$lib/components/Tools.svelte';
	import Process from '$lib/components/Process.svelte';
	import TransitionStrip from '$lib/components/TransitionStrip.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import Cta from '$lib/components/Cta.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>PORTOFOLIO NAUFAL | Content Creator Portfolio</title>
</svelte:head>

<div class="grain-overlay"></div>
<Navbar />

<main class="geometric-texture noir-gradient-bg">
	<Hero />
	<About />
	<Tools />
	<Process />
	<TransitionStrip />
	<ProjectGrid />
	<Cta />
</main>

<Footer />
