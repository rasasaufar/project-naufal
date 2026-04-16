module.exports = {
	apps: [
		{
			name: 'portofolio-monolith',
			script: './build/index.js',
			env: {
				PORT: 3000,
				NODE_ENV: 'production'
			}
		}
	]
};
