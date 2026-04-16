const fs = require('fs');
let content = fs.readFileSync('src/lib/components/Navbar.svelte', 'utf-8');

// Insert getNavClass
const scriptEnd = '</script>';
const helperFunc = `
	function getNavClass(itemId, currentActive) {
		if (currentActive === itemId) {
			return currentActive === 'contact' ? 'border-black text-black' : 'border-white text-white';
		}
		return currentActive === 'contact' ? 'border-transparent text-neutral-400 hover:text-black' : 'border-transparent text-neutral-500 hover:text-white';
	}
`;
content = content.replace(scriptEnd, helperFunc + scriptEnd);

// Replace button classes
content = content.replace(
	/class="cursor-pointer border-b-2 pb-1 transition-all duration-\[600ms\] \{activeSection ===\s+item\.id\s+\?\s+activeSection === 'contact'\s+\?\s+'border-black text-black'\s+:\s+'border-white text-white'\s+:\s+activeSection === 'contact'\s+\?\s+'border-transparent text-neutral-400 hover:text-black'\s+:\s+'border-transparent text-neutral-500 hover:text-white'\}"/g,
	'class="cursor-pointer border-b-2 pb-1 transition-all duration-[600ms] {getNavClass(item.id, activeSection)}"'
);

fs.writeFileSync('src/lib/components/Navbar.svelte', content);
