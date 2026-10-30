

const projects = [
    {
      id: "filwa",
      title: "FILWA | Filipino Digital Writing Assistant",
      summary:
        "A web-based Filipino writing assistant that helps users compose clearer Filipino text with ML-assisted suggestions.",
      tech: ["Python", "Pandas", "Machine Learning", "Flask"],
      image: "/projects/project-1.webp",
      demoUrl: "https://drive.google.com/file/d/13VQmBYPZUsT1zMSBkQBy6sbS5PBO0ZSM/view?usp=sharing",
      // This link is a recorded walkthrough, not a running app -- labelling it
      // "Live Demo" would send visitors somewhere they don't expect.
      demoLabel: "Watch Demo",
      repoUrl: "https://github.com/Ken-ctrl10/filwa",
      featured: true,
    },
    {
      id: "news-app",
      title: "NewsApp",
      summary:
        "A full-stack news platform with user authentication, article browsing, search/filter features, favorites management, and protected user flows.",
      tech: ["React", "Vite", "Node.js", "Express", "MongoDB Atlas", "Mongoose", "Express Session", "REST API", "CSS"],
      image: "/projects/project-2.webp",
      demoUrl: "https://news-app-files.vercel.app/",
      repoUrl: "https://github.com/Ken-ctrl10/NEWS-APP-FILES",
      featured: false,
    },
    {
      id: "quiz-app",
      title: "Simple Quiz App",
      summary:
        "A topic-based quiz app with timer, difficulty levels, randomized questions, score tracking, streaks, and result analytics.",
      tech: ["React", "Vite", "JavaScript", "CSS", "localStorage"],
      image: "/projects/project-3.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    },
    {
      id: "keeper-notes",
      title: "Keeper App",
      summary:
        "A simple note-taking app where users can create and delete notes in a clean card-based interface.",
      tech: ["React", "Vite", "JavaScript", "CSS", "MUI"],
      image: "/projects/project-4.webp",
      demoUrl: "",
      repoUrl: "",
      featured: false,
    }

  ];

  const featuredProject = projects.find((project) => project.featured);
  const secondaryProjects = projects.filter((project) => !project.featured);

  export { projects, featuredProject, secondaryProjects };