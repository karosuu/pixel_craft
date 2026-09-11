import { useTheme } from '../context/ThemeContext';

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
	const { theme, toggleTheme } = useTheme();
	const isLight = theme === 'light';
	const label = isLight ? 'Modo oscuro' : 'Modo claro';

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className={`inline-flex items-center gap-2 rounded-lg text-sm font-medium text-fg/80 transition hover:bg-panel hover:text-fg ${
				compact ? 'px-2 py-1.5' : 'w-full px-3 py-2'
			}`}
			aria-label={label}
			title={label}
		>
			{isLight ? <MoonIcon /> : <SunIcon />}
			{!compact && <span>{isLight ? 'Oscuro' : 'Claro'}</span>}
		</button>
	);
}

function SunIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 3v1.5M12 19.5V21M4.2 4.2l1.1 1.1M18.7 18.7l1.1 1.1M3 12h1.5M19.5 12H21M4.2 19.8l1.1-1.1M18.7 5.3l1.1-1.1" />
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
			<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />
		</svg>
	);
}
