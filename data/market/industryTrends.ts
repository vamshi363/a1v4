export interface IndustryTrend {
  industry_name: string;
  demand_score: number; // 0-100 indicating future growth potential
  growth_reason: string;
  global_trend: string;
  india_trend: string;
}

export const industryTrends: Record<string, IndustryTrend> = {
  "Tech & IT Services": {
    industry_name: "Tech & IT Services",
    demand_score: 95,
    growth_reason: "Digital transformation, cloud migration, and AI adoption across all business sectors.",
    global_trend: "Consistent high growth, shift towards AI/ML and cybersecurity.",
    india_trend: "India remains a global IT hub, moving from service-based to product-based innovation."
  },
  "Healthcare & Pharmaceuticals": {
    industry_name: "Healthcare & Pharmaceuticals",
    demand_score: 92,
    growth_reason: "Aging population, increased health awareness, and biotech advancements.",
    global_trend: "Massive investments in biotech, telehealth, and personalized medicine.",
    india_trend: "Rapid expansion of hospital networks, medical tourism, and generic pharma dominance."
  },
  "BFSI": {
    industry_name: "Banking, Financial Services & Insurance (BFSI)",
    demand_score: 88,
    growth_reason: "Fintech innovation, digital payments spread, and wealth management growth.",
    global_trend: "Shift towards decentralized finance, AI-driven risk assessment, and digital banking.",
    india_trend: "Explosive growth in UPI/digital payments and increased retail stock market participation."
  },
  "Education & EdTech": {
    industry_name: "Education & EdTech",
    demand_score: 85,
    growth_reason: "Continuous need for upskilling and the democratization of learning via digital platforms.",
    global_trend: "Hybrid learning models, AI-driven personalized education, and lifelong learning.",
    india_trend: "Massive EdTech user base, push for digital literacy, and a highly competitive test-prep market."
  },
  "E-commerce & Retail": {
    industry_name: "E-commerce & Retail",
    demand_score: 87,
    growth_reason: "Shift in consumer behavior towards online shopping and direct-to-consumer (D2C) brands.",
    global_trend: "Omnichannel retail, automated logistics, and social commerce.",
    india_trend: "Deep penetration into Tier-2/Tier-3 cities, quick commerce explosion, and rising middle class."
  },
  "Manufacturing & Infrastructure": {
    industry_name: "Manufacturing & Infrastructure",
    demand_score: 82,
    growth_reason: "Government push for domestic manufacturing and large-scale infrastructure projects.",
    global_trend: "Industry 4.0, IoT integration, and supply chain diversification.",
    india_trend: "Make in India initiative, PLI schemes, and massive highway/railway construction."
  },
  "Media & Entertainment": {
    industry_name: "Media & Entertainment",
    demand_score: 80,
    growth_reason: "Surge in digital content consumption, gaming, and OTT platforms.",
    global_trend: "M&A of media conglomerates, shift to streaming, and rise of the creator economy.",
    india_trend: "Boom in regional OTT content, gaming industry growth, and high mobile data consumption."
  },
  "Renewable Energy & Sustainability": {
    industry_name: "Renewable Energy & Sustainability",
    demand_score: 89,
    growth_reason: "Global push towards net-zero emissions and climate change mitigation.",
    global_trend: "Massive shift from fossil fuels to solar, wind, and EV infrastructure.",
    india_trend: "Aggressive government targets for solar energy capacity and EV adoption."
  }
};
