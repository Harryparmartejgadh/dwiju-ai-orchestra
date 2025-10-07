import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Heart, GraduationCap, Cpu, Scale, Shield, Waves, Activity, Users, BookOpen, Sprout, TrendingUp, Sparkles, Globe, Eye, Hand, Zap, MessageSquare, FileText, MapPin, Mic, Camera, Radio, Bell, Lock, Database, Smartphone, Wifi, Home, Settings, BarChart3, ClipboardCheck, Thermometer, Stethoscope, Pill, Syringe, TestTube, BrainCircuit, Mountain, Lightbulb, Rocket, Microscope, Calculator, Music, Video, Image as ImageIcon, Headphones, Volume2 } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";
import { ModuleSection } from "@/components/ModuleSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-innovation/10">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-innovation/10 to-accent/10">
        <div className="absolute inset-0 bg-[var(--gradient-hero)] opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="text-center space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-xl px-8 py-3 bg-primary/10 text-primary border-primary/20 shadow-lg">
              <Sparkles className="w-5 h-5 mr-2 inline animate-pulse" />
              Global Level School Project - Gujarat
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-[var(--gradient-hero)] leading-tight drop-shadow-lg">
                Dwiju
              </h1>
              <p className="text-4xl md:text-5xl font-bold text-foreground">
                All In One AI Robo
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
                એક અદ્વિતીય AI રોબોટ જે 1934+ Advanced Features સાથે Medical, Educational, Humanoid, 
                Voice Cloning અને Intelligent સિસ્ટમ્સ પૂરા પાડે છે
              </p>
            </div>
            
            {/* School Info Card */}
            <div className="mt-12 p-8 bg-card/70 backdrop-blur-md rounded-3xl border-2 border-primary/20 max-w-3xl mx-auto space-y-4 shadow-2xl">
              <p className="text-2xl font-bold text-foreground">
                <GraduationCap className="inline w-7 h-7 mr-3 text-primary" />
                ભીલોડિયા પ્રાથમિક શાળા
              </p>
              <p className="text-lg text-muted-foreground font-medium">તા. ડભોઇ, જિ. વડોદરા, ગુજરાત</p>
              <div className="pt-4 border-t-2 border-border">
                <p className="text-base text-muted-foreground">
                  <Users className="inline w-5 h-5 mr-2 text-primary" />
                  માર્ગદર્શક શિક્ષક: <span className="font-semibold text-foreground">શ્રી પરમાર હરિશકુમાર રણછોડભાઈ</span>
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
              <div className="p-6 bg-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20">
                <p className="text-4xl font-bold text-primary mb-2">100+</p>
                <p className="text-sm text-muted-foreground font-medium">Main Modules</p>
              </div>
              <div className="p-6 bg-secondary/10 backdrop-blur-sm rounded-2xl border border-secondary/20">
                <p className="text-4xl font-bold text-secondary mb-2">1930+</p>
                <p className="text-sm text-muted-foreground font-medium">Core Features</p>
              </div>
              <div className="p-6 bg-accent/10 backdrop-blur-sm rounded-2xl border border-accent/20">
                <p className="text-4xl font-bold text-accent mb-2">4</p>
                <p className="text-sm text-muted-foreground font-medium">Voice Systems</p>
              </div>
              <div className="p-6 bg-innovation/10 backdrop-blur-sm rounded-2xl border border-innovation/20">
                <p className="text-4xl font-bold text-innovation mb-2">1934+</p>
                <p className="text-sm text-muted-foreground font-medium">Total Features</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Features */}
      <main className="container mx-auto px-4 py-20 space-y-24">
        
        {/* 1. CORE CAPABILITIES */}
        <ModuleSection
          title="Core Capabilities"
          icon={<Brain className="w-12 h-12" />}
          iconColor="text-primary"
          description="મૂળભૂત AI, Recognition અને Integration સિસ્ટમ્સ"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Camera className="w-10 h-10" />}
              title="Face Recognition + Emotion Detection"
              description="Advanced AI-powered facial recognition with real-time emotion analysis"
              gradient="var(--gradient-tech)"
              features={[
                "Multi-face detection simultaneously",
                "7 emotion states recognition",
                "Age & gender prediction",
                "Face matching with 99% accuracy"
              ]}
            />
            <FeatureCard
              icon={<Mic className="w-10 h-10" />}
              title="Tri-Language Voice Recognition"
              description="ગુજરાતી, હિન્દી, English voice recognition + TTS"
              gradient="var(--gradient-tech)"
              features={[
                "Real-time speech-to-text",
                "Natural language processing",
                "Voice commands in 3 languages",
                "Text-to-speech synthesis"
              ]}
            />
            <FeatureCard
              icon={<Database className="w-10 h-10" />}
              title="Firebase + Multi-Platform Integration"
              description="Real-time data sync across Website, App અને Hardware"
              gradient="var(--gradient-tech)"
              features={[
                "Cloud database sync",
                "Real-time updates",
                "Cross-platform compatibility",
                "Offline data caching"
              ]}
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="UID-based Learning System"
              description="Unique ID linking with Face + Voice recognition"
              gradient="var(--gradient-tech)"
              features={[
                "Personal profile creation",
                "Learning pattern tracking",
                "Progress monitoring",
                "Individual customization"
              ]}
            />
            <FeatureCard
              icon={<FileText className="w-10 h-10" />}
              title="Drawing Scan & AI Evaluation"
              description="AI-powered drawing analysis અને intelligent scoring"
              gradient="var(--gradient-tech)"
              features={[
                "Image quality assessment",
                "Creativity scoring",
                "Comparison with standards",
                "Detailed feedback generation"
              ]}
            />
            <FeatureCard
              icon={<ClipboardCheck className="w-10 h-10" />}
              title="Multi-format PDF Generator"
              description="Drawing, Health અને Result PDFs with QR codes"
              gradient="var(--gradient-tech)"
              features={[
                "Auto-generated reports",
                "QR code integration",
                "Digital signatures",
                "Cloud storage backup"
              ]}
            />
            <FeatureCard
              icon={<Smartphone className="w-10 h-10" />}
              title="Admin App + Tab Switcher"
              description="Complete control panel with live monitoring"
              gradient="var(--gradient-tech)"
              features={[
                "Real-time dashboard",
                "Multi-tab management",
                "User role controls",
                "Activity logs viewer"
              ]}
            />
            <FeatureCard
              icon={<Radio className="w-10 h-10" />}
              title="RFID UID System"
              description="Radio Frequency identification for attendance અને tracking"
              gradient="var(--gradient-tech)"
              features={[
                "Contactless scanning",
                "Instant recognition",
                "Auto-attendance marking",
                "Entry/exit logging"
              ]}
            />
          </div>
        </ModuleSection>

        {/* 2. MEDICAL MODULES */}
        <ModuleSection
          title="Medical & Health Modules"
          icon={<Heart className="w-12 h-12" />}
          iconColor="text-secondary"
          description="સંપૂર્ણ આરોગ્ય નિદાન અને મોનિટરિંગ સિસ્ટમ"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Thermometer className="w-10 h-10" />}
              title="Body Temperature (MLX90614)"
              description="Non-contact infrared temperature sensor"
              gradient="var(--gradient-medical)"
              features={[
                "Accurate ±0.5°C reading",
                "Non-contact measurement",
                "Fever detection alert",
                "Temperature history tracking"
              ]}
            />
            <FeatureCard
              icon={<Activity className="w-10 h-10" />}
              title="Oxygen & Pulse (MAX30100)"
              description="SpO2 અને heart rate monitoring"
              gradient="var(--gradient-medical)"
              features={[
                "Real-time SpO2 levels",
                "Heart rate per minute",
                "Pulse waveform display",
                "Abnormality alerts"
              ]}
            />
            <FeatureCard
              icon={<Stethoscope className="w-10 h-10" />}
              title="Blood Pressure Monitor"
              description="Digital cuff interface with automatic readings"
              gradient="var(--gradient-medical)"
              features={[
                "Systolic & diastolic BP",
                "Hypertension detection",
                "Trend analysis",
                "Report generation"
              ]}
            />
            <FeatureCard
              icon={<Activity className="w-10 h-10" />}
              title="ECG Monitoring (AD8232)"
              description="Heart electrical activity tracking"
              gradient="var(--gradient-medical)"
              features={[
                "Real-time ECG waveform",
                "Heart rhythm analysis",
                "Arrhythmia detection",
                "Emergency alerts"
              ]}
            />
            <FeatureCard
              icon={<TestTube className="w-10 h-10" />}
              title="Sugar & Cholesterol"
              description="Manual + AI-powered blood analysis"
              gradient="var(--gradient-medical)"
              features={[
                "Blood glucose testing",
                "Cholesterol level check",
                "Diabetes risk assessment",
                "Diet recommendations"
              ]}
            />
            <FeatureCard
              icon={<Calculator className="w-10 h-10" />}
              title="BMI & Body Composition"
              description="Complete body metrics assessment"
              gradient="var(--gradient-medical)"
              features={[
                "BMI calculation",
                "Weight management",
                "Body fat percentage",
                "Fitness level analysis"
              ]}
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10" />}
              title="Eye Test & Vision Check"
              description="Comprehensive vision assessment"
              gradient="var(--gradient-medical)"
              features={[
                "Visual acuity testing",
                "Color blindness check",
                "Eye fatigue detection",
                "Vision correction advice"
              ]}
            />
            <FeatureCard
              icon={<Pill className="w-10 h-10" />}
              title="Anemia Risk Detection"
              description="Blood health અને hemoglobin analysis"
              gradient="var(--gradient-medical)"
              features={[
                "Hemoglobin estimation",
                "Iron deficiency check",
                "Nutrition guidance",
                "Treatment suggestions"
              ]}
            />
            <FeatureCard
              icon={<FileText className="w-10 h-10" />}
              title="QR Report Scan & Comment"
              description="Instant medical report reading"
              gradient="var(--gradient-medical)"
              features={[
                "QR code scanning",
                "Report interpretation",
                "Doctor's comments",
                "Follow-up reminders"
              ]}
            />
            <FeatureCard
              icon={<BarChart3 className="w-10 h-10" />}
              title="Health Risk Calculators"
              description="Diabetes + Cholesterol risk assessment"
              gradient="var(--gradient-medical)"
              features={[
                "Risk score calculation",
                "Preventive measures",
                "Lifestyle recommendations",
                "Regular monitoring alerts"
              ]}
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10" />}
              title="Weekly Health Charts"
              description="Comprehensive health tracking dashboard"
              gradient="var(--gradient-medical)"
              features={[
                "Visual health trends",
                "Progress tracking",
                "Comparative analysis",
                "PDF report export"
              ]}
            />
          </div>
        </ModuleSection>

        {/* 3. SCHOOL UTILITY MODULES */}
        <ModuleSection
          title="School Utility Modules"
          icon={<GraduationCap className="w-12 h-12" />}
          iconColor="text-accent"
          description="શૈક્ષણિક વ્યવસ્થાપન, મૂલ્યાંકન અને Gamification"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<ImageIcon className="w-10 h-10" />}
              title="Drawing Scanner & AI Checker"
              description="Automated drawing evaluation with intelligent feedback"
              gradient="var(--gradient-education)"
              features={[
                "High-quality image scanning",
                "AI-based evaluation",
                "Creativity scoring (0-100)",
                "Improvement suggestions"
              ]}
            />
            <FeatureCard
              icon={<ClipboardCheck className="w-10 h-10" />}
              title="Result Generator & Analytics"
              description="Comprehensive student performance system"
              gradient="var(--gradient-education)"
              features={[
                "Auto result compilation",
                "Grade calculation",
                "Performance analytics",
                "Parent notifications"
              ]}
            />
            <FeatureCard
              icon={<Radio className="w-10 h-10" />}
              title="RFID Attendance System"
              description="Firebase-linked automatic attendance"
              gradient="var(--gradient-education)"
              features={[
                "Contactless check-in",
                "Real-time sync",
                "Parent SMS alerts",
                "Monthly reports"
              ]}
            />
            <FeatureCard
              icon={<Volume2 className="w-10 h-10" />}
              title="Voice UID Playback"
              description="Audio-based student identification"
              gradient="var(--gradient-education)"
              features={[
                "Voice profile matching",
                "Name announcement",
                "Attendance confirmation",
                "Audio logs"
              ]}
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10" />}
              title="Gamification System"
              description="Leaderboard, Reward Points અને Badges"
              gradient="var(--gradient-education)"
              features={[
                "Point-based rewards",
                "Achievement badges",
                "Class rankings",
                "Motivation system"
              ]}
            />
            <FeatureCard
              icon={<Settings className="w-10 h-10" />}
              title="School Admin Panel"
              description="Logo, UDISE code અને complete management"
              gradient="var(--gradient-education)"
              features={[
                "School branding",
                "UDISE integration",
                "Staff management",
                "Resource allocation"
              ]}
            />
          </div>
        </ModuleSection>

        {/* 4. HUMANOID MODULES */}
        <ModuleSection
          title="Advanced Humanoid Modules"
          icon={<Cpu className="w-12 h-12" />}
          iconColor="text-innovation"
          description="રોબોટિક્સ, Movement અને Physical Capabilities"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Hand className="w-10 h-10" />}
              title="12x Servo Movement System"
              description="Head, Eye, Hand precise control"
              gradient="var(--gradient-innovation)"
              features={[
                "360° head rotation",
                "Eye movement tracking",
                "Hand gesture control",
                "Synchronized movements"
              ]}
            />
            <FeatureCard
              icon={<Activity className="w-10 h-10" />}
              title="Leg Walk System"
              description="Dual servo + MPU6050 IMU balance"
              gradient="var(--gradient-innovation)"
              features={[
                "Stable walking motion",
                "Self-balancing system",
                "Obstacle avoidance",
                "Speed control"
              ]}
            />
            <FeatureCard
              icon={<Hand className="w-10 h-10" />}
              title="Object Pickup System"
              description="Touch sensor સાથે precise handling"
              gradient="var(--gradient-innovation)"
              features={[
                "Grip force control",
                "Object detection",
                "Safe handling",
                "Drop prevention"
              ]}
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10" />}
              title="Eye Tracking System"
              description="IR + Camera based advanced vision"
              gradient="var(--gradient-innovation)"
              features={[
                "Person following",
                "Gaze direction",
                "Focus adjustment",
                "Visual attention"
              ]}
            />
            <FeatureCard
              icon={<MessageSquare className="w-10 h-10" />}
              title="Emotion Voice Detection"
              description="Voice-based emotion recognition + response"
              gradient="var(--gradient-innovation)"
              features={[
                "Emotion classification",
                "Tone analysis",
                "Empathetic responses",
                "Mood adaptation"
              ]}
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10" />}
              title="Fall Detection & Alert"
              description="Safety system with auto alerts"
              gradient="var(--gradient-innovation)"
              features={[
                "Gyroscope monitoring",
                "Instant notifications",
                "Emergency contacts",
                "Location sharing"
              ]}
            />
            <FeatureCard
              icon={<Lightbulb className="w-10 h-10" />}
              title="RGB Light Feedback"
              description="Visual status indicators અને mood lighting"
              gradient="var(--gradient-innovation)"
              features={[
                "Status indication",
                "Mood expression",
                "Alert signals",
                "Custom patterns"
              ]}
            />
          </div>
        </ModuleSection>

        {/* 5. SPIRITUAL, JUDICIARY & SCIENCE */}
        <ModuleSection
          title="Spiritual, Judiciary & Science Domains"
          icon={<BookOpen className="w-12 h-12" />}
          iconColor="text-primary"
          description="વિશિષ્ટ જ્ઞાન ક્ષેત્રો અને Expert સિસ્ટમ્સ"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="w-10 h-10" />}
              title="Karma Kanda Guidance"
              description="Hindu ritual voice guidance system"
              gradient="var(--gradient-hero)"
              features={[
                "Puja procedure steps",
                "Mantra pronunciation",
                "Ritual timing",
                "Custom ceremonies"
              ]}
            />
            <FeatureCard
              icon={<Globe className="w-10 h-10" />}
              title="Jyotish & Panchang"
              description="Astrology + Calendar + Mantra library"
              gradient="var(--gradient-hero)"
              features={[
                "Daily panchang",
                "Horoscope analysis",
                "Muhurat selection",
                "Vedic mantras"
              ]}
            />
            <FeatureCard
              icon={<Scale className="w-10 h-10" />}
              title="AI Law Advisor"
              description="Legal guidance + Court-ready documents"
              gradient="var(--gradient-hero)"
              features={[
                "Legal consultation",
                "Document drafting",
                "Case analysis",
                "Rights information"
              ]}
            />
            <FeatureCard
              icon={<Sprout className="w-10 h-10" />}
              title="Agri Doctor"
              description="Crop diagnosis + Pashu (animal) health AI"
              gradient="var(--gradient-hero)"
              features={[
                "Plant disease detection",
                "Pest identification",
                "Animal health check",
                "Treatment recommendations"
              ]}
            />
            <FeatureCard
              icon={<TrendingUp className="w-10 h-10" />}
              title="Business Models + Stock GPT"
              description="Financial insights અને business planning"
              gradient="var(--gradient-hero)"
              features={[
                "Market analysis",
                "Stock predictions",
                "Business strategies",
                "Investment advice"
              ]}
            />
            <FeatureCard
              icon={<Microscope className="w-10 h-10" />}
              title="Quantum Science Q&A"
              description="AI education bot for advanced topics"
              gradient="var(--gradient-hero)"
              features={[
                "Complex concept explanation",
                "Interactive learning",
                "Problem solving",
                "Research assistance"
              ]}
            />
          </div>
        </ModuleSection>

        {/* 6. VOICE SYSTEM - Features 1931-1934 */}
        <ModuleSection
          title="Advanced Voice System (Features 1931-1934)"
          icon={<Headphones className="w-12 h-12" />}
          iconColor="text-accent"
          description="અદ્વિતીય Voice Cloning, Celebrity Mimicry અને Personality Switch"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Mic className="w-10 h-10" />}
              title="Harishbhai Voice Clone (1931)"
              description="Perfect voice replication with emotions"
              gradient="var(--gradient-innovation)"
              features={[
                "Exact tone matching",
                "Pitch accuracy",
                "Pronunciation clone",
                "Emotional inflection"
              ]}
            />
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Dwiju Voice Switcher (1932)"
              description="Real-time celebrity voice transformation"
              gradient="var(--gradient-innovation)"
              features={[
                "Instant voice change",
                "Celebrity mimicry",
                "Actor impressions",
                "Singer voice modes"
              ]}
            />
            <FeatureCard
              icon={<Music className="w-10 h-10" />}
              title="Singers' Voice Integration (1933)"
              description="Bollywood, Tollywood, Hollywood singers"
              gradient="var(--gradient-innovation)"
              features={[
                "Arijit Singh style",
                "Shreya Ghoshal voice",
                "Ed Sheeran tone",
                "Custom song creation"
              ]}
            />
            <FeatureCard
              icon={<Video className="w-10 h-10" />}
              title="Actors' Mimicry System (1934)"
              description="Voice + Expression + Gesture sync"
              gradient="var(--gradient-innovation)"
              features={[
                "Amitabh Bachchan voice",
                "Facial expression sync",
                "Hand gestures matching",
                "Complete character acting"
              ]}
            />
            <FeatureCard
              icon={<BrainCircuit className="w-10 h-10" />}
              title="Smart Personality Presets"
              description="6 predefined personality modes"
              gradient="var(--gradient-innovation)"
              features={[
                "Teacher Mode - Educational",
                "Judge Mode - Authoritative",
                "Business Mode - Professional",
                "Family Mode - Friendly"
              ]}
            />
            <FeatureCard
              icon={<Activity className="w-10 h-10" />}
              title="Live Expression Sync"
              description="Perfect audio-visual synchronization"
              gradient="var(--gradient-innovation)"
              features={[
                "Lip sync accuracy",
                "Emotion expression",
                "Gesture timing",
                "Natural movements"
              ]}
            />
          </div>

          {/* Voice Personality Modes */}
          <div className="bg-card/70 backdrop-blur-md rounded-3xl border-2 border-border p-10 mt-12">
            <h3 className="text-3xl font-bold mb-8 text-center">Voice Personality Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <h4 className="font-bold text-lg">Teacher Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Calm, educational, soft voice for learning environment</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl border-2 border-secondary/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="w-6 h-6 text-secondary" />
                  <h4 className="font-bold text-lg">Judge Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Strong, serious, authoritative tone for legal contexts</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl border-2 border-accent/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <h4 className="font-bold text-lg">Business Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Formal, professional tone for corporate settings</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-innovation/10 to-innovation/5 rounded-2xl border-2 border-innovation/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-innovation" />
                  <h4 className="font-bold text-lg">Family Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Emotional, friendly, warm tone for personal interactions</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-primary/10 to-innovation/10 rounded-2xl border-2 border-primary/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <Music className="w-6 h-6 text-primary" />
                  <h4 className="font-bold text-lg">Singer Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Musical, rhythmic style with perfect pitch control</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-accent/10 to-innovation/10 rounded-2xl border-2 border-accent/20 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-accent" />
                  <h4 className="font-bold text-lg">Mimic Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">Entertaining actor mimicry with character voices</p>
              </div>
            </div>
          </div>
        </ModuleSection>

        {/* 7. ALERT & SAFETY SYSTEMS */}
        <ModuleSection
          title="Alert, Safety & GPS Systems"
          icon={<Shield className="w-12 h-12" />}
          iconColor="text-destructive"
          description="સુરક્ષા, ટ્રેકિંગ અને Emergency Response"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<MessageSquare className="w-10 h-10" />}
              title="Multi-Channel Alerts"
              description="WhatsApp + Call + Email notifications"
              gradient="var(--gradient-safety)"
              features={[
                "WhatsApp automation",
                "Voice call alerts",
                "Email notifications",
                "SMS integration"
              ]}
            />
            <FeatureCard
              icon={<MapPin className="w-10 h-10" />}
              title="GPS & Geofence Tracking"
              description="Real-time location અને boundary monitoring"
              gradient="var(--gradient-safety)"
              features={[
                "Live GPS tracking",
                "Geofence alerts",
                "Route history",
                "Safe zone setup"
              ]}
            />
            <FeatureCard
              icon={<Database className="w-10 h-10" />}
              title="Auto Sync Logs to Firebase"
              description="Real-time cloud synchronization"
              gradient="var(--gradient-safety)"
              features={[
                "Automatic backups",
                "Event logging",
                "Data redundancy",
                "Quick recovery"
              ]}
            />
            <FeatureCard
              icon={<Bell className="w-10 h-10" />}
              title="Voice Alert System"
              description="Condition-based trigger alerts"
              gradient="var(--gradient-safety)"
              features={[
                "Custom triggers",
                "Priority levels",
                "Alert scheduling",
                "Multi-language support"
              ]}
            />
            <FeatureCard
              icon={<Lock className="w-10 h-10" />}
              title="Secure Viewer Login"
              description="Role-based access control system"
              gradient="var(--gradient-safety)"
              features={[
                "Multi-level access",
                "User permissions",
                "Activity monitoring",
                "Secure authentication"
              ]}
            />
            <FeatureCard
              icon={<BarChart3 className="w-10 h-10" />}
              title="Live Log View"
              description="Real-time monitoring dashboard"
              gradient="var(--gradient-safety)"
              features={[
                "Live activity feed",
                "Error tracking",
                "Performance metrics",
                "System diagnostics"
              ]}
            />
          </div>
        </ModuleSection>

        {/* Final Stats Banner */}
        <section className="text-center py-20">
          <div className="bg-gradient-to-r from-primary/20 via-innovation/20 to-accent/20 rounded-3xl p-16 border-2 border-primary/30 shadow-2xl">
            <h3 className="text-6xl md:text-7xl font-bold text-primary mb-6 animate-pulse">1934+ Features</h3>
            <p className="text-3xl text-foreground font-bold mb-4">
              World-Class AI Robot System
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Complete integration of Medical, Educational, Humanoid, Voice Cloning, 
              અને Safety features - All cross-checked with global standards
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge variant="outline" className="text-lg px-6 py-3 bg-primary/10 border-primary/30">
                <Brain className="w-5 h-5 mr-2" />
                AI Powered
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-secondary/10 border-secondary/30">
                <Heart className="w-5 h-5 mr-2" />
                Medical Grade
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-accent/10 border-accent/30">
                <GraduationCap className="w-5 h-5 mr-2" />
                Education Ready
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-innovation/10 border-innovation/30">
                <Shield className="w-5 h-5 mr-2" />
                Safety First
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-primary/10 border-primary/30">
                <Mic className="w-5 h-5 mr-2" />
                Voice Cloning
              </Badge>
              <Badge variant="outline" className="text-lg px-6 py-3 bg-secondary/10 border-secondary/30">
                <Rocket className="w-5 h-5 mr-2" />
                Global Standard
              </Badge>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-lg border-t-2 border-border py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <h3 className="text-4xl font-bold text-primary">Dwiju - All In One AI Robo</h3>
            <p className="text-xl text-muted-foreground font-medium">
              A Global Level School Project
            </p>
            <p className="text-lg text-foreground font-semibold">
              ભીલોડિયા પ્રાથમિક શાળા, તા. ડભોઇ, જિ. વડોદરા, ગુજરાત
            </p>
            <p className="text-base text-muted-foreground">
              માર્ગદર્શક શિક્ષક: શ્રી પરમાર હરિશકુમાર રણછોડભાઈ
            </p>
            <div className="pt-6 border-t border-border mt-6">
              <p className="text-sm text-muted-foreground">
                Powered by Innovation • Designed for Education • Built for Future
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                🤖 1934+ Features • 🌍 Global Standards • 🏆 Award-Winning Project
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;