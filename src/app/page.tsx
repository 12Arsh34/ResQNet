import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Map, Radio, Shield, Smartphone, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />

        <section id="features" className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Platform Capabilities</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Equipping communities with the tools needed for rapid, organized, and effective crisis response.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Map className="h-10 w-10 text-primary" />}
              title="Real-Time Mapping"
              description="Interactive crisis maps showing live incidents, safe zones, and resource locations."
            />
            <FeatureCard
              icon={<Radio className="h-10 w-10 text-primary" />}
              title="Instant Alerts"
              description="Geo-targeted notifications for citizens in affected areas."
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Volunteer Coordination"
              description="Matching volunteers to nearby needs based on skills."
            />
            <FeatureCard
              icon={<Smartphone className="h-10 w-10 text-primary" />}
              title="Mobile Reporting"
              description="Easy-to-use mobile interface for citizens to report hazards and requests."
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-primary" />}
              title="Resource Tracking"
              description="Live inventory of medical supplies, food, and shelter capacity."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Verified Information"
              description="Admin-moderated feeds to combat misinformation during crises."
            />
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2026 ResQNet. Built for humanity.
          </p>
          <div className="flex gap-4">
            <span className="text-sm text-muted-foreground">Privacy</span>
            <span className="text-sm text-muted-foreground">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-background/50 backdrop-blur border-muted transition-all hover:border-primary/50 hover:shadow-md">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
