import { ExternalLink, Github, Eye, Star, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const projects = [
    {
      title: "Interactive Quiz Web App",
      description: "Responsive, animated quiz application with scoring system and comprehensive review mode for enhanced learning experience.",
      tech: ["JavaScript", "HTML/CSS", "Responsive Design", "Animation"],
      category: "Web Development",
      status: "Completed",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: ["Scoring System", "Review Mode", "Animations", "Mobile-First"]
    },
    {
      title: "Food Distribution Optimization (ML)",
      description: "Machine learning model for predicting food demand to minimize waste and optimize distribution logistics.",
      tech: ["Python", "Machine Learning", "Data Analysis", "Optimization"],
      category: "AI/ML",
      status: "Completed", 
      color: "text-success",
      bgColor: "bg-success/10",
      features: ["Demand Prediction", "Waste Reduction", "Data Visualization", "ML Algorithms"]
    },
    {
      title: "Career Chatbot (Oracle Career Pathway)",
      description: "Intelligent career guidance assistant providing personalized recommendations and pathway suggestions.",
      tech: ["Chatbot Development", "AI", "Natural Language Processing", "Career Guidance"],
      category: "AI/Chatbot",
      status: "Completed",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      features: ["Personalized Guidance", "AI-Powered", "Career Pathways", "Interactive Interface"]
    },
    {
      title: "AI Mood DJ",
      description: "Gradio-based mood music recommender deployed on Hugging Face, analyzing user emotions to suggest perfect playlists.",
      tech: ["Gradio", "Hugging Face", "AI", "Music Recommendation"],
      category: "AI Application",
      status: "Live",
      color: "text-accent",
      bgColor: "bg-accent/10",
      features: ["Mood Analysis", "Music Recommendation", "Gradio Interface", "Hugging Face Deployment"]
    },
    {
      title: "Quotation PDF Generator",
      description: "Automated professional PDF generation tool with image integration and automatic calculations for business quotations.",
      tech: ["PDF Generation", "Automation", "Business Tools", "Python"],
      category: "Automation",
      status: "Completed",
      color: "text-warning",
      bgColor: "bg-warning/10",
      features: ["PDF Generation", "Image Integration", "Auto Calculations", "Professional Templates"]
    },
    {
      title: "Snake Game (Enhanced)",
      description: "Classic Snake game reimagined with modern styling, high-score tracking, and enhanced user interface.",
      tech: ["Game Development", "JavaScript", "UI/UX", "Local Storage"],
      category: "Game Development",
      status: "Completed",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      features: ["High Score System", "Modern UI", "Smooth Animations", "Local Storage"]
    }
  ];

  const categories = ["All", "Web Development", "AI/ML", "AI/Chatbot", "AI Application", "Automation", "Game Development"];

  const handleViewProject = (projectTitle: string) => {
    // In a real implementation, this would navigate to project details
    console.log(`Viewing project: ${projectTitle}`);
  };

  return (
    <section id="portfolio" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative projects solving real-world problems
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">6+</div>
            <div className="text-sm text-muted-foreground">Completed Projects</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-accent mb-2">3</div>
            <div className="text-sm text-muted-foreground">AI/ML Solutions</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Technologies Used</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-accent mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="card-project h-full flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${project.bgColor} rounded-xl`}>
                  <Code className={`h-6 w-6 ${project.color}`} />
                </div>
                <div className="flex gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Live' 
                      ? 'bg-success text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {project.status}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="flex-1">
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-primary text-white text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Actions */}
              <div className="flex gap-3 mt-auto">
                <Button 
                  onClick={() => handleViewProject(project.title)}
                  variant="outline" 
                  size="sm"
                  className="flex-1 group hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="group hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Project Spotlight */}
        <div className="mt-20">
          <h3 className="text-2xl font-heading font-semibold text-center mb-12 text-gradient-accent">
            Featured Project Spotlight
          </h3>
          
          <div className="card-gradient lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-accent/10 rounded-2xl">
                  <Zap className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h4 className="text-2xl font-heading font-bold text-foreground">AI Mood DJ</h4>
                  <p className="text-muted-foreground">Featured AI Application</p>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                An innovative AI-powered music recommendation system that analyzes user emotions and preferences 
                to create personalized playlists. Built with Gradio and deployed on Hugging Face for global accessibility.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-warning" />
                  <span className="text-foreground">Real-time emotion analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-accent" />
                  <span className="text-foreground">Deployed on Hugging Face</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Built with Gradio framework</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="btn-hero">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Try Live Demo
                </Button>
                <Button variant="outline" className="btn-hero-outline">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="relative">
                <div className="bg-gradient-accent rounded-2xl p-8 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-80">Mood Analysis</span>
                      <span className="text-sm font-bold">Happy 😊</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full w-4/5"></div>
                    </div>
                    <div className="space-y-2 mt-6">
                      <div className="text-sm opacity-80">Recommended Playlist:</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">♪ Upbeat Pop Hits</div>
                        <div className="flex items-center gap-2 text-sm">♪ Feel Good Vibes</div>
                        <div className="flex items-center gap-2 text-sm">♪ Energy Boost</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-warning text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                  Live on Hugging Face
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;