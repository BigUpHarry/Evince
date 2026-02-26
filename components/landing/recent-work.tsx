"use client"

import { useState } from "react"

const projects = [
  {
    id: 1,
    title: "Modern Family Residence",
    location: "Mount Maunganui",
    vimeoId: "1167590478",
  },
  {
    id: 2,
    title: "Boutique Hotel Experience",
    location: "New Plymouth",
    vimeoId: "1161372252",
  },
  {
    id: 3,
    title: "Rural Lifestyle Estate",
    location: "Taranaki",
    vimeoId: "1167588372",
  },
]

function buildVimeoUrl(id: string) {
  return `https://player.vimeo.com/video/${id}?background=1&autopause=0&transparent=0&title=0&byline=0&portrait=0&controls=0&dnt=1`
}

export function RecentWork() {
  const [activeProject, setActiveProject] = useState(0)

  return (
    <section id="work" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-4">
            Recent Work
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground text-balance">
            Live it before you arrive
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-foreground/5">
            <iframe
              key={projects[activeProject].id}
              src={buildVimeoUrl(projects[activeProject].vimeoId)}
              className="absolute inset-0 w-full h-full scale-[1.35] origin-center"
              allow="autoplay; fullscreen"
              title={`${projects[activeProject].title} — ${projects[activeProject].location}`}
            />

            {/* Project info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6 md:p-8 pointer-events-none z-10">
              <h3 className="text-card text-xl md:text-2xl font-semibold">
                {projects[activeProject].title}
              </h3>
              <p className="text-card/70 text-sm mt-1">
                {projects[activeProject].location}
              </p>
            </div>
          </div>

          {/* Project selector */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeProject === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {project.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
