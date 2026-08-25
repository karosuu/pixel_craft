import type { Locale } from './config';

export type { ServiceId } from './config';
export type AudienceId = 'local' | 'startup';
export type ProcessStepId = 'discover' | 'design' | 'build' | 'qa' | 'launch';

export const dictionaries = {
	en: {
		meta: {
			homeTitle: 'Pixel-Craft — Websites, design, optimization & QA',
			homeDescription:
				'Pixel-Craft crafts websites that look sharp, load fast, and hold up in QA for local businesses and startups.',
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
			eyebrow: 'Web studio',
			titleBefore: 'Sites that look sharp,',
			titleAccent: 'load fast,',
			titleAfter: 'and hold up in QA.',
			body: 'We build new sites, redesign tired ones, and run performance and QA so local businesses and startups can launch without surprises.',
		},
		audiences: {
			title: 'Two kinds of teams. The same meticulous craft.',
			localTitle: 'Local businesses',
			localBody:
				'A site that works on every phone, helps people find you, and makes it easy to call, book, or buy.',
			startupTitle: 'Startups',
			startupBody:
				'A launch-ready site: a clear product story, performance you can stand behind, and QA before you ship.',
		},
		services: {
			title: 'What we do',
			intro: 'Four services, used together or on their own.',
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
					metaTitle: 'Website build — Pixel-Craft',
					metaDescription:
						'New websites with clear structure, responsive design, and a launch checklist. Create your site with Pixel-Craft.',
					hero: 'A new site that is clear, works on a phone, and is ready to launch.',
					problemBody:
						'Without a site — or with one that no longer matches the business — people cannot tell what you offer, how to reach you, or why they should trust you.',
					work: [
						{
							title: 'Structure',
							items: ['Information architecture', 'Key pages and templates', 'Content hierarchy', 'Calls to action'],
						},
						{
							title: 'Build',
							items: ['Responsive implementation', 'Forms and contact paths', 'Analytics', 'Performance baseline'],
						},
						{
							title: 'Launch',
							items: ['Launch checklist', 'Basic QA pass', 'Handoff notes', 'What to maintain next'],
						},
					],
					youGet: [
						'A mapped site structure',
						'Responsive pages ready to publish',
						'Working forms and analytics',
						'A launch checklist and handoff',
					],
					forYou: [
						'You do not have a website yet.',
						'You are launching a new brand or location.',
						'The current site cannot be saved with a refresh.',
						'You need a clear path from first visit to contact.',
					],
				},
				design: {
					title: 'Design improvement',
					summary: 'UI and layout that look current, read clearly, and match how people actually use the site.',
					problem: 'Your site works, but it looks dated, confusing, or unprofessional.',
					solution: 'We improve UI/UX, visual structure, hierarchy, and the experience on every screen.',
					idealFor: ['Existing sites', 'Redesigns', 'Better conversion', 'A stronger mobile experience'],
					cta: 'Improve my site',
					metaTitle: 'Design improvement — Pixel-Craft',
					metaDescription:
						'Refresh UI, hierarchy, and mobile experience so your site looks current and is easier to use.',
					hero: 'Make the site look as current as the business — and easier to use.',
					problemBody:
						'A site can still “work” and still cost you trust: cluttered layout, weak hierarchy, and a mobile view that fights the visitor.',
					work: [
						{
							title: 'UI',
							items: ['Visual refresh', 'Type and color', 'Components', 'Brand consistency'],
						},
						{
							title: 'UX',
							items: ['Page hierarchy', 'Mobile layout', 'Key flows', 'Clickable prototypes when needed'],
						},
						{
							title: 'Conversion',
							items: ['Clearer CTAs', 'Trust cues', 'Readable content blocks', 'Less friction to contact'],
						},
					],
					youGet: [
						'A tighter visual system',
						'Updated key templates',
						'A mobile-first layout pass',
						'Notes on what to keep iterating',
					],
					forYou: [
						'You already have a site.',
						'It looks older than the business.',
						'People bounce or get lost on mobile.',
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
					metaTitle: 'Performance & SEO — Pixel-Craft',
					metaDescription:
						'Faster loads, clearer pages for search and people, and Core Web Vitals work for sites that already exist.',
					hero: 'Make your site load fast, easy to find, and better to use.',
					problemBody:
						'Your site can look fine and still lose people to slow loads, weak structure, SEO gaps, or a painful mobile experience.',
					work: [
						{
							title: 'Performance',
							items: ['Core Web Vitals', 'Image optimization', 'Fonts', 'CSS', 'JavaScript', 'Extra weight'],
						},
						{
							title: 'SEO',
							items: ['Titles', 'Meta descriptions', 'Headings', 'Sitemap', 'Indexing', 'Structured data'],
						},
						{
							title: 'Accessibility',
							items: ['Contrast', 'Navigation', 'Semantic HTML', 'Forms'],
						},
					],
					youGet: [
						'An initial audit',
						'A list of issues found',
						'Fixes and improvements shipped',
						'A before/after snapshot',
						'What to do next',
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
					metaTitle: 'Web QA — Pixel-Craft',
					metaDescription:
						'Functional, responsive, and browser testing with a clear bug list before you launch or ship a change.',
					hero: 'Find what breaks before your customers do.',
					problemBody:
						'Launch and big releases hide issues that only show up on someone else’s phone, browser, or form path — and then they become support tickets.',
					work: [
						{
							title: 'Coverage',
							items: ['Device and browser matrix', 'Breakpoints', 'Key user paths', 'Ecommerce flows when needed'],
						},
						{
							title: 'Functional',
							items: ['Forms', 'Navigation', 'Errors and 404s', 'Broken links'],
						},
						{
							title: 'Report',
							items: ['Severity', 'Repro steps', 'Punch list', 'What blocks launch'],
						},
					],
					youGet: [
						'A test pass on agreed browsers and sizes',
						'A bug list with severity and repro',
						'Broken-link and 404 notes',
						'A clear go / no-go for launch',
					],
					forYou: [
						'You are about to launch.',
						'You just shipped a large change.',
						'Forms, checkout, or booking must work.',
						'You already see bugs and need them listed.',
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
			intro: 'Client work will appear here as we publish new case studies.',
			placeholderNote: 'Sample',
			visitSite: 'Visit site',
			comingSoonTitle: 'Coming soon',
			comingSoonBody:
				'We are preparing the first case studies. Check back shortly — or start a project and be next on this page.',
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
			need: 'I need',
			message: 'Message',
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
				build: 'Website build',
				design: 'Design improvement',
				optimize: 'Performance & SEO',
				qa: 'Web QA',
			},
			subject: 'Pixel-Craft project inquiry',
			honeypot: 'Do not fill',
			selectPlaceholder: 'Choose one',
			contextual: {
				title: 'Tell us about your site',
				intro: 'With this we can tell you what this service needs.',
				serviceLabel: 'Service',
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
			homeTitle: 'Pixel-Craft — Sitios web, diseño, optimización y QA',
			homeDescription:
				'Pixel-Craft diseña sitios que se ven profesionales, cargan rápido y pasan QA para negocios locales y startups.',
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
			eyebrow: 'Estudio web',
			titleBefore: 'Sitios que se ven profesionales,',
			titleAccent: 'cargan rápido',
			titleAfter: 'y pasan QA.',
			body: 'Creamos sitios nuevos, rediseñamos los que ya se vieron viejos y corremos rendimiento y QA para que negocios locales y startups lancen sin sorpresas.',
		},
		audiences: {
			title: 'Dos tipos de equipo. El mismo oficio meticuloso.',
			localTitle: 'Negocios locales',
			localBody:
				'Un sitio que funciona en cualquier celular, te ayuda a aparecer en búsquedas y facilita llamar, reservar o comprar.',
			startupTitle: 'Startups',
			startupBody:
				'Un sitio listo para lanzar: historia clara del producto, rendimiento defendible y QA antes de salir.',
		},
		services: {
			title: 'Qué hacemos',
			intro: 'Cuatro servicios, juntos o por separado.',
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
					metaTitle: 'Creación de sitios — Pixel-Craft',
					metaDescription:
						'Sitios nuevos con estructura clara, diseño responsive y un lanzamiento ordenado. Crea tu sitio con Pixel-Craft.',
					hero: 'Un sitio nuevo que se entiende, funciona en el celular y está listo para lanzar.',
					problemBody:
						'Sin un sitio — o con uno que ya no representa al negocio — la gente no entiende qué ofreces, cómo contactarte ni por qué confiar.',
					work: [
						{
							title: 'Estructura',
							items: ['Arquitectura de información', 'Páginas y plantillas clave', 'Jerarquía de contenido', 'Llamados a la acción'],
						},
						{
							title: 'Construcción',
							items: ['Implementación responsive', 'Formularios y contacto', 'Analítica', 'Piso de rendimiento'],
						},
						{
							title: 'Lanzamiento',
							items: ['Lista de launch', 'Pase básico de QA', 'Notas de entrega', 'Qué mantener después'],
						},
					],
					youGet: [
						'Una estructura de sitio mapeada',
						'Páginas responsive listas para publicar',
						'Formularios y analítica funcionando',
						'Checklist de lanzamiento y entrega',
					],
					forYou: [
						'Aún no tienes sitio web.',
						'Lanzas una marca o sucursal nueva.',
						'El sitio actual no se salva con un refresh.',
						'Necesitas un camino claro de la visita al contacto.',
					],
				},
				design: {
					title: 'Mejora de diseño',
					summary: 'Interfaz y layout actuales, fáciles de leer y alineados con cómo se usa el sitio.',
					problem: 'Tu sitio funciona, pero se ve desactualizado, confuso o poco profesional.',
					solution: 'Mejoramos UI/UX, estructura visual, jerarquía y experiencia de usuario.',
					idealFor: ['Sitios existentes', 'Rediseños', 'Mejorar conversión', 'Mejorar experiencia móvil'],
					cta: 'Mejorar mi sitio',
					metaTitle: 'Mejora de diseño — Pixel-Craft',
					metaDescription:
						'Refrescamos UI, jerarquía y móvil para que tu sitio se vea actual y sea más fácil de usar.',
					hero: 'Que el sitio se vea tan actual como el negocio — y sea más fácil de usar.',
					problemBody:
						'Un sitio puede “funcionar” y aun así costarte confianza: layout saturado, jerarquía débil y un móvil que pelea con quien visita.',
					work: [
						{
							title: 'UI',
							items: ['Refresco visual', 'Tipografía y color', 'Componentes', 'Consistencia de marca'],
						},
						{
							title: 'UX',
							items: ['Jerarquía de página', 'Layout móvil', 'Flujos clave', 'Prototipos clicables cuando hacen falta'],
						},
						{
							title: 'Conversión',
							items: ['CTAs más claros', 'Señales de confianza', 'Bloques legibles', 'Menos fricción para contactar'],
						},
					],
					youGet: [
						'Un sistema visual más cerrado',
						'Plantillas clave actualizadas',
						'Un pase mobile-first',
						'Notas de qué seguir iterando',
					],
					forYou: [
						'Ya tienes un sitio.',
						'Se ve más viejo que el negocio.',
						'La gente se pierde o se va en móvil.',
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
					metaTitle: 'Optimización y SEO — Pixel-Craft',
					metaDescription:
						'Cargas más rápidas, páginas más claras para Google y para personas, y trabajo de Core Web Vitals en sitios que ya existen.',
					hero: 'Haz que tu sitio cargue rápido, sea fácil de encontrar y funcione mejor.',
					problemBody:
						'Tu sitio puede verse bien y aun así estar perdiendo usuarios por velocidad, estructura, SEO o una mala experiencia móvil.',
					work: [
						{
							title: 'Rendimiento',
							items: ['Core Web Vitals', 'Optimización de imágenes', 'Fuentes', 'CSS', 'JavaScript', 'Recursos'],
						},
						{
							title: 'SEO',
							items: ['Titles', 'Meta descriptions', 'Headings', 'Sitemap', 'Indexación', 'Structured data'],
						},
						{
							title: 'Accesibilidad',
							items: ['Contraste', 'Navegación', 'HTML semántico', 'Formularios'],
						},
					],
					youGet: [
						'Auditoría inicial',
						'Identificación de problemas',
						'Correcciones y mejoras implementadas',
						'Comparativa antes/después',
						'Recomendaciones',
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
					metaTitle: 'QA web — Pixel-Craft',
					metaDescription:
						'Pruebas funcionales, responsive y de navegadores, con una lista clara de bugs antes de lanzar o publicar un cambio.',
					hero: 'Encuentra lo que se rompe antes de que lo encuentren tus clientes.',
					problemBody:
						'El launch y los cambios grandes esconden fallas que solo aparecen en el celular, el navegador o el formulario de otra persona — y luego se vuelven tickets.',
					work: [
						{
							title: 'Cobertura',
							items: ['Matriz de dispositivos y navegadores', 'Breakpoints', 'Caminos clave', 'Flujos de e-commerce si aplican'],
						},
						{
							title: 'Funcional',
							items: ['Formularios', 'Navegación', 'Errores y 404', 'Enlaces rotos'],
						},
						{
							title: 'Reporte',
							items: ['Severidad', 'Pasos para reproducir', 'Lista de ajustes', 'Qué bloquea el launch'],
						},
					],
					youGet: [
						'Un pase de pruebas en navegadores y tamaños acordados',
						'Lista de bugs con severidad y repro',
						'Notas de enlaces rotos y 404',
						'Un go / no-go claro para lanzar',
					],
					forYou: [
						'Estás por lanzar.',
						'Acabas de publicar un cambio grande.',
						'Formularios, checkout o reservas tienen que funcionar.',
						'Ya ves errores y necesitas listarlos.',
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
			intro: 'El trabajo con clientes aparecerá aquí cuando publiquemos los casos.',
			placeholderNote: 'Ejemplo',
			visitSite: 'Ver sitio',
			comingSoonTitle: 'Próximamente',
			comingSoonBody:
				'Estamos preparando los primeros casos. Vuelve pronto — o inicia un proyecto y sé el siguiente en esta página.',
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
			need: 'Necesito',
			message: 'Mensaje',
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
				build: 'Creación de sitios',
				design: 'Mejora de diseño',
				optimize: 'Optimización y SEO',
				qa: 'QA web',
			},
			subject: 'Consulta de proyecto Pixel-Craft',
			honeypot: 'No completar',
			selectPlaceholder: 'Elige una opción',
			contextual: {
				title: 'Cuéntanos sobre tu sitio',
				intro: 'Con estos datos podemos decirte qué necesita este servicio.',
				serviceLabel: 'Servicio',
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
