import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

function copyHtaccess(): Plugin {
	return {
		name: 'copy-htaccess',
		closeBundle() {
			const destDir = resolve(__dirname, 'dist');
			mkdirSync(destDir, { recursive: true });
			const src = resolve(__dirname, 'public/.htaccess');
			if (existsSync(src)) {
				copyFileSync(src, resolve(destDir, '.htaccess'));
			}
		},
	};
}

export default defineConfig(({ command, isPreview }) => {
	const fromEnv = process.env.ADMIN_BASE;
	const base = fromEnv ?? (command === 'build' || isPreview ? '/admin/' : '/');

	return {
		base,
		plugins: [react(), tailwindcss(), copyHtaccess()],
	};
});
