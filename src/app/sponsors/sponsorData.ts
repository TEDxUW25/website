export interface Sponsor {
  name: string;
  logo: string;
  description: string;
}

export interface SponsorTier {
  tier: string;
  sponsors: Sponsor[];
}
export const sponsorData: SponsorTier[] = [
  {
    tier: "Diamnond",
    sponsors: [
      {
        name: "Mef",
        logo: "/sponsorLogos/diamond/mef.png",
        description:
          "Mathematics Endowment Fund supporting education and innovation.",
      },
      {
        name: "Mef",
        logo: "/sponsorLogos/diamond/mef.png",
        description:
          "Mathematics Endowment Fund supporting education and innovation.",
      },
      {
        name: "Mef",
        logo: "/sponsorLogos/diamond/mef.png",
        description:
          "Mathematics Endowment Fund supporting education and innovation.",
      },
    ],
  },
  {
    tier: "Platimun",
    sponsors: [
      {
        name: "WUSA",
        logo: "/sponsorLogos/platinum/wusa.png",
        description: "Waterloo Undergraduate Student Association",
      },
      {
        name: "WUSA",
        logo: "/sponsorLogos/platinum/wusa.png",
        description: "Waterloo Undergraduate Student Association",
      },
      {
        name: "WUSA",
        logo: "/sponsorLogos/platinum/wusa.png",
        description: "Waterloo Undergraduate Student Association",
      },
    ],
  },
  {
    tier: "Gold",
    sponsors: [
      {
        name: "CIGI",
        logo: "/sponsorLogos/gold/cigi.png",
        description: "Centre for International Governance Innovation ",
      },
      {
        name: "CIGI",
        logo: "/sponsorLogos/gold/cigi.png",
        description: "Centre for International Governance Innovation ",
      },
      {
        name: "CIGI",
        logo: "/sponsorLogos/gold/cigi.png",
        description: "Centre for International Governance Innovation ",
      },
    ],
  },
  {
    tier: "Bronze",
    sponsors: [
      {
        name: "draftaid",
        logo: "/sponsorLogos/bronze/draftaid.png",
        description:
          "DraftAid | AI CAD Drawing Automation | The Fastest Way to Generate Consistent 2D Drawings from 3D Models ",
      },
      {
        name: "velocity",
        logo: "/sponsorLogos/bronze/velocity.avif",
        description:
          "Velocity is the best place for founders. If you're serious about growing your startup, we provide the top community, tools, coaches and network to make it happen.",
      },
      {
        name: "draftaid",
        logo: "/sponsorLogos/bronze/draftaid.png",
        description:
          "DraftAid | AI CAD Drawing Automation | The Fastest Way to Generate Consistent 2D Drawings from 3D Models ",
      },
      {
        name: "velocity",
        logo: "/sponsorLogos/bronze/velocity.avif",
        description:
          "Velocity is the best place for founders. If you're serious about growing your startup, we provide the top community, tools, coaches and network to make it happen.",
      },
    ],
  },
];
