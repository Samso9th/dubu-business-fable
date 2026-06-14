export type InfoSlug = "about" | "contact";

export type Block =
  | { type: "text"; heading?: string; body: string[] }
  | {
      type: "cards";
      heading?: string;
      items: { title: string; description?: string; action?: { label: string; href: string } }[];
    };

interface InfoDoc {
  title: string;
  lead: string;
  blocks: Block[];
}

export const INFO_PAGES: Record<InfoSlug, InfoDoc> = {
  about: {
    title: "About Dubu",
    lead: "Dubu is building unified payment infrastructure for Africa and beyond. We make it simple for businesses to accept, manage, and settle payments in multiple currencies — USD, NGN, and crypto — through a single API.",
    blocks: [
      {
        type: "text",
        heading: "Our Mission",
        body: [
          "Cross-border payments in Africa are fragmented, slow, and expensive. Businesses juggle multiple payment providers, deal with inconsistent APIs, and lose revenue to high fees and failed transactions. Dubu exists to change that. We're building a single platform that connects local and international payment rails so businesses can focus on growth, not payment plumbing.",
        ],
      },
      {
        type: "cards",
        heading: "What We Value",
        items: [
          {
            title: "Speed",
            description:
              "We believe money should move as fast as information. Every product decision is measured against how quickly value reaches the end user.",
          },
          {
            title: "Accessibility",
            description:
              "Financial infrastructure should be available to every business, regardless of size or geography. We build for inclusion first.",
          },
          {
            title: "Trust",
            description:
              "Handling money is a privilege. We earn trust through transparency, security, and reliability — every single transaction.",
          },
          {
            title: "Simplicity",
            description:
              "Complexity is the enemy of adoption. We distill cross-border payments down to a single, intuitive API.",
          },
        ],
      },
    ],
  },
  contact: {
    title: "Contact Us",
    lead: "Have a question or want to learn more about Dubu? Reach out through any of the channels below.",
    blocks: [
      {
        type: "cards",
        items: [
          {
            title: "Email Us",
            description: "For general inquiries, partnerships, or support.",
            action: { label: "support@dubupay.com", href: "mailto:support@dubupay.com" },
          },
          {
            title: "Sales",
            description: "Want a custom plan or have questions about integration?",
            action: { label: "sales@dubupay.com", href: "mailto:sales@dubupay.com" },
          },
        ],
      },
    ],
  },
};
