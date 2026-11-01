/**
 * Bidirectional content dictionary (EN <-> FR) for database-driven items
 * (Skills, Testimonials, Projects, Educations, Certificates, Blog Posts, Categories, etc.).
 * Ensures instant 0ms switching between English and French across the entire site.
 */

export const EN_TO_FR_CONTENT: Record<string, string> = {
  // Hero & Site Settings custom DB values
  "Adaptable · Software · Engineer": "Ingénieure · Logiciel · Adaptable",
  "Building digital": "Concevoir l'élégance",
  "elegance": "numérique",
  "through technical precision.": "par la rigueur technique.",
  "I'm Line Morelle. I architect high-performance web applications and scalable systems with a focus on minimalist aesthetics and robust engineering.":
    "Je suis Line Morelle. Je conçois des applications web haute performance et des systèmes évolutifs alliant esthétique minimaliste et ingénierie de pointe.",
  "I'm Line Morelle I turn complex ideas into high-performance digital experiences. I architect scalable web applications where minimalist design meets precision engineering, building systems that are as elegant as they are powerful.":
    "Je suis Line Morelle. Je transforme des idées complexes en expériences numériques haute performance. Je conçois des applications web évolutives où le design minimaliste rencontre l'ingénierie de précision, pour bâtir des systèmes aussi élégants que puissants.",
  "Available for new projects": "Disponible pour de nouveaux projets",
  "Expertise": "Expertise",
  "Technical Mastery": "Maîtrise Technique",
  "Portfolio": "Portfolio",
  "Featured Works": "Projets Phares",
  "Client Endorsement": "Témoignage Client",
  "Endorsement": "Témoignage",
  "View All Projects": "Voir tous les projets",
  "Explore All Projects": "Explorer tous les projets",
  "Start a Conversation": "Démarrer une conversation",
  "Send an Email": "Envoyer un e-mail",
  "Zürich, Switzerland": "Zurich, Suisse",
  "Lausanne, Switzerland": "Lausanne, Suisse",

  // Home & Projects Skills / Expertise & Philosophy
  "Front-end Engineering": "Ingénierie Front-end",
  "Crafting responsive, accessible interfaces with React, Next.js, and TypeScript — prioritizing performance and refined user experience.":
    "Conception d'interfaces réactives et accessibles avec React, Next.js et TypeScript — en privilégiant la performance et une expérience utilisateur soignée.",
  "Backend Architecture": "Architecture Backend",
  "Designing resilient APIs and service layers with Node.js, Go, and microservices patterns built for scale and maintainability.":
    "Conception d'APIs résilientes et de couches de services avec Node.js, Go et des architectures microservices taillées pour la montée en charge et la maintenabilité.",
  "Cloud Infrastructure": "Infrastructure Cloud",
  "Provisioning and optimizing cloud environments across AWS and GCP with Docker, Kubernetes, and infrastructure as code.":
    "Provisionnement et optimisation d'environnements cloud sur AWS et GCP avec Docker, Kubernetes et l'infrastructure as code.",
  "Data Systems": "Systèmes de Données",
  "Modeling and operating SQL and NoSQL stores — PostgreSQL, MongoDB, and pipelines that keep data reliable and available.":
    "Modélisation et exploitation de bases SQL et NoSQL — PostgreSQL, MongoDB et pipelines garantissant la fiabilité et la disponibilité des données.",
  "Performance": "Performance",
  "Optimization at every level of the stack.":
    "Optimisation à chaque niveau de la pile technique.",
  "Scalability": "Scalabilité",
  "Architecting for growth and high-concurrency.":
    "Architecture pensée pour la croissance et la haute concurrence.",

  // Testimonials
  "Line has an extraordinary ability to translate complex business requirements into seamless digital products.":
    "Line possède une capacité extraordinaire à traduire des besoins métiers complexes en produits numériques fluides et élégants.",
  "Product Director @ InnovateUI": "Directrice Produit @ InnovateUI",

  // Project Categories, Badges & Buttons
  "Featured Project": "Projet Phare",
  "FINTECH / SaaS": "FINTECH / SaaS",
  "E-COMMERCE": "E-COMMERCE",
  "DATA VISUALIZATION": "VISUALISATION DE DONNÉES",
  "SYSTEM DESIGN": "CONCEPTION SYSTÈME",
  "FRONTEND": "FRONTEND",
  "SAAS": "SAAS",
  "ALL WORK": "TOUS LES PROJETS",
  "View Live Project": "Voir le projet en ligne",
  "Case Study": "Étude de cas",
  "Explore Project": "Explorer le projet",
  "View Live": "Voir en ligne",
  "Details": "Détails",
  "Live site": "Site en direct",

  // Projects (Titles, Summaries, Descriptions)
  "SalesBoost (Sales and lead follow up platform)":
    "SalesBoost (Plateforme de suivi commercial et de prospects)",
  "Lumina Dashboard": "Tableau de bord Lumina",
  "A comprehensive financial analytics dashboard that turns complex market data into clear, actionable insights for decision-makers.":
    "Un tableau de bord d'analyse financière complet qui transforme des données de marché complexes en indicateurs clairs et exploitables pour les décideurs.",
  "A high-performance financial analytics platform featuring real-time data streaming and complex SVG-based visualizations. Built with a focus on atomic design and scalable state management.":
    "Une plateforme d'analyse financière haute performance intégrant du streaming de données en temps réel et des visualisations SVG avancées. Conçue autour de l'atomic design et d'une gestion d'état évolutive.",

  "Veloce Commerce": "Veloce Commerce",
  "A high-conversion commerce platform with real-time inventory, seamless checkout, and resilient payment orchestration.":
    "Une plateforme e-commerce à forte conversion avec gestion des stocks en temps réel, tunnel d'achat fluide et orchestration résiliente des paiements.",
  "A headless e-commerce engine optimized for sub-second page loads. Implemented a custom caching layer and a seamless cross-platform checkout experience.":
    "Un moteur e-commerce headless optimisé pour des chargements en moins d'une seconde. Mise en place d'une couche de cache sur mesure et d'une expérience de paiement multi-plateforme fluide.",

  "Nova Analytics": "Nova Analytics",
  "An interactive analytics suite that visualizes large datasets with fluid charts and serverless data processing.":
    "Une suite analytique interactive permettant de visualiser de grands volumes de données grâce à des graphiques fluides et un traitement serverless.",
  "Real-time monitoring tool for infrastructure health. Processes millions of events per second using a distributed architecture to provide actionable insights in an elegant UI.":
    "Outil de surveillance en temps réel de la santé des infrastructures. Traite des millions d'événements par seconde via une architecture distribuée pour offrir des indicateurs exploitables dans une interface élégante.",

  "Aether OS": "Aether OS",
  "A conceptual operating system designed for creative professionals.":
    "Un système d'exploitation conceptuel conçu pour les professionnels de la création.",
  "A conceptual operating system designed for creative professionals. Focuses on spatial layout, fluid typography, and hardware-accelerated interface components.":
    "Un système d'exploitation conceptuel conçu pour les professionnels de la création. Met l'accent sur l'organisation spatiale, la typographie fluide et des composants d'interface accélérés matériellement.",
  "A research-driven desktop interface exploring new interaction models for spatial computing and creative workflows. Includes a built-in package manager and window compositor.":
    "Une interface de bureau expérimentale explorant de nouveaux modèles d'interaction pour l'informatique spatiale et les flux créatifs. Inclut un gestionnaire de paquets intégré et un compositeur de fenêtres.",

  // Journey Page Labels & Content
  "Academic Degrees": "Diplômes Académiques",
  "Alma Mater": "Établissements",
  "Accreditations": "Accréditations",
  "01 / Foundation": "01 / Fondations",
  "02 / Accreditations": "02 / Accréditations",
  "Philosophy": "Philosophie",
  "AWS Pro, Kubernetes CKA, GCP Architect": "AWS Pro, Kubernetes CKA, Architecte GCP",
  "Let's build something": "Bâtissons quelque chose de",
  "enduring": "durable",
  "Whether you need strategic software architecture, high-concurrency systems design, or an audit of your cloud infrastructure.":
    "Que vous ayez besoin d'une architecture logicielle stratégique, de systèmes à haute concurrence ou d'un audit de votre infrastructure cloud.",
  "Explore Projects": "Explorer les projets",
  "Specialization:": "Spécialisation :",
  "Core Coursework & Research Focus": "Matières Clés & Axes de Recherche",

  // Educations
  "Master of Science in Computer Science": "Master of Science en Informatique",
  "ETH Zürich (Swiss Federal Institute of Technology)":
    "ETH Zürich (École Polytechnique Fédérale de Zurich)",
  "Distributed Systems & High-Performance Computing":
    "Systèmes Distribués & Calcul Haute Performance",
  "Summa Cum Laude (Top 3% of cohort)": "Summa Cum Laude (Top 3 % de la promotion)",
  "Deep theoretical and practical focus on distributed consensus, network performance, and low-latency storage engines. Completed master thesis on resilient state replication for geo-distributed transactional databases.":
    "Approche théorique et pratique approfondie du consensus distribué, de la performance réseau et des moteurs de stockage à faible latence. Mémoire de master sur la réplication d'état résiliente pour les bases de données transactionnelles géo-distribuées.",
  "Distributed Systems Architecture": "Architecture des Systèmes Distribués",
  "Advanced Operating Systems": "Systèmes d'Exploitation Avancés",
  "Network Protocols & Formal Methods": "Protocoles Réseau & Méthodes Formelles",
  "Fault-Tolerant Computing": "Informatique Tolérante aux Pannes",
  "High-Performance Database Internals": "Architecture Interne des Bases de Données",

  "Bachelor of Science in Computer Science & Systems":
    "Bachelor of Science en Informatique & Systèmes",
  "EPFL (École Polytechnique Fédérale de Lausanne)":
    "EPFL (École Polytechnique Fédérale de Lausanne)",
  "Software Engineering & Computer Systems": "Génie Logiciel & Systèmes Informatiques",
  "Highest Distinction": "Mention Très Bien avec Félicitations",
  "Foundational computer science education with rigorous coursework in algorithm complexity, concurrency theory, compilers, and hardware-software interface design. Lead student researcher in the Distributed Information Systems laboratory.":
    "Formation fondamentale en informatique avec un cursus rigoureux en complexité algorithmique, théorie de la concurrence, compilateurs et conception d'interfaces matériel-logiciel. Chercheuse étudiante principale au laboratoire des Systèmes d'Information Distribués.",
  "Data Structures & Algorithms": "Structures de Données & Algorithmes",
  "Computer Architecture": "Architecture des Ordinateurs",
  "Concurrent & Parallel Programming": "Programmation Concurrente & Parallèle",
  "Database Systems": "Systèmes de Bases de Données",
  "Compiler Construction": "Construction de Compilateurs",
  "Applied Discrete Mathematics": "Mathématiques Discrètes Appliquées",

  "Swiss Scientific Matura (Baccalauréat Scientifique)":
    "Maturité Scientifique Suisse (Baccalauréat Scientifique)",
  "Gymnase Cantonal de Lausanne": "Gymnase Cantonal de Lausanne",
  "Advanced Mathematics & Applied Physics": "Mathématiques Avancées & Physique Appliquée",
  "Honor Award for Analytical Mathematics": "Prix d'Honneur en Mathématiques Analytiques",
  "Intensive STEM curriculum with a specialization in advanced calculus, differential equations, theoretical mechanics, and introductory algorithmic logic.":
    "Cursus scientifique intensif avec spécialisation en calcul avancé, équations différentielles, mécanique théorique et logique algorithmique.",
  "Advanced Calculus & Linear Algebra": "Calcul Avancé & Algèbre Linéaire",
  "Classical & Quantum Physics": "Physique Classique & Quantique",
  "Mathematical Modeling": "Modélisation Mathématique",
  "Algorithmic Logic": "Logique Algorithmique",

  // Certificates
  "Verified": "Vérifié",
  "Valid": "Valide",
  "Copy": "Copier",
  "Copied!": "Copié !",
  "View Details & Credential": "Voir les détails et le certificat",
  "Issued Date": "Date d'obtention",
  "Expiration": "Expiration",
  "Permanent / No Expiration": "Permanent / Sans expiration",
  "Competencies & Domains": "Compétences & Domaines",
  "Close": "Fermer",
  "Verify at": "Vérifier sur",
  "AWS Certified Solutions Architect – Professional":
    "AWS Certified Solutions Architect – Professionnel",
  "Highest-tier cloud architecture certification validating advanced architectural design, multi-tier security, disaster recovery, and cost-effective distributed systems at enterprise scale.":
    "Certification d'architecture cloud de plus haut niveau validant la conception d'architectures avancées, la sécurité multi-niveaux, la reprise après sinistre et les systèmes distribués à l'échelle de l'entreprise.",
  "Certified Kubernetes Administrator (CKA)":
    "Administrateur Kubernetes Certifié (CKA)",
  "Hands-on operational certification demonstrating production-grade Kubernetes cluster management, container networking (CNI), storage orchestration, etcd backup/restore, and runtime security.":
    "Certification opérationnelle pratique démontrant la gestion de clusters Kubernetes en production, le réseau de conteneurs (CNI), l'orchestration du stockage, la sauvegarde/restauration etcd et la sécurité d'exécution.",
  "Google Cloud Certified – Professional Cloud Architect":
    "Google Cloud Certified – Architecte Cloud Professionnel",
  "Validates proficiency in architecting resilient, highly scalable enterprise solutions on Google Cloud Platform, encompassing hybrid cloud connectivity and high-throughput data pipelines.":
    "Valide la maîtrise de l'architecture de solutions d'entreprise résilientes et hautement évolutives sur Google Cloud Platform, incluant la connectivité cloud hybride et les pipelines de données à haut débit.",
  "HashiCorp Certified: Terraform Associate":
    "HashiCorp Certified : Terraform Associate",
  "Covers declarative infrastructure-as-code principles, modular state management, automated CI/CD pipeline provisioning, and cloud governance policies.":
    "Couvre les principes déclaratifs d'infrastructure as code, la gestion modulaire de l'état, le provisionnement automatisé de pipelines CI/CD et les politiques de gouvernance cloud.",
  "Deep Learning & Neural Networks Specialization":
    "Spécialisation Deep Learning & Réseaux de Neurones",
  "Comprehensive training covering modern neural network architectures, backpropagation mathematics, hyperparameter tuning, convolutional networks, and transformer attention mechanisms.":
    "Formation complète couvrant les architectures modernes de réseaux de neurones, les mathématiques de la rétropropagation, le réglage d'hyperparamètres, les réseaux convolutifs et les mécanismes d'attention Transformer.",

  // Blog Posts (EN -> FR)
  "What Really Happens When You Type a Web Address?  By Line Morelle · 4 min read":
    "Que se passe-t-il vraiment lorsque vous tapez une adresse web ?  Par Line Morelle · 4 min de lecture",
  "What Really Happens When You Type a Web Address?":
    "Que se passe-t-il vraiment lorsque vous tapez une adresse web ?",
  "You type an address, press Enter, and a page appears in under a second. That moment hides a surprising chain of events across several computers, and understanding it makes you better at building for the web. Here's what happens, step by step.":
    "Vous tapez une adresse, appuyez sur Entrée et une page s'affiche en moins d'une seconde. Cet instant cache une chaîne d'événements fascinante à travers plusieurs serveurs, et la comprendre permet de mieux concevoir pour le web. Voici ce qui se passe, étape par étape.",
  "#WebDevelopment #SoftwareEngineering #HowTheInternetWorks #LearnToCode #TechExplained":
    "#DéveloppementWeb #GénieLogiciel #FonctionnementInternet #ApprendreÀCoder #TechExpliquée",
};

