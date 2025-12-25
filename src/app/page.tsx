"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <Activity className="h-6 w-6 text-primary" />
            <span>AI Coach</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/generate">
              <Button size="sm" className="rounded-full px-6">Get Started</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={item} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              AI-Powered Fitness Revolution
            </motion.div>

            <motion.h1 variants={item} className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Your Personal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                AI Fitness Coach
              </span>
            </motion.h1>

            <motion.p variants={item} className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Generate hyper-personalized workout and diet plans in seconds. Tailored to your goals, lifestyle, and preferences using advanced AI.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Link href="/generate">
                <Button size="lg" className="rounded-full px-8 text-lg h-12">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full px-8 text-lg h-12">
                View Demo
              </Button>
            </motion.div>

            <motion.div variants={item} className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>Science-based Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span>Instant Generation</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-2xl flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transpose to-transparent"></div>

            {/* Abstract UI representation */}
            <div className="relative z-10 p-6 w-full max-w-md space-y-4">
              <div className="bg-background/80 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-xl transform rotate-[-2deg]">
                <div className="h-2 w-1/3 bg-primary/20 rounded-full mb-2"></div>
                <div className="h-8 w-3/4 bg-foreground rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted rounded-md"></div>
                  <div className="h-4 w-5/6 bg-muted rounded-md"></div>
                </div>
              </div>

              <div className="bg-background/90 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-xl transform translate-x-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">🥗</div>
                  <div>
                    <div className="h-4 w-24 bg-foreground rounded-md mb-1"></div>
                    <div className="h-3 w-16 bg-muted-foreground rounded-md"></div>
                  </div>
                </div>
                <div className="h-20 w-full bg-muted/50 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Why Choose AI Coach?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Experience a new era of fitness with features designed to keep you motivated and on track.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smart Workout Plans", desc: "Adaptive routines that evolve as you get stronger.", icon: "🏋️‍♂️" },
              { title: "Nutrition Strategy", desc: "Meal plans tailored to your dietary preferences and macros.", icon: "🥑" },
              { title: "Real-time AI Tips", desc: "Instant feedback on form, health, and lifestyle.", icon: "🤖" },
              { title: "Voice Guidance", desc: "Listen to your workout plan while you train.", icon: "🎧" },
              { title: "Visual Guides", desc: "AI-generated images for every exercise and meal.", icon: "🖼️" },
              { title: "Progress Tracking", desc: "Monitor your journey with detailed analytics.", icon: "📈" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
