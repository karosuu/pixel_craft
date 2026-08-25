import type { Locale } from './config';

export type { ServiceId } from './config';
export type AudienceId = 'local' | 'startup';
export type ProcessStepId = 'discover' | 'design' | 'build' | 'qa' | 'launch';

export const dictionaries = {
	en: {
		meta: {
			homeTitle: 'Pixel-Craft — Design, build, performance & QA',
			homeDescription:
				'Pixel-Craft designs, builds, optimizes, and QA-tests websites before launch for local businesses and startups.',
			servicesTitle: 'Services — Pixel-Craft',
			servicesDescription:
				'Website build, design improvement, performance and SEO, and web QA. Pick the service that matches the job.',
			workTitle: 'Projects — Pixel-Craft',
			workDescription: 'Pixel-Craft projects. Case studies coming soon.',
			aboutTitle: 'About — Pixel-Craft',
			aboutDescription:
				'Pixel-Craft builds websites that look great, feel effortless, and work hard for your business.',
			contactTitle: 'Contact — Pixel-Craft',
			contactDescription: 'Start a Pixel-Craft project: build, design, optimization, or web QA.',
		},
		nav: {
			home: 'Home',
			services: 'Services',
			work: 'Projects',
			about: 'About',
			contact: 'Contact',
		},
		language: {
			en: 'EN',
			es: 'ES',
			switchTo: 'Español',
		},
		common: {
			skip: 'Skip to content',
			ctaPrimary: 'Start a project',
			ctaSecondary: 'See our projects',
			learnMore: 'Learn more',
			brandAlt: 'Pixel-Craft',
			openMenu: 'Open menu',
			closeMenu: 'Close menu',
			primaryNav: 'Primary',
			breadcrumb: 'Breadcrumb',
		},
		hero: {
			eyebrow: 'Design + build + performance + QA',
			titleBefore: 'Sites that look sharp,',
			titleAccent: 'load fast,',
			titleAfter: 'and hold up in QA.',
			body: 'We build new sites, redesign tired ones, and run performance and QA before they go live — not just until they look done.',
		},
		audiences: {
			title: 'Two kinds of teams. The same meticulous craft.',
			localTitle: 'Local businesses',
			localBody:
				'People find you on a phone. If the site is slow, confusing, or hard to contact, they call someone else.',
			startupTitle: 'Startups',
			startupBody:
				'Launch is not a mockup. You need a clear product story, performance you can stand behind, and QA before you ship.',
		},
		services: {
			title: 'What we do',
			intro: 'Four products, used together or on their own.',
			catalogTitle: 'Digital services to improve your web presence',
			catalogIntro:
				'We design, improve, optimize, and validate websites so they work better, look better, and convert more.',
			forLocal: 'For local businesses',
			forStartup: 'For startups',
			problemLabel: 'Problem',
			solutionLabel: 'Solution',
			idealForLabel: 'Ideal for',
			problemHeading: 'The problem',
			whatWeDoHeading: 'What we do',
			whatWeDoIntro: 'This is how we work.',
			includedHeading: "What's included",
			youGetHeading: 'What you get',
			youGetIntro: 'When we wrap up you receive:',
			forYouHeading: 'This service is for you if',
			items: {
				build: {
					title: 'Website build',
					summary: 'New sites from a clear brief: structure, design, and a launch that actually works.',
					problem: 'You need a professional website from scratch.',
					solution: 'We design and develop modern, responsive sites aimed at a clear goal.',
					idealFor: ['New businesses', 'Companies with no website', 'Full redesigns', 'New digital projects'],
					cta: 'Create my site',
					ctaTitle: 'Ready to build your site?',
					ctaBody: "Let's create a clear, responsive website that is ready to launch.",
					metaTitle: 'Website build — Pixel-Craft',
					metaDescription:
						'New websites with clear structure, responsive design, and a launch checklist. Create your site with Pixel-Craft.',
					hero: 'A new site that is clear, works on a phone, and is ready to launch.',
					problemBody:
						'Without a site — or with one that no longer matches the business — people cannot tell what you offer, how to reach you, or why they should trust you.',
					work: [
						{
							title: 'Structure',
							items: ['Information architecture', 'Sitemap', 'Content hierarchy', 'User paths', 'Calls to action'],
						},
						{
							title: 'Design',
							items: ['Visual direction', 'UI', 'Responsive layouts', 'Component structure'],
						},
						{
							title: 'Build',
							items: ['Responsive development', 'Components', 'Forms', 'Integrations required for launch'],
						},
						{
							title: 'QA & launch',
							items: ['Functional testing', 'Responsive testing', 'Final fixes', 'Launch preparation'],
						},
					],
					included: [
						'Responsive website',
						'Core website pages',
						'UI design',
						'Contact forms',
						'Basic SEO setup',
						'Basic analytics setup',
						'Responsive and functional QA',
						'Launch preparation',
					],
					youGet: [
						'A final responsive website',
						'Structured page architecture',
						'Working forms',
						'Analytics configured where applicable',
						'QA-checked pages',
						'A launch-ready site',
						'Basic handoff notes where applicable',
					],
					forYou: [
						'You do not have a website yet.',
						'Your current site no longer represents the business.',
						'You need a professional site for a new business.',
						'You are launching a new product or service.',
						'The current site needs a complete rebuild.',
						'You want a responsive site built around clear user journeys.',
					],
				},
				design: {
					title: 'Design improvement',
					summary: 'UI and layout that look current, read clearly, and match how people actually use the site.',
					problem: 'Your site works, but it looks dated, confusing, or unprofessional.',
					solution: 'We improve UI/UX, visual structure, hierarchy, and the experience on every screen.',
					idealFor: ['Existing sites', 'Redesigns', 'Better conversion', 'A stronger mobile experience'],
					cta: 'Improve my site',
					ctaTitle: 'Ready to refresh the site?',
					ctaBody: "Let's make it look finished and easier to use.",
					metaTitle: 'Design improvement — Pixel-Craft',
					metaDescription:
						'Refresh UI, hierarchy, and mobile experience so your site looks current and is easier to use.',
					hero: 'Make the site look as current as the business — and easier to use.',
					problemBody:
						'A site can still “work” and still cost you trust: cluttered layout, weak hierarchy, and a mobile view that fights the visitor.',
					work: [
						{
							title: 'Review',
							items: ['Current UI', 'Where people get stuck', 'Mobile friction', 'Pages in scope'],
						},
						{
							title: 'Direction',
							items: ['Visual system', 'Type and color', 'Components', 'Brand consistency'],
						},
						{
							title: 'Layout',
							items: ['Page hierarchy', 'Responsive templates', 'Key flows', 'Clearer CTAs'],
						},
						{
							title: 'Apply',
							items: ['Updated screens', 'Mobile pass', 'Trust and readability', 'Notes for what comes next'],
						},
					],
					included: [
						'UI refresh on agreed pages',
						'Mobile-first layout pass',
						'Clearer visual hierarchy',
						'Updated CTAs and trust cues',
						'Consistent components',
						'Design notes for next iteration',
					],
					youGet: [
						'A tighter visual system on the pages in scope',
						'Templates that work on a phone',
						'A clearer path to contact or buy',
						'A list of remaining polish, if any',
					],
					forYou: [
						'You already have a website.',
						'It looks older than the business.',
						'People bounce or get lost on mobile.',
						'The layout feels cluttered or improvised.',
						'You want a clearer path to contact or buy.',
					],
				},
				optimize: {
					title: 'Performance & SEO',
					summary: 'Faster pages, cleaner markup, and the basics that help search and Core Web Vitals.',
					problem: 'Your site is slow, has technical issues, or is not getting enough visibility.',
					solution:
						'We audit and improve performance, technical SEO, structure, and the details that shape the visit.',
					idealFor: ['Existing sites', 'Speed problems', 'SEO', 'Core Web Vitals', 'Better performance'],
					cta: 'Optimize my site',
					ctaTitle: 'Ready to speed it up?',
					ctaBody: "Let's make the site faster, clearer to search, and easier to use.",
					metaTitle: 'Performance & SEO — Pixel-Craft',
					metaDescription:
						'Faster loads, clearer pages for search and people, and Core Web Vitals work for sites that already exist.',
					hero: 'Make your site load fast, easy to find, and better to use.',
					problemBody:
						'Your site can look fine and still lose people to slow loads, weak structure, SEO gaps, or a painful mobile experience.',
					work: [
						{
							title: 'Audit',
							items: ['Baseline metrics', 'Speed bottlenecks', 'SEO gaps', 'Mobile issues'],
						},
						{
							title: 'Performance',
							items: ['Core Web Vitals', 'Images', 'Fonts', 'Scripts and extra weight'],
						},
						{
							title: 'SEO',
							items: ['Titles', 'Meta descriptions', 'Headings', 'Sitemap and indexing'],
						},
						{
							title: 'Recheck',
							items: ['Accessibility baseline', 'Before/after snapshot', 'What to do next'],
						},
					],
					included: [
						'Performance audit',
						'Core Web Vitals work',
						'Image, font, and script cleanup',
						'On-page SEO and metadata',
						'Accessibility baseline',
						'A recheck after fixes',
					],
					youGet: [
						'A written audit of what was slowing the site',
						'Fixes shipped on the pages in scope',
						'A before/after snapshot',
						'Recommendations for what to do next',
					],
					forYou: [
						'You already have a website.',
						'The site loads slowly.',
						'SEO is weak or unclear.',
						'It works poorly on mobile.',
						'You want a better chance to convert.',
						'You are preparing a campaign.',
					],
				},
				qa: {
					title: 'Web QA',
					summary: 'Cross-browser, responsive, and functional checks so launch is not a surprise.',
					problem: 'You need to know the site actually works before launch — or after a big change.',
					solution: 'We test features, responsive layouts, forms, navigation, and behavior across real scenarios.',
					idealFor: ['New sites', 'Launches', 'Ecommerce', 'Major changes', 'Existing sites with bugs'],
					cta: 'Test my site',
					ctaTitle: 'Ready to test before launch?',
					ctaBody: "Let's catch what breaks before your customers do.",
					metaTitle: 'Web QA — Pixel-Craft',
					metaDescription:
						'Functional, responsive, and browser testing with a clear bug list before you launch or ship a change.',
					hero: 'Find what breaks before your customers do.',
					problemBody:
						'Launch and big releases hide issues that only show up on someone else’s phone, browser, or form path — and then they become support tickets.',
					work: [
						{
							title: 'Scope',
							items: ['Browsers and devices', 'Breakpoints', 'Critical user paths', 'Ecommerce flows when needed'],
						},
						{
							title: 'Test',
							items: ['Functional checks', 'Responsive layouts', 'Forms', 'Navigation'],
						},
						{
							title: 'Find',
							items: ['Broken links', '404s', 'Error states', 'What fails on a phone'],
						},
						{
							title: 'Report',
							items: ['Severity', 'Repro steps', 'Punch list', 'Go / no-go for launch'],
						},
					],
					included: [
						'Agreed device and browser pass',
						'Functional and form testing',
						'Responsive checks',
						'Broken-link and 404 sweep',
						'A written bug list',
					],
					youGet: [
						'Results on the matrix we agreed',
						'Bugs with severity and repro steps',
						'What blocks launch',
						'A clear go / no-go',
					],
					forYou: [
						'You are about to launch.',
						'You just shipped a large change.',
						'Forms, checkout, or booking must work.',
						'You already see bugs and need them listed.',
						'You want a pass before customers, press, or investors arrive.',
					],
				},
			},
		},
		process: {
			title: 'How we work',
			intro: 'A short path from first call to a site you can stand behind.',
			steps: {
				discover: {
					title: 'Discover',
					body: 'Goals, audience, current site, and what “done” means for this launch.',
				},
				design: {
					title: 'Design',
					body: 'Structure and visuals that match the brand — Pixel-Craft stays Pixel-Craft; your voice stays yours.',
				},
				build: {
					title: 'Build',
					body: 'Clean, responsive implementation with performance in mind from the first pass.',
				},
				qa: {
					title: 'QA',
					body: 'We break it on purpose: phones, browsers, forms, and the paths people actually take.',
				},
				launch: {
					title: 'Launch',
					body: 'Go-live, a punch list, and a handoff you can maintain or keep iterating with us.',
				},
			},
		},
		work: {
			title: 'Projects',
			previewTitle: 'Selected Work',
			intro: 'Client work will appear here as we publish new case studies.',
			placeholderNote: 'Sample',
			visitSite: 'Visit site',
			comingSoonTitle: 'Coming soon',
			comingSoonBody:
				'We are preparing the first case studies. Check back shortly — or start a project and be next on this page.',
			comingSoonPreview: 'First case studies are in progress.',
			cases: [],
		},
		about: {
			title: 'About Pixel-Craft',
			lede: 'We build websites that look great, feel effortless, and work hard for your business.',
			body: [
				'Pixel-Craft is a web studio for businesses and teams that want more than just a beautiful website. We create digital experiences that build trust, make it easier for people to find you, and turn visits into meaningful connections.',
				'From launching a brand-new site to refreshing a design that feels outdated, we focus on the details that make a real difference: thoughtful design, faster performance, better user experiences, and a smooth path from first click to conversion.',
				'We believe great websites should feel simple for the people using them and powerful for the businesses behind them.',
				'English or Spanish — we work in the language your customers feel most comfortable in.',
				'Good design gets attention. Great digital experiences make people stay.',
			],
		},
		proof: {
			title: 'Built beyond the screenshot.',
			body: 'Good design is only the beginning. We care about what happens after the mockup — performance, responsiveness, browser compatibility, accessibility, SEO fundamentals, and the details users notice.',
		},
		cta: {
			title: 'Get your site through review before launch.',
			body: "Tell us what you're building and we'll tell you what it needs.",
			button: 'Start a project',
		},
		contact: {
			title: 'Start a project',
			intro: 'Send a short brief. We will reply to the email you share.',
			name: 'Name',
			email: 'Email',
			website: 'Website',
			websiteHint: 'Optional',
			audience: 'I am',
			need: 'What are you looking to do?',
			message: 'Project details',
			submit: 'Send',
			sending: 'Sending…',
			success: 'Message sent. We will reply soon.',
			error: 'Could not send. Try again or email {email}.',
			mailtoNote: 'We reply in the language of this page unless you ask otherwise.',
			audienceOptions: {
				local: 'A local business',
				startup: 'A startup',
			},
			needOptions: {
				build: 'Build a new website',
				design: 'Redesign my website',
				optimize: 'Improve performance / SEO',
				qa: 'QA / test my website',
				unsure: 'Not sure yet',
			},
			subject: 'Pixel-Craft project inquiry',
			honeypot: 'Do not fill',
			selectPlaceholder: 'Choose one',
			contextual: {
				title: 'Tell us about your site',
				intro: 'With this we can tell you what this service needs.',
				serviceLabel: 'Selected service',
				problem: {
					build: 'What site do you need, and by when?',
					design: 'What do you want to improve on the current site?',
					optimize: 'What problem are you seeing?',
					qa: 'What should we test, and when do you launch?',
				},
				submit: {
					build: 'Request a build',
					design: 'Request a design pass',
					optimize: 'Request optimization',
					qa: 'Request testing',
				},
			},
		},
		footer: {
			tagline: 'Websites, design, optimization, and QA.',
			rights: 'All rights reserved.',
			nav: 'Footer',
		},
	},
	es: {
		meta: {
			homeTitle: 'Pixel-Craft — Diseño, desarrollo, rendimiento y QA',
			homeDescription:
				'Pixel-Craft diseña, construye, optimiza y prueba sitios web antes del lanzamiento para negocios locales y startups.',
			servicesTitle: 'Servicios — Pixel-Craft',
			servicesDescription:
				'Creación de sitios, mejora de diseño, optimización y SEO, y QA web. Elige el servicio que encaja con tu proyecto.',
			workTitle: 'Proyectos — Pixel-Craft',
			workDescription: 'Proyectos de Pixel-Craft. Casos próximamente.',
			aboutTitle: 'Nosotros — Pixel-Craft',
			aboutDescription:
				'Pixel-Craft crea sitios web que se ven increíbles, se sienten fáciles de usar y trabajan a favor de tu negocio.',
			contactTitle: 'Contacto — Pixel-Craft',
			contactDescription: 'Inicia un proyecto con Pixel-Craft: creación, diseño, optimización o QA web.',
		},
		nav: {
			home: 'Inicio',
			services: 'Servicios',
			work: 'Proyectos',
			about: 'Nosotros',
			contact: 'Contacto',
		},
		language: {
			en: 'EN',
			es: 'ES',
			switchTo: 'English',
		},
		common: {
			skip: 'Saltar al contenido',
			ctaPrimary: 'Iniciar un proyecto',
			ctaSecondary: 'Ver proyectos',
			learnMore: 'Ver más',
			brandAlt: 'Pixel-Craft',
			openMenu: 'Abrir menú',
			closeMenu: 'Cerrar menú',
			primaryNav: 'Principal',
			breadcrumb: 'Ruta de navegación',
		},
		hero: {
			eyebrow: 'Diseño + desarrollo + rendimiento + QA',
			titleBefore: 'Sitios que se ven profesionales,',
			titleAccent: 'cargan rápido',
			titleAfter: 'y pasan QA.',
			body: 'Creamos sitios nuevos, rediseñamos los que ya se vieron viejos y corremos rendimiento y QA antes de que salgan — no solo hasta que se vean listos.',
		},
		audiences: {
			title: 'Dos tipos de equipo. El mismo oficio meticuloso.',
			localTitle: 'Negocios locales',
			localBody:
				'La gente te busca en el celular. Si el sitio es lento, confuso o difícil de contactar, llaman a otro.',
			startupTitle: 'Startups',
			startupBody:
				'El launch no es un mockup. Necesitas una historia clara del producto, rendimiento defendible y QA antes de salir.',
		},
		services: {
			title: 'Qué hacemos',
			intro: 'Cuatro productos, juntos o por separado.',
			catalogTitle: 'Servicios digitales para mejorar tu presencia web',
			catalogIntro:
				'Diseñamos, mejoramos, optimizamos y validamos sitios web para que funcionen mejor, se vean mejor y conviertan más.',
			forLocal: 'Para negocios locales',
			forStartup: 'Para startups',
			problemLabel: 'Problema',
			solutionLabel: 'Solución',
			idealForLabel: 'Ideal para',
			problemHeading: 'El problema',
			whatWeDoHeading: 'Qué hacemos',
			whatWeDoIntro: 'Así trabajamos.',
			includedHeading: 'Qué incluye',
			youGetHeading: 'Qué recibirás',
			youGetIntro: 'Al finalizar recibirás:',
			forYouHeading: 'Este servicio es para ti si',
			items: {
				build: {
					title: 'Creación de sitios',
					summary: 'Sitios nuevos desde un brief claro: estructura, diseño y un lanzamiento que sí funciona.',
					problem: 'Necesitas un sitio web profesional desde cero.',
					solution: 'Diseñamos y desarrollamos sitios web modernos, responsive y orientados a objetivos.',
					idealFor: ['Nuevos negocios', 'Empresas que no tienen sitio web', 'Rediseños completos', 'Nuevos proyectos digitales'],
					cta: 'Crear mi sitio',
					ctaTitle: '¿Listo para construir tu sitio?',
					ctaBody: 'Hagamos un sitio claro, responsive y listo para lanzar.',
					metaTitle: 'Creación de sitios — Pixel-Craft',
					metaDescription:
						'Sitios nuevos con estructura clara, diseño responsive y un lanzamiento ordenado. Crea tu sitio con Pixel-Craft.',
					hero: 'Un sitio nuevo que se entiende, funciona en el celular y está listo para lanzar.',
					problemBody:
						'Sin un sitio — o con uno que ya no representa al negocio — la gente no entiende qué ofreces, cómo contactarte ni por qué confiar.',
					work: [
						{
							title: 'Estructura',
							items: ['Arquitectura de información', 'Sitemap', 'Jerarquía de contenido', 'Caminos de uso', 'Llamados a la acción'],
						},
						{
							title: 'Diseño',
							items: ['Dirección visual', 'UI', 'Layouts responsive', 'Estructura de componentes'],
						},
						{
							title: 'Construcción',
							items: ['Desarrollo responsive', 'Componentes', 'Formularios', 'Integraciones necesarias para el launch'],
						},
						{
							title: 'QA y lanzamiento',
							items: ['Pruebas funcionales', 'Pruebas responsive', 'Ajustes finales', 'Preparación de launch'],
						},
					],
					included: [
						'Sitio responsive',
						'Páginas principales',
						'Diseño de UI',
						'Formularios de contacto',
						'SEO básico',
						'Analítica básica',
						'QA funcional y responsive',
						'Preparación de lanzamiento',
					],
					youGet: [
						'El sitio responsive terminado',
						'Arquitectura de páginas estructurada',
						'Formularios funcionando',
						'Analítica configurada cuando aplica',
						'Páginas pasadas por QA',
						'Un sitio listo para lanzar',
						'Notas de entrega cuando aplican',
					],
					forYou: [
						'Aún no tienes sitio web.',
						'Tu sitio actual ya no representa al negocio.',
						'Necesitas un sitio profesional para un negocio nuevo.',
						'Lanzas un producto o servicio nuevo.',
						'El sitio actual necesita un rebuild completo.',
						'Quieres un sitio responsive armado alrededor de recorridos claros.',
					],
				},
				design: {
					title: 'Mejora de diseño',
					summary: 'Interfaz y layout actuales, fáciles de leer y alineados con cómo se usa el sitio.',
					problem: 'Tu sitio funciona, pero se ve desactualizado, confuso o poco profesional.',
					solution: 'Mejoramos UI/UX, estructura visual, jerarquía y experiencia de usuario.',
					idealFor: ['Sitios existentes', 'Rediseños', 'Mejorar conversión', 'Mejorar experiencia móvil'],
					cta: 'Mejorar mi sitio',
					ctaTitle: '¿Listo para refrescar el sitio?',
					ctaBody: 'Que se vea terminado y sea más fácil de usar.',
					metaTitle: 'Mejora de diseño — Pixel-Craft',
					metaDescription:
						'Refrescamos UI, jerarquía y móvil para que tu sitio se vea actual y sea más fácil de usar.',
					hero: 'Que el sitio se vea tan actual como el negocio — y sea más fácil de usar.',
					problemBody:
						'Un sitio puede “funcionar” y aun así costarte confianza: layout saturado, jerarquía débil y un móvil que pelea con quien visita.',
					work: [
						{
							title: 'Revisar',
							items: ['UI actual', 'Dónde se traban', 'Fricción en móvil', 'Páginas en alcance'],
						},
						{
							title: 'Dirección',
							items: ['Sistema visual', 'Tipografía y color', 'Componentes', 'Consistencia de marca'],
						},
						{
							title: 'Layout',
							items: ['Jerarquía de página', 'Plantillas responsive', 'Flujos clave', 'CTAs más claros'],
						},
						{
							title: 'Aplicar',
							items: ['Pantallas actualizadas', 'Pase móvil', 'Confianza y lectura', 'Notas de qué sigue'],
						},
					],
					included: [
						'Refresco de UI en páginas acordadas',
						'Pase de layout mobile-first',
						'Jerarquía visual más clara',
						'CTAs y señales de confianza',
						'Componentes consistentes',
						'Notas de diseño para la siguiente iteración',
					],
					youGet: [
						'Un sistema visual más cerrado en las páginas en alcance',
						'Plantillas que funcionan en el celular',
						'Un camino más claro a contactar o comprar',
						'Lista de pulido pendiente, si hay',
					],
					forYou: [
						'Ya tienes un sitio web.',
						'Se ve más viejo que el negocio.',
						'La gente se pierde o se va en móvil.',
						'El layout se siente saturado o improvisado.',
						'Quieres un camino más claro a contactar o comprar.',
					],
				},
				optimize: {
					title: 'Optimización y SEO',
					summary: 'Páginas más rápidas, markup limpio y lo básico para búsqueda y Core Web Vitals.',
					problem: 'Tu sitio es lento, tiene problemas técnicos o no está obteniendo suficiente visibilidad.',
					solution:
						'Analizamos y optimizamos rendimiento, SEO técnico, estructura y elementos que afectan la experiencia.',
					idealFor: ['Sitios existentes', 'Problemas de velocidad', 'SEO', 'Core Web Vitals', 'Mejorar rendimiento'],
					cta: 'Optimizar mi sitio',
					ctaTitle: '¿Listo para que cargue mejor?',
					ctaBody: 'Hagamos el sitio más rápido, más claro para buscar y más fácil de usar.',
					metaTitle: 'Optimización y SEO — Pixel-Craft',
					metaDescription:
						'Cargas más rápidas, páginas más claras para Google y para personas, y trabajo de Core Web Vitals en sitios que ya existen.',
					hero: 'Haz que tu sitio cargue rápido, sea fácil de encontrar y funcione mejor.',
					problemBody:
						'Tu sitio puede verse bien y aun así estar perdiendo usuarios por velocidad, estructura, SEO o una mala experiencia móvil.',
					work: [
						{
							title: 'Auditoría',
							items: ['Métricas base', 'Cuellos de velocidad', 'Huecos de SEO', 'Problemas en móvil'],
						},
						{
							title: 'Rendimiento',
							items: ['Core Web Vitals', 'Imágenes', 'Fuentes', 'Scripts y peso de más'],
						},
						{
							title: 'SEO',
							items: ['Titles', 'Meta descriptions', 'Headings', 'Sitemap e indexación'],
						},
						{
							title: 'Recheck',
							items: ['Piso de accesibilidad', 'Comparativa antes/después', 'Qué sigue'],
						},
					],
					included: [
						'Auditoría de rendimiento',
						'Trabajo de Core Web Vitals',
						'Limpieza de imágenes, fuentes y scripts',
						'SEO on-page y metadatos',
						'Piso de accesibilidad',
						'Recheck después de los ajustes',
					],
					youGet: [
						'Una auditoría escrita de lo que frenaba el sitio',
						'Correcciones publicadas en las páginas en alcance',
						'Comparativa antes/después',
						'Recomendaciones de qué hacer después',
					],
					forYou: [
						'Ya tienes un sitio web.',
						'El sitio carga lentamente.',
						'Tienes problemas de SEO.',
						'Tu sitio funciona mal en móvil.',
						'Quieres mejorar conversiones.',
						'Estás preparando una campaña.',
					],
				},
				qa: {
					title: 'QA web',
					summary: 'Pruebas en navegadores, tamaños y flujos para que el lanzamiento no sea una sorpresa.',
					problem: 'Necesitas asegurarte de que tu sitio funcione correctamente antes de lanzarlo o después de cambios.',
					solution:
						'Probamos funcionalidades, responsive, formularios, navegación y comportamiento en diferentes escenarios.',
					idealFor: ['Sitios nuevos', 'Lanzamientos', 'E-commerce', 'Cambios importantes', 'Sitios existentes con errores'],
					cta: 'Probar mi sitio',
					ctaTitle: '¿Listo para probar antes del launch?',
					ctaBody: 'Encontremos lo que se rompe antes de que lo encuentren tus clientes.',
					metaTitle: 'QA web — Pixel-Craft',
					metaDescription:
						'Pruebas funcionales, responsive y de navegadores, con una lista clara de bugs antes de lanzar o publicar un cambio.',
					hero: 'Encuentra lo que se rompe antes de que lo encuentren tus clientes.',
					problemBody:
						'El launch y los cambios grandes esconden fallas que solo aparecen en el celular, el navegador o el formulario de otra persona — y luego se vuelven tickets.',
					work: [
						{
							title: 'Alcance',
							items: ['Navegadores y dispositivos', 'Breakpoints', 'Caminos críticos', 'Flujos de e-commerce si aplican'],
						},
						{
							title: 'Probar',
							items: ['Checks funcionales', 'Layouts responsive', 'Formularios', 'Navegación'],
						},
						{
							title: 'Encontrar',
							items: ['Enlaces rotos', '404', 'Estados de error', 'Qué falla en el celular'],
						},
						{
							title: 'Reportar',
							items: ['Severidad', 'Pasos para reproducir', 'Lista de ajustes', 'Go / no-go para lanzar'],
						},
					],
					included: [
						'Pase en dispositivos y navegadores acordados',
						'Pruebas funcionales y de formularios',
						'Checks responsive',
						'Barrido de enlaces rotos y 404',
						'Lista escrita de bugs',
					],
					youGet: [
						'Resultados en la matriz que acordamos',
						'Bugs con severidad y pasos de repro',
						'Qué bloquea el launch',
						'Un go / no-go claro',
					],
					forYou: [
						'Estás por lanzar.',
						'Acabas de publicar un cambio grande.',
						'Formularios, checkout o reservas tienen que funcionar.',
						'Ya ves errores y necesitas listarlos.',
						'Quieres un pase antes de clientes, prensa o inversionistas.',
					],
				},
			},
		},
		process: {
			title: 'Cómo trabajamos',
			intro: 'Un camino corto desde la primera llamada hasta un sitio que puedes defender.',
			steps: {
				discover: {
					title: 'Descubrir',
					body: 'Objetivos, audiencia, sitio actual y qué significa “listo” para este lanzamiento.',
				},
				design: {
					title: 'Diseñar',
					body: 'Estructura y visuales alineados a tu marca. El nombre Pixel-Craft no se traduce; tu voz tampoco se diluye.',
				},
				build: {
					title: 'Construir',
					body: 'Implementación limpia y responsive, con rendimiento desde el primer pase.',
				},
				qa: {
					title: 'QA',
					body: 'Lo rompemos a propósito: celulares, navegadores, formularios y los caminos reales de uso.',
				},
				launch: {
					title: 'Lanzar',
					body: 'Salida a producción, lista de ajustes y una entrega que puedes mantener o seguir iterando con nosotros.',
				},
			},
		},
		work: {
			title: 'Proyectos',
			previewTitle: 'Trabajo seleccionado',
			intro: 'El trabajo con clientes aparecerá aquí cuando publiquemos los casos.',
			placeholderNote: 'Ejemplo',
			visitSite: 'Ver sitio',
			comingSoonTitle: 'Próximamente',
			comingSoonBody:
				'Estamos preparando los primeros casos. Vuelve pronto — o inicia un proyecto y sé el siguiente en esta página.',
			comingSoonPreview: 'Los primeros casos están en preparación.',
			cases: [],
		},
		about: {
			title: 'Sobre Pixel-Craft',
			lede: 'Creamos sitios web que se ven increíbles, se sienten fáciles de usar y trabajan a favor de tu negocio.',
			body: [
				'Pixel-Craft es un estudio web para empresas y equipos que buscan mucho más que una página bonita.',
				'Creamos experiencias digitales que generan confianza, facilitan que tus clientes te encuentren y convierten cada visita en una oportunidad para conectar.',
				'Desde crear un sitio desde cero hasta transformar un diseño que ya necesita renovarse, cuidamos cada detalle que realmente importa: diseño estratégico, velocidad, experiencia de usuario y un recorrido claro desde el primer clic hasta la conversión.',
				'Creemos que un buen sitio web debe sentirse sencillo para quien lo visita y, al mismo tiempo, convertirse en una herramienta poderosa para el negocio que está detrás.',
				'¿Español o inglés? Trabajamos en el idioma que mejor conecta con tus clientes.',
				'Un buen diseño llama la atención. Una gran experiencia digital hace que quieran quedarse.',
			],
		},
		proof: {
			title: 'Más allá del screenshot.',
			body: 'El buen diseño es solo el comienzo. Nos importa lo que pasa después del mockup: rendimiento, comportamiento responsive, compatibilidad de navegadores, accesibilidad, fundamentos de SEO y los detalles que la gente sí nota.',
		},
		cta: {
			title: 'Haz que tu sitio pase la revisión antes del lanzamiento.',
			body: 'Cuéntanos qué estás construyendo y te diremos qué necesita.',
			button: 'Iniciar un proyecto',
		},
		contact: {
			title: 'Iniciar un proyecto',
			intro: 'Envía un brief corto. Te responderemos al correo que indiques.',
			name: 'Nombre',
			email: 'Correo',
			website: 'Sitio web',
			websiteHint: 'Opcional',
			audience: 'Soy',
			need: '¿Qué quieres hacer?',
			message: 'Detalles del proyecto',
			submit: 'Enviar',
			sending: 'Enviando…',
			success: 'Mensaje enviado. Te responderemos pronto.',
			error: 'No se pudo enviar. Inténtalo de nuevo o escribe a {email}.',
			mailtoNote: 'Respondemos en el idioma de esta página, salvo que indiques otra cosa.',
			audienceOptions: {
				local: 'Un negocio local',
				startup: 'Una startup',
			},
			needOptions: {
				build: 'Crear un sitio nuevo',
				design: 'Rediseñar mi sitio',
				optimize: 'Mejorar rendimiento / SEO',
				qa: 'QA / probar mi sitio',
				unsure: 'Aún no lo sé',
			},
			subject: 'Consulta de proyecto Pixel-Craft',
			honeypot: 'No completar',
			selectPlaceholder: 'Elige una opción',
			contextual: {
				title: 'Cuéntanos sobre tu sitio',
				intro: 'Con estos datos podemos decirte qué necesita este servicio.',
				serviceLabel: 'Servicio seleccionado',
				problem: {
					build: '¿Qué sitio necesitas y para cuándo?',
					design: '¿Qué quieres mejorar de tu sitio actual?',
					optimize: '¿Qué problema estás experimentando?',
					qa: '¿Qué hay que probar y cuándo lanzas?',
				},
				submit: {
					build: 'Solicitar creación',
					design: 'Solicitar mejora',
					optimize: 'Solicitar optimización',
					qa: 'Solicitar pruebas',
				},
			},
		},
		footer: {
			tagline: 'Sitios web, diseño, optimización y QA.',
			rights: 'Todos los derechos reservados.',
			nav: 'Pie de página',
		},
	},
};

export type Dictionary = (typeof dictionaries)[Locale];

export function t(locale: Locale): Dictionary {
	return dictionaries[locale];
}
