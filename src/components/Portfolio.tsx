import { ExternalLink, Github, Eye, Star, Code, Zap, Server, Shield, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

import fusionImg from "@/assets/fusionbox.png"
import agenticImg from "@/assets/agentic-draft.jpg"
import monitorImg from "@/assets/process-monitor.png"

const Portfolio = () => {
  const projects = [
    {
      title: "Agentic-Draft",
      link: "https://github.com/Akash-Karma/Agentic-Draft",
      image: agenticImg, // Fixed: Swapped this to the correct image variable
      description: "An autonomous document-orchestration platform using a state-machine architecture for iterative drafting and self-correction.",
      tech: ["LangGraph.js", "Node.js", "Redis", "BullMQ"],
      category: "Agentic AI",
      status: "Completed",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Iterative AI Feedback Loops",
        "Distributed Task Queues",
        "State-Machine Logic",
        "Real-time Generation"
      ]
    },
    {
      title: "FusionBox: Physics Engine",
      link: "https://github.com/Akash-Karma/FusionBox",
      image: fusionImg, // Fixed: Swapped this to the correct image variable
      description: "Celestial evolution game built with C++ and SFML, utilizing the Box2D 3.0 C API for high-performance rigid-body dynamics.",
      tech: ["C++", "SFML 3.0", "Box2D 3.0", "CMake"],
      category: "System Programming",
      status: "Completed",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      features: [
        "Rigid-body Dynamics",
        "Custom Inertia Logic",
        "Real-time Physics Sync",
        "Resolution Independence"
      ]
    },
    {
      title: "Process-Monitoring System",
      link: "https://github.com/Akash-Karma/akash-karmakar-portfolio",
      image: monitorImg,
      description: "Real-time system resource tracker for monitoring CPU/Memory utilization and detecting anomalies via AI/ML modules.",
      tech: ["C++", "Python", "ML Anomaly Detection", "Systems"],
      category: "Cloud Infrastructure",
      status: "Live",
      color: "text-success",
      bgColor: "bg-success/10",
      features: [
        "Live CPU/RAM Telemetry",
        "Anomaly Detection (ML)",
        "Process Visualization",
        "Resource Clamping"
      ]
    }
  ];

  const handleViewProject = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <section id="portfolio" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="p-2 text-3xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Technical Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Scalable cloud systems, agentic AI architectures, and low-level system engineering.
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">600+</div>
            <div className="text-sm text-muted-foreground">DSA Problems Solved</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-accent mb-2">1st</div>
            <div className="text-sm text-muted-foreground">Hack-IOT Winner</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">Agentic</div>
            <div className="text-sm text-muted-foreground">AI Implementation</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-accent mb-2">8.64</div>
            <div className="text-sm text-muted-foreground">Academic CGPA</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="card-project h-full flex flex-col hover:scale-[1.03] transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${project.bgColor} rounded-xl`}>
                  <Server className={`h-6 w-6 ${project.color}`} />
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {project.status}
                </div>
              </div>

              <div className="p-2 flex-1" style={{ perspective: '1000px' }}>
                <div className="relative transition-transform duration-700 h-[280px]" style={{ transformStyle: 'preserve-3d' }}
                     onMouseEnter={e => (e.currentTarget.style.transform = 'rotateY(180deg)')}
                     onMouseLeave={e => (e.currentTarget.style.transform = 'rotateY(0deg)')}>
                  
                  {/* FRONT SIDE - FIXED IMAGE RENDERING */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="w-full h-full bg-muted">
                       <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover" 
                       />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                      <div>
                        <span className="text-white font-bold text-base block">{project.title}</span>
                        <span className="text-white/70 text-xs">{project.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 overflow-hidden p-4 bg-white rounded-xl shadow-inner" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <h3 className="text-lg font-heading font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.features.map((f, i) => (
                        <span key={i} className="px-2 py-1 bg-muted/50 text-xs rounded-md">{f}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 bg-gradient-primary text-white text-xs rounded-full font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <Button onClick={() => handleViewProject(project.link)} variant="outline" size="sm" className="flex-1 group hover:bg-primary hover:text-white">
                  <Eye className="h-4 w-4 mr-2" /> View Source
                </Button>
                <Button onClick={() => handleViewProject(project.link)} variant="outline" size="sm" className="group hover:bg-accent hover:text-white">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* ... rest of your component */}
      </div>
    </section>
  );
};

export default Portfolio;