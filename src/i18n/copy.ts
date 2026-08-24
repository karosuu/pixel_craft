import type { Locale } from './config';

export type ServiceId = 'build' | 'design' | 'optimize' | 'qa';
export type AudienceId = 'local' | 'startup';
export type ProcessStepId = 'discover' | 'design' | 'build' | 'qa' | 'launch';

export const dictionaries = {
	en: {
		meta: {
			homeTitle: 'Pixel-Craft — Websites, design, optimization & QA',
			homeDescription:
				'Pixel-Craft crafts websites that look sharp, load fast, and hold up in QA for local businesses and startups in the United States, Mexico, and Latin America.',
			servicesTitle: 'Services — Pixel-Craft',
			servicesDescription:
				'Website build, design improvement, performance and SEO, and web QA for local businesses and startups.',
			workTitle: 'Work — Pixel-Craft',
			workDescription: 'Selected Pixel-Craft projects for local businesses and startups.',
			aboutTitle: 'About — Pixel-Craft',
			aboutDescription:
				'Pixel-Craft is a web studio for local businesses and startups across the United States, Mexico, and Latin America.',
			contactTitle: 'Contact — Pixel-Craft',
			contactDescription: 'Start a Pixel-Craft project: build, design, optimization, or web QA.',
		},
		nav: {
			home: 'Home',
			services: 'Services',
			work: 'Work',
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
			ctaSecondary: 'See our work',
			learnMore: 'Learn more',
			regions: 'United States · Mexico · Latin America',
			brandAlt: 'Pixel-Craft',
			openMenu: 'Open menu',
			closeMenu: 'Close menu',
		},
		hero: {
			eyebrow: 'Web studio',
			titleBefore: 'Sites that look sharp,',
			titleAccent: 'load fast,',
			titleAfter: 'and hold up in QA.',
			body: 'Pixel-Craft builds, redesigns, and hardens websites for local businesses and startups across the United States, Mexico, and Latin America.',
		},
		audiences: {
			title: 'Two kinds of teams. The same craft.',
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
			forLocal: 'For local businesses',
			forStartup: 'For startups',
			items: {
				build: {
					title: 'Website build',
					summary: 'New sites from a clear brief: structure, design, and a launch that actually works.',
					local: 'Storefronts, service sites, and booking or contact flows that feel simple on a phone.',
					startup: 'Marketing and product sites that explain the offer and are ready to iterate after launch.',
					deliverables: [
						'Information architecture and page templates',
						'Responsive implementation',
						'Analytics and form wiring',
						'Launch checklist and handoff',
					],
				},
				design: {
					title: 'Design improvement',
					summary: 'UI and layout that look current, read clearly, and match how people actually use the site.',
					local: 'Trust, clarity, and a brand that looks as solid as the business behind it.',
					startup: 'A tighter visual system so the product story feels finished, not improvised.',
					deliverables: [
						'Visual refresh and component polish',
						'Mobile-first layout fixes',
						'Brand-consistent type and color',
						'Clickable prototypes when needed',
					],
				},
				optimize: {
					title: 'Performance & SEO',
					summary: 'Faster pages, cleaner markup, and the basics that help search and Core Web Vitals.',
					local: 'Be findable nearby, load quickly on cellular, and keep visitors from bouncing.',
					startup: 'Ship a site that does not tank conversion or Lighthouse scores on day one.',
					deliverables: [
						'Core Web Vitals pass',
						'Image, font, and script hygiene',
						'On-page SEO and metadata',
						'Accessibility baseline',
					],
				},
				qa: {
					title: 'Web QA',
					summary: 'Cross-browser, responsive, and functional checks so launch is not a surprise.',
					local: 'Forms, maps, hours, and mobile layouts verified before customers hit them.',
					startup: 'Regression coverage on critical flows before investors, users, or press arrive.',
					deliverables: [
						'Device and browser matrix',
						'Functional and form testing',
						'Broken-link and 404 sweep',
						'Bug list with severity and repro',
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
			title: 'Selected work',
			intro: 'Placeholder case studies for the first release. Real projects replace these next.',
			placeholderNote: 'Sample',
			cases: [
				{
					tag: 'local',
					title: 'Neighborhood clinic site refresh',
					summary:
						'Clearer services, hours, and contact on every phone size — plus a faster first load for search traffic.',
					result: 'Design + optimize + QA',
				},
				{
					tag: 'startup',
					title: 'SaaS launch landing page',
					summary:
						'A product story that fits one screen, a working waitlist form, and a QA pass before the first campaign.',
					result: 'Build + QA',
				},
				{
					tag: 'local',
					title: 'Restaurant menu and booking',
					summary:
						'A bilingual-ready layout, menu that does not fight the phone, and booking that does not drop on Safari.',
					result: 'Build + design + QA',
				},
			],
		},
		about: {
			title: 'About Pixel-Craft',
			lede: 'We are a web studio for teams that need the site to work as well as it looks.',
			body: [
				'Pixel-Craft helps local businesses look trustworthy online and helps startups ship a site that can take real traffic. The name stays Pixel-Craft in every language; the craft is the same in every market.',
				'We build new sites, improve design that has aged, make pages faster and easier to find, and run QA so launch day is boring in the best way.',
				'We work with clients in the United States, Mexico, and across Latin America — in English or Spanish, whichever you use with your customers.',
			],
			regionsTitle: 'Where we work',
			regionsBody:
				'Remote-first across the United States, Mexico, and Latin America. Time zones and language are part of the brief, not an afterthought.',
		},
		cta: {
			title: 'Ready for a site that can take scrutiny?',
			body: 'Tell us if you are a local business or a startup, and what you need: build, design, optimize, or QA.',
			button: 'Start a project',
		},
		contact: {
			title: 'Start a project',
			intro: 'Send a short brief. Your email app will open with a message addressed to Pixel-Craft.',
			name: 'Name',
			email: 'Email',
			website: 'Website',
			websiteHint: 'Optional',
			audience: 'I am',
			need: 'I need',
			message: 'Message',
			submit: 'Open email to Pixel-Craft',
			mailtoNote: 'No account required. We reply in the language of this page unless you ask otherwise.',
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
		},
		footer: {
			tagline: 'Websites, design, optimization, and QA.',
			rights: 'All rights reserved.',
		},
	},
	es: {
		meta: {
			homeTitle: 'Pixel-Craft — Sitios web, diseño, optimización y QA',
			homeDescription:
				'Pixel-Craft diseña sitios que se ven profesionales, cargan rápido y pasan QA para negocios locales y startups en Estados Unidos, México y Latinoamérica.',
			servicesTitle: 'Servicios — Pixel-Craft',
			servicesDescription:
				'Creación de sitios, mejora de diseño, rendimiento y SEO, y QA web para negocios locales y startups.',
			workTitle: 'Proyectos — Pixel-Craft',
			workDescription: 'Proyectos seleccionados de Pixel-Craft para negocios locales y startups.',
			aboutTitle: 'Nosotros — Pixel-Craft',
			aboutDescription:
				'Pixel-Craft es un estudio web para negocios locales y startups en Estados Unidos, México y Latinoamérica.',
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
			regions: 'Estados Unidos · México · Latinoamérica',
			brandAlt: 'Pixel-Craft',
			openMenu: 'Abrir menú',
			closeMenu: 'Cerrar menú',
		},
		hero: {
			eyebrow: 'Estudio web',
			titleBefore: 'Sitios que se ven profesionales,',
			titleAccent: 'cargan rápido',
			titleAfter: 'y pasan QA.',
			body: 'Pixel-Craft crea, rediseña y fortalece sitios web para negocios locales y startups en Estados Unidos, México y Latinoamérica.',
		},
		audiences: {
			title: 'Dos tipos de equipo. El mismo oficio.',
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
			forLocal: 'Para negocios locales',
			forStartup: 'Para startups',
			items: {
				build: {
					title: 'Creación de sitios',
					summary: 'Sitios nuevos desde un brief claro: estructura, diseño y un lanzamiento que sí funciona.',
					local: 'Vitrinas, sitios de servicios y flujos de reserva o contacto simples en el celular.',
					startup: 'Sitios de producto o marketing que explican la oferta y se pueden iterar después del launch.',
					deliverables: [
						'Arquitectura de información y plantillas',
						'Implementación responsive',
						'Analítica y formularios',
						'Lista de lanzamiento y entrega',
					],
				},
				design: {
					title: 'Mejora de diseño',
					summary: 'Interfaz y layout actuales, fáciles de leer y alineados con cómo se usa el sitio.',
					local: 'Confianza, claridad y una marca que se ve tan sólida como el negocio.',
					startup: 'Un sistema visual más cerrado para que la historia del producto se sienta terminada.',
					deliverables: [
						'Refresco visual y pulido de componentes',
						'Ajustes de layout mobile-first',
						'Tipografía y color consistentes',
						'Prototipos clicables cuando hacen falta',
					],
				},
				optimize: {
					title: 'Optimización y SEO',
					summary: 'Páginas más rápidas, markup limpio y lo básico para búsqueda y Core Web Vitals.',
					local: 'Que te encuentren cerca, que cargue en datos móviles y que la gente no se vaya.',
					startup: 'Un sitio que no hunda la conversión ni las métricas el día uno.',
					deliverables: [
						'Core Web Vitals en orden',
						'Imágenes, fuentes y scripts bajo control',
						'SEO on-page y metadatos',
						'Piso de accesibilidad',
					],
				},
				qa: {
					title: 'QA web',
					summary: 'Pruebas en navegadores, tamaños y flujos para que el lanzamiento no sea una sorpresa.',
					local: 'Formularios, mapas, horarios y móviles revisados antes de que lleguen clientes.',
					startup: 'Regresión en flujos críticos antes de usuarios, prensa o inversionistas.',
					deliverables: [
						'Matriz de dispositivos y navegadores',
						'Pruebas funcionales y de formularios',
						'Revisión de enlaces rotos y 404',
						'Lista de bugs con severidad y pasos',
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
			intro: 'Casos de ejemplo para la primera versión. Los proyectos reales los sustituyen después.',
			placeholderNote: 'Ejemplo',
			cases: [
				{
					tag: 'local',
					title: 'Rediseño de clínica de barrio',
					summary:
						'Servicios, horarios y contacto claros en cualquier celular, y una primera carga más rápida para quien llega desde Google.',
					result: 'Diseño + optimización + QA',
				},
				{
					tag: 'startup',
					title: 'Landing de lanzamiento SaaS',
					summary:
						'La historia del producto en una pantalla, lista de espera funcionando y un pase de QA antes de la primera campaña.',
					result: 'Creación + QA',
				},
				{
					tag: 'local',
					title: 'Menú y reservas de restaurante',
					summary:
						'Layout listo para dos idiomas, menú que no pelea con el celular y reservas que no fallan en Safari.',
					result: 'Creación + diseño + QA',
				},
			],
		},
		about: {
			title: 'Sobre Pixel-Craft',
			lede: 'Somos un estudio web para equipos que necesitan que el sitio funcione tan bien como se ve.',
			body: [
				'Pixel-Craft ayuda a negocios locales a verse confiables en internet y a startups a lanzar un sitio que aguante tráfico real. El nombre es Pixel-Craft en cualquier idioma; el oficio es el mismo en cada mercado.',
				'Creamos sitios nuevos, mejoramos diseños que ya se vieron viejos, hacemos que las páginas carguen y se encuentren mejor, y corremos QA para que el día del lanzamiento sea aburrido — en el mejor sentido.',
				'Trabajamos con clientes en Estados Unidos, México y el resto de Latinoamérica, en inglés o en español, el idioma con el que hablas con tus clientes.',
			],
			regionsTitle: 'Dónde trabajamos',
			regionsBody:
				'Remoto en Estados Unidos, México y Latinoamérica. Los husos horarios y el idioma van en el brief, no como extra.',
		},
		cta: {
			title: '¿Listo para un sitio que resista revisión?',
			body: 'Cuéntanos si eres un negocio local o una startup, y qué necesitas: crear, diseñar, optimizar o QA.',
			button: 'Iniciar un proyecto',
		},
		contact: {
			title: 'Iniciar un proyecto',
			intro: 'Envía un brief corto. Se abrirá tu correo con un mensaje dirigido a Pixel-Craft.',
			name: 'Nombre',
			email: 'Correo',
			website: 'Sitio web',
			websiteHint: 'Opcional',
			audience: 'Soy',
			need: 'Necesito',
			message: 'Mensaje',
			submit: 'Abrir correo a Pixel-Craft',
			mailtoNote: 'No necesitas una cuenta. Respondemos en el idioma de esta página, salvo que indiques otra cosa.',
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
		},
		footer: {
			tagline: 'Sitios web, diseño, optimización y QA.',
			rights: 'Todos los derechos reservados.',
		},
	},
};

export type Dictionary = (typeof dictionaries)[Locale];

export function t(locale: Locale): Dictionary {
	return dictionaries[locale];
}
