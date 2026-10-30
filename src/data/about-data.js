  const snapshot = [
    { label: "Degree", value: "BS Computer Science" },
    { label: "Academic", value: "Consistent Dean's Lister" },
    { label: "Internship", value: "IT Operations Intern at Nexus Technologies" },
    { label: "Thesis Project", value: "FILWA (ML Filipino Writing Assistant)" },
  ];

  const skillsByIntent = {
    build: ["React", "Node.js", "Express", "Java", "JavaScript", "HTML/CSS", "PostgreSQL", "Git/GitHub"],
    operate: ["Postman", "Dynatrace", "System Monitoring"],
    learn: ["Full-stack Development", "REST API integration", "Java Spring Boot", "Gen AI"],
  };

  const timeline = [
    {
      year: "2024",
      title: "Thesis Prototype Development",
      detail:
        "Focused on building our thesis prototype, FILWA: a Filipino Writing Assistant using a RoBERTa model. I worked with HTML/CSS/JavaScript for the frontend, Python for data scraping and ML integration, and Flask for connecting the frontend and backend."
    },
    {
      year: "2025",
      title: "IT Operations Internship",
      detail:
        "Completed my OJT in IT Operations at Nexus Technologies. I trained in CompTIA Server+, Network+, Linux Essentials, and Dynatrace monitoring. The internship was more self-paced and presentation-based, which strengthened my ability to learn independently."
    },
    {
      year: "2026",
      title: "GenC Full-stack Upskilling",
      detail:
        "Started my first role under the Cognizant GenC Program, focusing on full-stack development using React, Node.js, Express, Git/GitHub, HTML/CSS/JavaScript, PostgreSQL, and Generative AI."
    }
  ];


  // Certificate images live in public/certificates/cert-1.webp ... cert-46.webp
  const CERTIFICATE_COUNT = 46;

  const certificates = Array.from(
    { length: CERTIFICATE_COUNT },
    (_, i) => `/certificates/cert-${i + 1}.webp`
  );

  // Duplicated so the marquee can loop seamlessly via translateX(-50%).
  const loopingCertificates = [...certificates, ...certificates];

  export {
    snapshot,
    skillsByIntent,
    timeline,
    certificates,
    loopingCertificates,
    CERTIFICATE_COUNT,
  };