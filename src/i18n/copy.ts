import type { Locale } from './config';

export type ServiceId = 'build' | 'design' | 'optimize' | 'qa';
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
				'Website build, design improvement, performance and SEO, and web QA for local businesses and startups.',
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
			title: 'Ready for a site that can take scrutiny?',
			body: 'Tell us if you are a local business or a startup, and what you need: build, design, optimize, or QA.',
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
				'Creación de sitios, mejora de diseño, rendimiento y SEO, y QA web para negocios locales y startups.',
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
			title: '¿Listo para un sitio que resista revisión?',
			body: 'Cuéntanos si eres un negocio local o una startup, y qué necesitas: crear, diseñar, optimizar o QA.',
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
