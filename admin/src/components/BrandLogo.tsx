export function BrandLogo({ className }: { className?: string }) {
	return (
		<div className={`flex min-w-0 items-center gap-2 ${className ?? ''}`}>
			<img
				src={`${import.meta.env.BASE_URL}logo-mark.png`}
				alt=""
				className="h-10 w-auto shrink-0 object-contain"
				width={48}
				height={40}
			/>
			<span className="truncate text-lg font-bold leading-none tracking-tight text-fg">Pixel-Craft</span>
		</div>
	);
}
