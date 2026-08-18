export function filterProjects(projects, searchValue = "", filter = "all") {
  const query = searchValue.trim().toLowerCase();

  return projects.filter(project => {
    const text = `${project.dataset.category || ""} ${project.textContent || ""}`.toLowerCase();
    const matchesSearch = !query || text.includes(query);
    const matchesFilter = filter === "all" || (project.dataset.category || "").includes(filter);
    return matchesSearch && matchesFilter;
  });
}

export function createCommandPaletteItems() {
  return [
    { label: "About", description: "Jump to the story section", href: "#about" },
    { label: "Skills", description: "See the technical focus areas", href: "#skills" },
    { label: "Experience", description: "Open the timeline", href: "#experience" },
    { label: "Projects", description: "Browse the featured work", href: "#projects" },
    { label: "Contact", description: "Open the contact area", href: "#contact" },
    { label: "Toggle theme", description: "Switch between dark and light mode", action: "theme" },
    { label: "Download resume", description: "Open the current resume summary", action: "resume" }
  ];
}
