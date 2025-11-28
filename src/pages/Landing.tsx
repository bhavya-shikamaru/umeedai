import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Shield, 
  TrendingUp, 
  Users, 
  BarChart3,
  Brain,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

export const Landing = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning models analyze student data to identify at-risk learners early."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Explainable AI",
      description: "Understand exactly why a student is flagged, with clear factor breakdowns and evidence."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Personalized Interventions",
      description: "Get specific, actionable recommendations tailored to each student's unique situation."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Monitor intervention effectiveness and student improvement over time."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Support",
      description: "Connect teachers, counselors, and administrators for comprehensive student care."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Data-Driven Insights",
      description: "Transform attendance, grades, and engagement data into actionable intelligence."
    }
  ];

  const stats = [
    { icon: <Users className="h-5 w-5" />, value: "85%", label: "Early Identification Rate" },
    { icon: <TrendingUp className="h-5 w-5" />, value: "67%", label: "Intervention Success" },
    { icon: <Heart className="h-5 w-5" />, value: "92%", label: "Student Satisfaction" },
    { icon: <CheckCircle className="h-5 w-5" />, value: "24/7", label: "Real-time Monitoring" }
  ];

  return (
    <div className="min-h-screen aurora-bg-animated">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 px-4 overflow-hidden">
        {/* Decorative blur orbs */}
        <div className="blur-orb w-72 h-72 md:w-96 md:h-96 bg-white/20 top-10 right-10"></div>
        <div className="blur-orb w-64 h-64 md:w-80 md:h-80 bg-accent/30 bottom-20 left-10"></div>
        <div className="blur-orb w-48 h-48 bg-secondary/40 top-1/2 left-1/3"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 md:mb-8">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm text-white font-medium">AI-Powered Student Success</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white mb-4 md:mb-6 leading-tight text-balance px-2">
              Every Student Counts.
              <br />
              <span className="text-white/90">
                Predict, Prevent, Support.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Harness the power of AI to identify at-risk students early, understand the factors behind their challenges, 
              and provide targeted interventions that make a real difference in their educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="animate-scale-in w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-white/30">
                  Get Started Today
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="animate-scale-in animation-delay-200 w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image with Glass Frame */}
          <div className="animate-slide-up animation-delay-300">
            <div className="relative max-w-5xl mx-auto group">
              <div className="absolute -inset-4 bg-white/10 backdrop-blur-xl rounded-3xl"></div>
              <div className="relative p-2 sm:p-3 glass-card rounded-2xl md:rounded-3xl">
                <img 
                  src={heroImage} 
                  alt="Students learning together in a supportive environment"
                  className="relative rounded-xl md:rounded-2xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover-lift animate-fade-in group">
                <CardContent className="pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-5 md:pb-6 px-2 sm:px-4">
                  <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                    <div className="p-2 sm:p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl text-white group-hover:scale-110 transition-transform duration-300">
                      <div className="h-4 w-4 sm:h-5 sm:w-5">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium text-white mb-1 md:mb-2">{stat.value}</h3>
                  <p className="text-xs sm:text-sm text-white/70 font-medium leading-tight">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 relative">
        <div className="blur-orb w-80 h-80 bg-white/10 top-20 right-0"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-10 sm:mb-14 md:mb-20">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 md:mb-6 text-balance px-2">
              Comprehensive Student Success Platform
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
              Our AI-powered system provides educators with the tools they need to support every student's journey to success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift hover-glow animate-fade-in group overflow-hidden">
                <CardHeader className="relative p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl text-white group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <div className="h-5 w-5 sm:h-6 sm:w-6">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-heading text-white pt-1 sm:pt-2">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative p-4 sm:p-6 pt-0">
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 overflow-hidden">
        <div className="blur-orb w-96 h-96 bg-white/15 top-0 left-1/2 -translate-x-1/2"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="glass-strong rounded-3xl p-8 sm:p-12 md:p-16 max-w-4xl mx-auto animate-fade-in">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 md:mb-6 text-balance px-2">
              Ready to Transform Student Outcomes?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Join thousands of educators who are already using UMEED to identify at-risk students 
              and provide timely interventions that change lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center px-4">
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated hover:shadow-glow hover:scale-105 font-medium w-full sm:w-auto">
                  Start Your Free Trial
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/demo" className="w-full sm:w-auto">
                <Button variant="glass" size="lg" className="text-white border-white/30 hover:bg-white/20 font-medium w-full sm:w-auto">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-subtle py-8 sm:py-10 md:py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-3 md:mb-4">
            <div className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-medium text-white">EduCare AI</span>
          </div>
          <p className="text-white/60 mb-3 md:mb-4 text-sm sm:text-base px-4 max-w-xl mx-auto">
            Empowering educators to support every student's success through AI-driven insights and interventions.
          </p>
          <p className="text-white/40 text-xs sm:text-sm">
            © 2024 EduCare AI. Built with ❤️ for student success.
          </p>
        </div>
      </footer>
    </div>
  );
};
