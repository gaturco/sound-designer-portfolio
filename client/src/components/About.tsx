interface Metric {
  label: string;
  value: string;
}

interface AboutProps {
  bio: string;
  metrics: Metric[];
}

export default function About({ bio, metrics }: AboutProps) {
  return (
    <section id="sobre-mim" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">Sobre Mim</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-2">
                {metric.value}
              </p>
              <p className="text-muted-foreground font-semibold">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-background rounded-xl p-8 md:p-12 shadow-md">
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
}
