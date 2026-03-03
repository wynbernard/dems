"use client";

import React from "react";


export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg:        #060910;
          --surface:   #0d1420;
          --border:    #1a2235;
          --orange:    #f05a1a;
          --orange-dim:#7a2d0e;
          --red:       #c0392b;
          --text:      #e8edf5;
          --muted:     #4a5568;
          --mono:      'JetBrains Mono', monospace;
          --display:   'Bebas Neue', sans-serif;
          --body:      'DM Sans', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--bg); color: var(--text);
          font-family: var(--body); overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--orange-dim); border-radius: 2px; }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(240,90,26,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(240,90,26,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 0%, black 40%, transparent 100%);
        }
        .glow-hero {
          position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
          width: 900px; height: 600px;
          background: radial-gradient(ellipse, rgba(240,90,26,0.09) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .glow-left {
          position: fixed; bottom: 0; left: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,57,43,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 4rem; height: 64px;
          background: rgba(6,9,16,0.8); backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 13px; font-weight: 500;
          color: var(--text); letter-spacing: 0.08em;
        }
        .nav-logo-icon {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, var(--orange), var(--red));
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
        }
        .nav-logo-icon svg { width: 18px; height: 18px; color: white; }
        .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
        .nav-links a {
          font-size: 13px; color: var(--muted); text-decoration: none;
          font-family: var(--mono); letter-spacing: 0.05em; transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }
        .nav-status { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; color: var(--muted); }
        .status-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #22c55e;
          box-shadow: 0 0 8px #22c55e; animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .ticker-wrap {
          position: relative; z-index: 1; margin-top: 64px;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
          background: var(--surface); overflow: hidden; height: 40px;
          display: flex; align-items: center;
        }
        .ticker { display: flex; gap: 4rem; animation: ticker 30s linear infinite; white-space: nowrap; }
        .ticker-item {
          display: flex; align-items: center; gap: 8px;
          font-family: var(--mono); font-size: 11px; color: var(--muted);
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .ticker-item span { color: var(--orange); }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .hero {
          position: relative; z-index: 1; min-height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 120px 2rem 80px; text-align: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 100px;
          border: 1px solid rgba(240,90,26,0.3); background: rgba(240,90,26,0.08);
          font-family: var(--mono); font-size: 11px; color: #f97316;
          letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 2rem;
          animation: fadeUp 0.6s ease both;
        }
        .hero-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #f97316; animation: blink 1.5s ease infinite;
        }
        .hero-title {
          font-family: var(--display); font-size: clamp(64px, 10vw, 140px);
          line-height: 0.92; letter-spacing: 0.02em; color: var(--text);
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero-title span {
          display: block;
          background: linear-gradient(135deg, var(--orange) 0%, #ff8c42 50%, var(--red) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .hero-sub {
          max-width: 520px; margin: 2rem auto 0;
          font-size: 16px; line-height: 1.7; color: #6b7a94; font-weight: 300;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero-cta { display: flex; align-items: center; gap: 1rem; margin-top: 3rem; animation: fadeUp 0.7s 0.3s ease both; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 10px;
          background: var(--orange); color: white;
          font-family: var(--body); font-size: 14px; font-weight: 500;
          text-decoration: none; border: none; cursor: pointer;
          box-shadow: 0 0 40px rgba(240,90,26,0.35); transition: all 0.2s;
        }
        .btn-primary:hover { background: #ff6b2b; box-shadow: 0 0 60px rgba(240,90,26,0.5); transform: translateY(-1px); }
        .btn-primary svg { width: 16px; height: 16px; }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 10px;
          background: transparent; color: var(--muted);
          font-family: var(--body); font-size: 14px; font-weight: 500;
          text-decoration: none; border: 1px solid var(--border); transition: all 0.2s;
        }
        .btn-ghost:hover { color: var(--text); border-color: #2a3a55; }

        .hero-stats {
          display: flex; align-items: center; gap: 3rem; margin-top: 5rem;
          padding-top: 3rem; border-top: 1px solid var(--border);
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .stat-item { text-align: center; }
        .stat-num {
          font-family: var(--display); font-size: 42px; line-height: 1;
          background: linear-gradient(135deg, var(--orange), #ff8c42);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .stat-label { font-family: var(--mono); font-size: 10px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }
        .stat-divider { width: 1px; height: 50px; background: var(--border); }

        section { position: relative; z-index: 1; padding: 100px 4rem; max-width: 1200px; margin: 0 auto; }
        .section-tag { font-family: var(--mono); font-size: 11px; color: var(--orange); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem; }
        .section-title { font-family: var(--display); font-size: clamp(36px, 5vw, 64px); line-height: 0.95; letter-spacing: 0.02em; color: var(--text); margin-bottom: 1.5rem; }

        .features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px;
          background: var(--border); border: 1px solid var(--border);
          border-radius: 16px; overflow: hidden; margin-top: 4rem;
        }
        .feature-card { background: var(--surface); padding: 2.5rem; transition: background 0.2s; position: relative; overflow: hidden; }
        .feature-card:hover { background: #111827; }
        .feature-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, var(--orange), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(240,90,26,0.1); border: 1px solid rgba(240,90,26,0.2);
          display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;
        }
        .feature-icon svg { width: 22px; height: 22px; color: var(--orange); }
        .feature-title { font-family: var(--body); font-size: 16px; font-weight: 500; color: var(--text); margin-bottom: 0.75rem; }
        .feature-desc { font-size: 14px; line-height: 1.65; color: #4a5568; font-weight: 300; }

        .roles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 4rem; }
        .role-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 12px; padding: 2rem; transition: border-color 0.2s, transform 0.2s;
        }
        .role-card:hover { border-color: rgba(240,90,26,0.3); transform: translateY(-2px); }
        .role-badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1rem; }
        .badge-admin { background: rgba(240,90,26,0.15); color: #f97316; }
        .badge-resp  { background: rgba(59,130,246,0.15); color: #60a5fa; }
        .badge-vol   { background: rgba(34,197,94,0.15);  color: #4ade80; }
        .badge-view  { background: rgba(168,85,247,0.15); color: #c084fc; }
        .role-name { font-family: var(--body); font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 0.5rem; }
        .role-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

        .alert-banner {
          position: relative; z-index: 1; margin: 0 4rem;
          background: linear-gradient(135deg, rgba(192,57,43,0.12), rgba(240,90,26,0.08));
          border: 1px solid rgba(192,57,43,0.3); border-radius: 16px; padding: 3rem;
          display: flex; align-items: center; gap: 3rem; overflow: hidden;
        }
        .alert-banner::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
          background: linear-gradient(180deg, var(--orange), var(--red));
        }
        .alert-icon {
          flex-shrink: 0; width: 60px; height: 60px;
          background: rgba(240,90,26,0.15); border: 1px solid rgba(240,90,26,0.3);
          border-radius: 14px; display: flex; align-items: center; justify-content: center;
        }
        .alert-icon svg { width: 30px; height: 30px; color: var(--orange); }
        .alert-text h3 { font-family: var(--display); font-size: 28px; color: var(--text); margin-bottom: 0.5rem; }
        .alert-text p { font-size: 14px; color: var(--muted); line-height: 1.6; max-width: 500px; }
        .alert-action { margin-left: auto; flex-shrink: 0; }

        footer {
          position: relative; z-index: 1; border-top: 1px solid var(--border);
          padding: 3rem 4rem; display: flex; align-items: center; justify-content: space-between; margin-top: 4rem;
        }
        .footer-left { font-family: var(--mono); font-size: 11px; color: var(--muted); }
        .footer-right { font-family: var(--mono); font-size: 11px; color: #1e293b; letter-spacing: 0.1em; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        @media (max-width: 768px) {
          nav { padding: 0 1.5rem; }
          .nav-links { display: none; }
          .hero { padding: 100px 1.5rem 60px; }
          .hero-cta { flex-direction: column; }
          .hero-stats { gap: 1.5rem; }
          section { padding: 60px 1.5rem; }
          .features-grid { grid-template-columns: 1fr; }
          .roles-grid { grid-template-columns: repeat(2, 1fr); }
          .alert-banner { flex-direction: column; margin: 0 1.5rem; }
          .alert-action { margin-left: 0; }
          footer { flex-direction: column; gap: 1rem; padding: 2rem 1.5rem; }
        }
      `}</style>

      <div className="grid-bg" />
      <div className="glow-hero" />
      <div className="glow-left" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </div>
          DEMS
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#roles">Access Roles</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-status">
          <span className="status-dot" />
          ALL SYSTEMS OPERATIONAL
        </div>
      </nav>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker">
          {["REAL-TIME EVACUATION TRACKING","SHELTER CAPACITY MONITORING","MULTI-AGENCY COORDINATION","RESOURCE DEPLOYMENT","INCIDENT RESPONSE","EVACUEE REGISTRATION",
            "REAL-TIME EVACUATION TRACKING","SHELTER CAPACITY MONITORING","MULTI-AGENCY COORDINATION","RESOURCE DEPLOYMENT","INCIDENT RESPONSE","EVACUEE REGISTRATION"
          ].map((item, i) => (
            <div key={i} className="ticker-item"><span>●</span> {item}</div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          National Disaster Response Authority
        </div>
        <h1 className="hero-title">
          DISASTER
          <span>EVACUATION</span>
          MANAGEMENT
        </h1>
        <p className="hero-sub">
          A unified command platform for coordinating mass evacuations, tracking displaced persons, and managing emergency resources in real time.
        </p>
        <div className="hero-cta">
          <a href="/login" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3"/>
            </svg>
            Access System
          </a>
          <a href="#features" className="btn-ghost">View Capabilities →</a>
        </div>
        <div className="hero-stats">
            {[
              { num: "99.9%", label: "Uptime SLA" },
              { num: "500K+", label: "Evacuees Tracked" },
              { num: "24/7",  label: "Active Monitoring" },
              { num: "<2s",   label: "Alert Response" },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div className="stat-divider" />}
                <div className="stat-item">
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
      </div>

      {/* FEATURES */}
      <section id="features">
        <div className="reveal">
          <div className="section-tag">// capabilities</div>
          <h2 className="section-title">BUILT FOR<br/>CRISIS RESPONSE</h2>
        </div>
        <div className="features-grid reveal">
          {[
            {
              title: "Evacuee Registration",
              desc: "Register and track displaced persons with status updates, shelter assignments, family reunification, and special needs flagging.",
              icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>
            },
            {
              title: "Shelter Management",
              desc: "Monitor shelter capacity in real time, manage occupancy levels, track resources, and coordinate transfers between facilities.",
              icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>
            },
            {
              title: "Incident Command",
              desc: "Declare and manage disaster incidents with severity classification, affected area mapping, and multi-agency response coordination.",
              icon: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            },
            {
              title: "Resource Dispatch",
              desc: "Track food, water, medical supplies, and vehicles. Automate resource requests and monitor distribution across all active shelters.",
              icon: <><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></>
            },
            {
              title: "Evacuation Routes",
              desc: "Plan and broadcast safe evacuation corridors, monitor route congestion, and issue dynamic rerouting instructions to field teams.",
              icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>
            },
            {
              title: "Reports & Analytics",
              desc: "Generate operational reports, track KPIs, export data for government submissions, and analyze response effectiveness post-incident.",
              icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>
            },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{f.icon}</svg>
              </div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ALERT BANNER */}
      <div className="alert-banner reveal">
        <div className="alert-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div className="alert-text">
          <h3>AUTHORIZED ACCESS ONLY</h3>
          <p>This system is restricted to verified emergency response personnel. All sessions are logged and monitored. Unauthorized access attempts will be reported to the appropriate authorities.</p>
        </div>
        <div className="alert-action">
          <a href="/login" className="btn-primary">Sign In →</a>
        </div>
      </div>

      {/* ROLES */}
      <section id="roles">
        <div className="reveal">
          <div className="section-tag">// access control</div>
          <h2 className="section-title">ROLE-BASED<br/>ACCESS</h2>
        </div>
        <div className="roles-grid reveal">
          {[
            { badge: "badge-admin", role: "Admin",     name: "System Administrator", desc: "Full system access. Manages users, roles, incidents, reports, and all platform configuration." },
            { badge: "badge-resp",  role: "Responder", name: "Field Responder",       desc: "Manages evacuees, shelters, and resource requests. Core operational access for active deployments." },
            { badge: "badge-vol",   role: "Volunteer", name: "Volunteer Staff",        desc: "Registers evacuees and updates shelter occupancy. Limited write access to active incident data." },
            { badge: "badge-view",  role: "Viewer",    name: "Read-Only Observer",     desc: "View-only access to dashboards, reports, and live incident status. No data modification rights." },
          ].map((r) => (
            <div key={r.role} className="role-card">
              <div className={`role-badge ${r.badge}`}>{r.role}</div>
              <div className="role-name">{r.name}</div>
              <div className="role-desc">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="footer-left">
          © 2026 DEMS — Disaster Evacuation Management System<br/>
          <span style={{ color: "#1e293b" }}>All access is monitored and logged.</span>
        </div>
        <div className="footer-right">NATIONAL DISASTER RESPONSE AUTHORITY</div>
      </footer>

      {/* Scroll Reveal Script */}
      <script dangerouslySetInnerHTML={{ __html: `
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              e.target.querySelectorAll('.feature-card, .role-card').forEach((el, i) => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(16px)';
                setTimeout(() => {
                  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0)';
                }, i * 70 + 100);
              });
            }
          });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      `}} />
    </>
  );
}