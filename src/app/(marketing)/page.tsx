import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "var(--primary)" }}>
              N
            </div>
            <span className="font-semibold text-lg" style={{ color: "var(--foreground)" }}>NexPanel</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--muted-foreground)" }}>Características</a>
            <a href="#pricing" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--muted-foreground)" }}>Precios</a>
            <a href="#faq" className="text-sm transition-colors hover:opacity-80" style={{ color: "var(--muted-foreground)" }}>FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:opacity-80"
              style={{ color: "var(--foreground)" }}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Empezar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6 border" style={{ background: "var(--secondary)", color: "var(--primary)", borderColor: "var(--border)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
          Nuevo: Integración con Supabase
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight mb-6" style={{ color: "var(--foreground)" }}>
          Tu dashboard SaaS,{" "}
          <span style={{ color: "var(--primary)" }}>listo para escalar</span>
        </h1>
        <p className="text-lg max-w-xl mb-10" style={{ color: "var(--muted-foreground)" }}>
          NexPanel te da todo lo que necesitas: estadísticas en tiempo real, gestión de usuarios, CRUD completo y autenticación segura. Todo en un solo lugar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90 shadow-lg"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Comenzar gratis →
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg font-medium text-sm border transition-all hover:opacity-80"
            style={{ color: "var(--foreground)", borderColor: "var(--border)", background: "var(--card)" }}
          >
            Ver demo
          </Link>
        </div>

        {/* Dashboard preview mockup */}
        <div className="mt-20 w-full max-w-5xl rounded-2xl border overflow-hidden shadow-2xl" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
          <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "var(--border)", background: "var(--secondary)" }}>
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-2 text-xs" style={{ color: "var(--muted-foreground)" }}>nexpanel.app/dashboard</span>
          </div>
          <div className="flex h-64">
            {/* Sidebar mockup */}
            <div className="w-48 p-4 flex flex-col gap-2" style={{ background: "var(--sidebar)" }}>
              {["Dashboard", "Proyectos", "Clientes", "Facturas", "Ajustes"].map((item, i) => (
                <div key={item} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{ background: i === 0 ? "var(--sidebar-accent)" : "transparent", color: "var(--sidebar-foreground)" }}>
                  <div className="w-3 h-3 rounded-sm opacity-60" style={{ background: "var(--sidebar-foreground)" }} />
                  {item}
                </div>
              ))}
            </div>
            {/* Content mockup */}
            <div className="flex-1 p-6 grid grid-cols-3 gap-4 content-start">
              {[
                { label: "Ingresos", value: "$24,500" },
                { label: "Usuarios", value: "1,284" },
                { label: "Proyectos", value: "38" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-4 border" style={{ background: "var(--secondary)", borderColor: "var(--border)" }}>
                  <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{stat.label}</p>
                  <p className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{stat.value}</p>
                </div>
              ))}
              <div className="col-span-3 rounded-xl border h-20" style={{ background: "var(--secondary)", borderColor: "var(--border)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Todo lo que necesitas</h2>
            <p className="text-base" style={{ color: "var(--muted-foreground)" }}>Construido con Next.js 16, Tailwind CSS v4 y Supabase</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Estadísticas en tiempo real",
                desc: "Visualiza métricas clave de tu negocio con gráficos actualizados al instante.",
              },
              {
                icon: "🔐",
                title: "Autenticación segura",
                desc: "Login, registro y gestión de sesiones con Supabase Auth. Protección de rutas incluida.",
              },
              {
                icon: "⚡",
                title: "CRUD completo",
                desc: "Gestiona tus recursos con operaciones de creación, lectura, actualización y eliminación.",
              },
              {
                icon: "👥",
                title: "Gestión de usuarios",
                desc: "Administra perfiles, roles y permisos desde un panel centralizado.",
              },
              {
                icon: "📱",
                title: "Diseño responsive",
                desc: "Interfaz adaptada a cualquier dispositivo, desde móvil hasta escritorio.",
              },
              {
                icon: "🚀",
                title: "Listo para producción",
                desc: "Despliega en Vercel con un clic. Configuración optimizada para rendimiento.",
              },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6" style={{ background: "var(--secondary)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Precios simples</h2>
            <p className="text-base" style={{ color: "var(--muted-foreground)" }}>Sin sorpresas. Cancela cuando quieras.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Gratis",
                period: "",
                features: ["1 proyecto", "Hasta 100 registros", "Estadísticas básicas", "Soporte por email"],
                cta: "Empezar gratis",
                highlighted: false,
              },
              {
                name: "Pro",
                price: "$29",
                period: "/mes",
                features: ["Proyectos ilimitados", "Registros ilimitados", "Estadísticas avanzadas", "Soporte prioritario", "Exportar datos"],
                cta: "Empezar prueba",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/mes",
                features: ["Todo en Pro", "SSO / SAML", "SLA garantizado", "Onboarding dedicado", "API personalizada"],
                cta: "Contactar ventas",
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="p-8 rounded-2xl border flex flex-col"
                style={{
                  background: plan.highlighted ? "var(--primary)" : "var(--card)",
                  borderColor: plan.highlighted ? "var(--primary)" : "var(--border)",
                  color: plan.highlighted ? "var(--primary-foreground)" : "var(--foreground)",
                }}
              >
                <p className="text-sm font-medium mb-2 opacity-80">{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-70">{plan.period}</span>
                </div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="opacity-80">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className="text-center py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 border"
                  style={{
                    background: plan.highlighted ? "rgba(255,255,255,0.15)" : "var(--primary)",
                    color: plan.highlighted ? "var(--primary-foreground)" : "var(--primary-foreground)",
                    borderColor: plan.highlighted ? "rgba(255,255,255,0.3)" : "var(--primary)",
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: "var(--foreground)" }}>Preguntas frecuentes</h2>
          <div className="flex flex-col gap-4">
            {[
              {
                q: "¿Necesito saber programar para usar NexPanel?",
                a: "NexPanel está diseñado para ser intuitivo. Sin embargo, para personalizar el código fuente necesitarás conocimientos básicos de Next.js y TypeScript.",
              },
              {
                q: "¿Puedo conectar mi propia base de datos?",
                a: "Sí. NexPanel usa Supabase por defecto, pero puedes adaptarlo a cualquier base de datos PostgreSQL o incluso a otras fuentes de datos.",
              },
              {
                q: "¿Qué incluye el plan gratuito?",
                a: "El plan gratuito incluye acceso completo al dashboard, 1 proyecto activo y hasta 100 registros. Ideal para probar la plataforma.",
              },
              {
                q: "¿Cómo funciona la autenticación?",
                a: "Usamos Supabase Auth con sesiones JWT almacenadas en cookies HttpOnly. Las rutas del dashboard están protegidas por middleware.",
              },
            ].map((item) => (
              <div key={item.q} className="p-6 rounded-xl border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <h3 className="font-medium mb-2" style={{ color: "var(--foreground)" }}>{item.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 px-6 text-center" style={{ background: "var(--primary)" }}>
        <h2 className="text-3xl font-bold mb-4 text-white">¿Listo para empezar?</h2>
        <p className="text-base mb-8 text-indigo-200">Crea tu cuenta gratis en menos de 2 minutos.</p>
        <Link
          href="/register"
          className="inline-block px-8 py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90 bg-white"
          style={{ color: "var(--primary)" }}
        >
          Crear cuenta gratis →
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
        <p>© 2026 NexPanel. Construido con Next.js, Tailwind CSS y Supabase.</p>
      </footer>
    </div>
  );
}
