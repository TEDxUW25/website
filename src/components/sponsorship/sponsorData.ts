export interface Sponsor {
  name: string
  logo: string
  description: string
}

export interface SponsorTier {
  tier: string
  sponsors: Sponsor[]
}
export const sponsorData: SponsorTier[] = [
  { tier: "Diamnond",
    sponsors: [{
      name: "Mef",
      logo: "/sponsorLogos/diamond/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    {
      name: "Mef",
      logo: "/sponsorLogos/diamond/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    {
      name: "Mef",
      logo: "/sponsorLogos/diamond/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    ],
  },
  { tier: "Platimun",
    sponsors: [{
      name: "Mef",
      logo: "/sponsorLogos/platinum/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    {
      name: "Mef",
      logo: "/sponsorLogos/platinum/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    {
      name: "Mef",
      logo: "/sponsorLogos/platinum/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    ],
  },
  { tier: "Gold",
    sponsors: [{
      name: "Mef",
      logo: "/sponsorLogos/gold/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    {
      name: "Mef",
      logo: "/sponsorLogos/gold/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    {
      name: "Mef",
      logo: "/sponsorLogos/gold/mef.png",
      description: "Mathematics Endowment Fund supporting education and innovation.",
    },
    ],
  },
]
         