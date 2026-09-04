# Clase 4 - 22/05/2026

## GitFlow y Gestión de Versiones

### Instructor: Brayan

Brayan llegó y nos enseñó a instalar Git Flow, explicando de qué se trata y cómo se usa. A muchos les dio fallas por la versión de GitHub.

Luego íbamos a continuar la clase con el proyecto Django pero hubo problemas con el arranque, vino el descanso y se fue la energía.

Al final se nos paso un documento guia de GitFlow con el que se pudo estudiar de forma independiente: 

Aprendimos el modelo de ramificación **GitFlow**, que es un estándar para la gestión del desarrollo de software con Git. Este modelo propone mantener dos ramas principales permanentes:

- **main** (o master): Contiene solo código probado y listo para producción.
- **develop**: Rama de integración continua donde convergen las nuevas características.

Además, se definen tres tipos de ramas temporales:
- **feature/\***: Para desarrollo de nuevas funcionalidades.
- **release/\***: Para preparación de versiones estables.
- **hotfix/\***: Para correcciones urgentes en producción.

### Comandos esenciales de git-flow
- `git flow init` - Inicializa git-flow en el repositorio
- `git flow feature start <nombre>` - Crea rama feature desde develop
- `git flow feature finish <nombre>` - Fusiona en develop y elimina la rama
- `git flow feature publish <nombre>` - Publica la rama en el remoto
- `git flow release start <version>` - Crea rama de release desde develop
- `git flow release finish <version>` - Merge a main + tag + merge a develop
- `git flow hotfix start <version>` - Crea rama de hotfix desde main
- `git flow hotfix finish <version>` - Merge a main + tag + merge a develop

También vimos las herramientas disponibles para Windows:
- **GitKraken**: Cliente visual con soporte nativo Gitflow (pago).
- **Sourcetree**: Gratuito, desarrollado por Atlassian, con asistente visual.
- **Tower**: Cliente premium con interfaz pulida.
- **GitHub Desktop**: Gratuito, sin soporte nativo para Gitflow.