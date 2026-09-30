# Video Creator Pro

Video Creator Pro is a modern web application designed for creators who want to turn ideas into polished video projects. The website is built as a clean, responsive product experience that feels professional and focused on productivity, creativity, and content production.

## About this website

This project presents a video-creation platform where users can manage content ideas, explore workflows, and work in a streamlined environment built around modern web UX. The interface is intentionally polished and easy to navigate so that creative work can feel organized rather than overwhelming.

Although the current repository is a starting point and not a complex full-stack video editor yet, it is structured as a scalable frontend product and is ready for further feature development. It combines a modern React + TypeScript stack with a clean design system, making it ideal for expanding into a more advanced video creation workflow.

## What this app is intended to do

The purpose of the website is to provide a strong foundation for a tool that helps users:

- plan and organize video ideas
- create content-focused workflows
- manage creative projects in a structured dashboard
- present a modern brand experience for a video platform
- expand into a more advanced editor or production workflow over time

## Main product features

- Modern landing-page style experience
- Responsive and mobile-friendly layout
- Clean, premium visual design
- Reusable UI components with a component-driven structure
- Fast local development with Vite
- Type-safe frontend architecture using TypeScript
- File-based routing via TanStack Start/TanStack Router
- Accessible UI primitives from Radix
- Styling and design system via Tailwind CSS

## Live application

The deployed project is available here:

https://heronai.lovable.app

## Tech stack

This project uses the following technologies:

- React 19
- TypeScript
- Vite
- TanStack Start
- TanStack Router
- Tailwind CSS
- Radix UI
- Lucide React
- React Hook Form
- Zod
- Recharts

## Project structure

```text
heronai/
├── src/
│   ├── components/
│   ├── routes/
│   ├── lib/
│   └── styles/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
└── public/
```

The app follows a modern frontend structure and uses file-based routing. Route files are organized inside `src/routes/`, and the app shell is managed through the root route file.

## Development

### Prerequisites

- Node.js
- npm

You can install Node.js using nvm if needed:

https://github.com/nvm-sh/nvm#installing-and-updating

### Install dependencies

```bash
git clone https://github.com/Muhammad-Ahmad-CO/heronai.git
cd heronai
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local development URL shown in the terminal.

## Available scripts

```bash
npm run dev
npm run build
npm run build:dev
npm run preview
npm run lint
npm run format
```

### Script meaning

- `npm run dev` — starts the app locally
- `npm run build` — creates a production build
- `npm run build:dev` — creates a development build
- `npm run preview` — previews the production build
- `npm run lint` — runs code checks
- `npm run format` — formats the project using Prettier

## Lovable integration

This project was created with Lovable and is connected to the Lovable editor for ongoing development.

- Project website: https://lovable.dev
- Lovable project link: https://lovable.dev/projects/b058a2fc-d7bd-448a-9cd9-2aa33aaf031b

Lovable syncs changes directly into this GitHub repository, helping maintain a development flow between the design/editor environment and code.

## Notes

This repository is a strong foundation for a creator-focused platform and can be expanded into a real portfolio, content workflow tool, or full video-generation product. The current codebase already demonstrates a modern frontend architecture and a premium design style suitable for fast iteration.

## License

No explicit license is currently defined in the repository.