// Explicit FR -> EN overrides for content originally authored in French in Supabase
const EXPLICIT_FR_TO_EN: Record<string, string> = {
  "Sécurité web : les 5 failles que tout développeur doit comprendre  Par Line Morelle · 5 min de lecture":
    "Web Security: The 5 Vulnerabilities Every Developer Must Understand  By Line Morelle · 5 min read",
  "Sécurité web : les 5 failles que tout développeur doit comprendre":
    "Web Security: The 5 Vulnerabilities Every Developer Must Understand",
  "Un site peut être magnifique et rapide, mais s'il est vulnérable, il met en danger ses utilisateurs et son propriétaire. Bonne nouvelle : la grande majorité des attaques exploitent un petit nombre de failles connues, répertoriées par l'organisation OWASP dans son célèbre classement des risques web. Voici les cinq plus importantes, et la façon de s'en protéger.":
    "A website can be beautiful and fast, but if it is vulnerable, it puts both its users and its owner at risk. The good news: the vast majority of attacks exploit a small number of well-known vulnerabilities cataloged by OWASP in its famous web risk ranking. Here are the top five, and how to protect against them.",
  "#SécuritéWeb #Cybersécurité #DéveloppementWeb #GénieLogiciel #OWASP":
    "#WebSecurity #Cybersecurity #WebDevelopment #SoftwareEngineering #OWASP",
};

// Build normalized lookup maps for instant case-insensitive / whitespace-tolerant matching
function normalizeText(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

const NORMALIZED_EN_TO_FR = new Map<string, string>();
const NORMALIZED_FR_TO_EN = new Map<string, string>();

for (const [en, fr] of Object.entries(EN_TO_FR_CONTENT)) {
  NORMALIZED_EN_TO_FR.set(normalizeText(en), fr);
  NORMALIZED_FR_TO_EN.set(normalizeText(fr), en);
}

for (const [fr, en] of Object.entries(EXPLICIT_FR_TO_EN)) {
  NORMALIZED_FR_TO_EN.set(normalizeText(fr), en);
  NORMALIZED_EN_TO_FR.set(normalizeText(en), fr);
}

export function translateContentString(
  text: string | null | undefined,
  targetLocale: "en" | "fr",
): string {
  if (!text) return "";
  const norm = normalizeText(text);
  if (!norm) return text;

  if (targetLocale === "fr") {
    return NORMALIZED_EN_TO_FR.get(norm) ?? text;
  } else {
    return NORMALIZED_FR_TO_EN.get(norm) ?? text;
  }
}
