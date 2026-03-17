import React from 'react';

export const LegalPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="max-w-4xl mx-auto px-4 py-20">
    <h1 className="text-4xl font-bold mb-8">{title}</h1>
    <div className="prose dark:prose-invert prose-slate max-w-none space-y-6 text-slate-600 dark:text-slate-400">
      <p>Last Updated: May 20, 2025</p>
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
        <p>Welcome to After Inter. We are committed to providing verified educational data for students in Telangana and Andhra Pradesh. This website is designed to be compliant with Google AdSense policies and serves as an information aggregator.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Data Accuracy</h2>
        <p>While we strive to maintain 100% verified data from official university and government scholarship portals, users are advised to always cross-check details with the official source before taking any admission-related action.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Monetization Transparency</h2>
        <p>This site may display advertisements from Google AdSense. These ads are clearly marked and do not represent endorsements of any particular third-party institution.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Privacy & Cookies</h2>
        <p>We respect your privacy. We do not sell your personal information. Cookies may be used by our advertising partners to provide relevant content.</p>
      </section>
    </div>
  </div>
);