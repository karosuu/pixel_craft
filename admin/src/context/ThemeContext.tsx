import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'pc-theme';

type ThemeState = {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

function readTheme(): Theme {
	try {
		return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
	} catch {
		return 'dark';
	}
}

function applyTheme(theme: Theme) {
	document.documentElement.classList.toggle('light', theme === 'light');
	document.documentElement.style.colorScheme = theme;
	try {
		localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		/* ignore quota / private mode */
	}
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(readTheme);

	useEffect(() => {
		applyTheme(theme);
	}, [theme]);

	const value = useMemo<ThemeState>(
		() => ({
			theme,
			setTheme: setThemeState,
			toggleTheme: () => setThemeState((current) => (current === 'dark' ? 'light' : 'dark')),
		}),
		[theme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
	return ctx;
}
