import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, GraduationCap, Cpu, Scale, Shield, Waves, Activity, Users, BookOpen, Sprout, TrendingUp, Sparkles, Globe, Eye, Hand, Zap, MessageSquare, FileText, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-innovation/10">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="text-center space-y-6 animate-fade-in">
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Global Level School Project
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-[var(--gradient-hero)] leading-tight">
              Dwiju
            </h1>
            <p className="text-3xl md:text-4xl font-semibold text-foreground">
              All In One AI Robo
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              એક અદ્વિતીય AI રોબોટ જે 100+ Advanced Modules સાથે Medical, Educational, અને Humanoid Features પૂરા પાડે છે
            </p>
            
            {/* School Info */}
            <div className="mt-8 p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border max-w-2xl mx-auto space-y-2">
              <p className="text-lg font-semibold text-foreground">
                <GraduationCap className="inline w-5 h-5 mr-2 text-primary" />
                ભીલોડિયા પ્રાથમિક શાળા
              </p>
              <p className="text-muted-foreground">તા. ડભોઇ, જિ. વડોદરા, ગુજરાત</p>
              <p className="text-sm text-muted-foreground pt-2 border-t border-border">
                <Users className="inline w-4 h-4 mr-2" />
                માર્ગદર્શક શિક્ષક: શ્રી પરમાર હરિશકુમાર રણછોડભાઈ
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <main className="container mx-auto px-4 py-16 space-y-20">
        
        {/* Core Capabilities */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Brain className="w-10 h-10 text-primary" />
              Core Capabilities
            </h2>
            <p className="text-muted-foreground text-lg">મૂળભૂત AI અને Recognition સિસ્ટમ્સ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Face Recognition + Emotion Detection"
              description="Advanced facial recognition અને emotion analysis"
              gradient="var(--gradient-tech)"
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Multi-Language Voice Recognition"
              description="ગુજરાતી, હિન્દી, અને અંગ્રેજી voice recognition + TTS"
              gradient="var(--gradient-tech)"
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8" />}
              title="Firebase + App + Website Integration"
              description="Real-time data sync across all platforms"
              gradient="var(--gradient-tech)"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="UID-based Learning System"
              description="Face અને Voice linking with unique ID"
              gradient="var(--gradient-tech)"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Drawing Scan & Evaluation"
              description="AI-powered drawing analysis અને result generator"
              gradient="var(--gradient-tech)"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="PDF Generator"
              description="Drawing, Health અને Result reports"
              gradient="var(--gradient-tech)"
            />
          </div>
        </section>

        {/* Medical Modules */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Heart className="w-10 h-10 text-secondary" />
              Medical Modules
            </h2>
            <p className="text-muted-foreground text-lg">સંપૂર્ણ આરોગ્ય નિદાન સિસ્ટમ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Body Temperature"
              description="MLX90614 sensor with accurate reading"
              gradient="var(--gradient-medical)"
            />
            <FeatureCard
              icon={<Waves className="w-8 h-8" />}
              title="Oxygen & Pulse"
              description="MAX30100 sensor for vital monitoring"
              gradient="var(--gradient-medical)"
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Blood Pressure"
              description="Digital cuff interface integration"
              gradient="var(--gradient-medical)"
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="ECG Monitoring"
              description="AD8232 sensor for heart health"
              gradient="var(--gradient-medical)"
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Sugar & Cholesterol"
              description="Manual + AI-powered detection"
              gradient="var(--gradient-medical)"
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="BMI & Eye Test"
              description="Complete body assessment tools"
              gradient="var(--gradient-medical)"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="QR Report Scan"
              description="Instant report reading & commenting"
              gradient="var(--gradient-medical)"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Health Charts"
              description="Weekly health tracking & analytics"
              gradient="var(--gradient-medical)"
            />
          </div>
        </section>

        {/* School Utility */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
              <GraduationCap className="w-10 h-10 text-accent" />
              School Utility Modules
            </h2>
            <p className="text-muted-foreground text-lg">શૈક્ષણિક વ્યવસ્થાપન અને મૂલ્યાંકન</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Drawing Scanner & Checker"
              description="Automated drawing evaluation with PDF reports"
              gradient="var(--gradient-education)"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Result Generator & Analytics"
              description="Comprehensive student performance tracking"
              gradient="var(--gradient-education)"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="RFID Attendance System"
              description="Firebase-linked automatic attendance"
              gradient="var(--gradient-education)"
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Voice UID Playback"
              description="Audio-based student identification"
              gradient="var(--gradient-education)"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Gamification System"
              description="Leaderboard અને reward points"
              gradient="var(--gradient-education)"
            />
            <FeatureCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="School Admin Panel"
              description="Logo અને UDISE code mapping"
              gradient="var(--gradient-education)"
            />
          </div>
        </section>

        {/* Humanoid Modules */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Cpu className="w-10 h-10 text-innovation" />
              Advanced Humanoid Modules
            </h2>
            <p className="text-muted-foreground text-lg">રોબોટિક્સ અને ફિઝિકલ ક્ષમતાઓ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Hand className="w-8 h-8" />}
              title="12x Servo Movement"
              description="Head, Eye અને Hand movements"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Leg Walk System"
              description="Dual servo + MPU6050 IMU balance"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Hand className="w-8 h-8" />}
              title="Object Pickup"
              description="Touch sensor સાથે precise handling"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Eye Tracking"
              description="IR + Camera based vision system"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Emotion Voice Detection"
              description="Voice-based emotion recognition & response"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Fall Detection"
              description="Auto alert system for safety"
              gradient="var(--gradient-innovation)"
            />
          </div>
        </section>

        {/* Spiritual, Judiciary & Science */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
              <BookOpen className="w-10 h-10 text-primary" />
              Spiritual, Judiciary & Science Domains
            </h2>
            <p className="text-muted-foreground text-lg">વિશિષ્ટ જ્ઞાન ક્ષેત્રો</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Karma Kanda Guidance"
              description="Ritual voice guidance system"
              gradient="var(--gradient-hero)"
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8" />}
              title="Jyotish & Panchang"
              description="Mantra library with AI assistance"
              gradient="var(--gradient-hero)"
            />
            <FeatureCard
              icon={<Scale className="w-8 h-8" />}
              title="AI Law Advisor"
              description="Court-ready documents generator"
              gradient="var(--gradient-hero)"
            />
            <FeatureCard
              icon={<Sprout className="w-8 h-8" />}
              title="Agri Doctor"
              description="Pashu diagnosis AI system"
              gradient="var(--gradient-hero)"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Business Models"
              description="Stock GPT for financial insights"
              gradient="var(--gradient-hero)"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Quantum Science Q&A"
              description="AI education bot for advanced topics"
              gradient="var(--gradient-hero)"
            />
          </div>
        </section>

        {/* Voice System - NEW FEATURES 1931-1934 */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
              <MessageSquare className="w-10 h-10 text-accent" />
              Advanced Voice System (Features 1931-1934)
            </h2>
            <p className="text-muted-foreground text-lg">અદ્વિતીય Voice Cloning અને Personality Switch</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Harishbhai Voice Clone"
              description="Default voice with exact tone, pitch, pronunciation અને emotions"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Dwiju Voice Switcher"
              description="Real-time voice change - Aamir Khan, Lata Mangeshkar, કોઈ પણ personality"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Singers' Voice Integration"
              description="Bollywood, Tollywood, Hollywood singers - Arijit, Shreya, Ed Sheeran"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Actors' Mimicry System"
              description="Famous actors ની voice + facial expressions + gestures sync"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Smart Personality Presets"
              description="Teacher, Judge, Business, Family, Singer, Mimic modes"
              gradient="var(--gradient-innovation)"
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8" />}
              title="Live Expression Sync"
              description="Voice + facial expression + hand gesture perfect synchronization"
              gradient="var(--gradient-innovation)"
            />
          </div>
          
          {/* Voice Modes Table */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 mt-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Voice Personality Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">Teacher Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground">Calm, educational, soft voice</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="w-5 h-5 text-secondary" />
                  <h4 className="font-semibold">Judge Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground">Strong, serious, authoritative</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h4 className="font-semibold">Business Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground">Formal, professional tone</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-innovation/10 to-innovation/5 rounded-xl border border-innovation/20">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-innovation" />
                  <h4 className="font-semibold">Family Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground">Emotional, friendly tone</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-primary/10 to-innovation/10 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">Singer Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground">Musical, rhythmic style</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-accent/10 to-innovation/10 rounded-xl border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-accent" />
                  <h4 className="font-semibold">Mimic Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground">Entertaining, actor mimicry</p>
              </div>
            </div>
          </div>
        </section>

        {/* Alert & Safety */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Shield className="w-10 h-10 text-destructive" />
              Alert, Safety & GPS Systems
            </h2>
            <p className="text-muted-foreground text-lg">સુરક્ષા અને ટ્રેકિંગ સિસ્ટમ્સ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Multi-Channel Alerts"
              description="WhatsApp, Call અને Email alerts"
              gradient="var(--gradient-safety)"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="GPS & Geofence Tracking"
              description="Live maps with location monitoring"
              gradient="var(--gradient-safety)"
            />
            <FeatureCard
              icon={<Globe className="w-8 h-8" />}
              title="Auto Sync Logs"
              description="Firebase real-time log synchronization"
              gradient="var(--gradient-safety)"
            />
            <FeatureCard
              icon={<MessageSquare className="w-8 h-8" />}
              title="Voice Alert System"
              description="Condition-based trigger alerts"
              gradient="var(--gradient-safety)"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Secure Viewer Login"
              description="Role-based access control"
              gradient="var(--gradient-safety)"
            />
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Live Log View"
              description="Real-time monitoring dashboard"
              gradient="var(--gradient-safety)"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="text-center space-y-8 py-16">
          <div className="bg-gradient-to-r from-primary/10 via-innovation/10 to-accent/10 rounded-3xl p-12 border border-primary/20">
            <h3 className="text-5xl font-bold text-primary mb-4">1934+ Features</h3>
            <p className="text-2xl text-foreground font-semibold mb-2">
              World-Class Robot Features Including Advanced Voice System
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              All features cross-checked with global standards + Voice Cloning Technology
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                <p className="text-4xl font-bold text-primary mb-2">100+</p>
                <p className="text-sm text-muted-foreground">Core Modules</p>
              </div>
              <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                <p className="text-4xl font-bold text-secondary mb-2">1930+</p>
                <p className="text-sm text-muted-foreground">PDF Features</p>
              </div>
              <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                <p className="text-4xl font-bold text-accent mb-2">4</p>
                <p className="text-sm text-muted-foreground">Voice Features</p>
              </div>
              <div className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                <p className="text-4xl font-bold text-innovation mb-2">1934+</p>
                <p className="text-sm text-muted-foreground">Total Features</p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-base px-4 py-2">
                <Brain className="w-4 h-4 mr-2" />
                AI Powered
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                <Heart className="w-4 h-4 mr-2" />
                Medical Grade
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education Ready
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Safety First
              </Badge>
              <Badge variant="outline" className="text-base px-4 py-2">
                <MessageSquare className="w-4 h-4 mr-2" />
                Voice Cloning
              </Badge>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h3 className="text-2xl font-bold text-primary">Dwiju - All In One AI Robo</h3>
          <p className="text-muted-foreground">
            A Global Level School Project by ભીલોડિયા પ્રાથમિક શાળા
          </p>
          <p className="text-sm text-muted-foreground">
            Powered by Innovation • Designed for Education • Built for Future
          </p>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

const FeatureCard = ({ icon, title, description, gradient }: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30">
      <CardHeader>
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300"
          style={{ background: gradient }}
        >
          {icon}
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default Index;