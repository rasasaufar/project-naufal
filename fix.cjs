const fs = require('fs');
let content = fs.readFileSync('src/lib/components/Navbar.svelte', 'utf-8');

const helperFunc = `
	function getNavClass(itemId, currentActive) {
		if (currentActive === itemId) {
			return currentActive === 'contact' ? 'border-black text-black' : 'border-white text-white';
		}
		return currentActive === 'contact' ? 'border-transparent text-neutral-400 hover:text-black' : 'border-transparent text-neutral-500 hover:text-white';
	}
</script>`;
content = content.replace('</script>', helperFunc);

content = content.replace(
	/class="cursor-pointer border-b-2 pb-1 transition-all duration-\[600ms\] \{activeSection ===[\s\S]*?hover:text-white'\}"/,
	'class="cursor-pointer border-b-2 pb-1 transition-all duration-[600ms] {getNavClass(item.id, activeSection)}"'
);

fs.writeFileSync('src/lib/components/Navbar.svelte', content);
