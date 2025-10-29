import { SettingsHypeClip } from "@/components/SettingsHypeClip";

const HypeClip = () => {
  return (
    <div className="min-h-screen w-full bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            MECHA-X Features
          </h1>
          <p className="text-muted-foreground">Professional Trading Intelligence Showcase</p>
        </div>
        <SettingsHypeClip />
      </div>
    </div>
  );
};

export default HypeClip;
