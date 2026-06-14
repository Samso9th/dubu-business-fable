export type LegalSlug = "privacy" | "terms";

interface LegalSection {
  heading: string;
  body: string[];
}
interface LegalDoc {
  title: string;
  updated: string;
  sections: LegalSection[];
}

export const LEGAL_PAGES: Record<LegalSlug, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    updated: "May 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: [
          "We collect information you provide directly — such as your name, email address, business details, and payment information — when you create an account or use our services. We also collect technical data such as IP addresses, browser type, and usage patterns to improve our platform.",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: [
          "Your information is used to provide and improve our payment services, process transactions, communicate with you about your account, comply with legal obligations, and prevent fraud. We do not sell your personal data to third parties.",
        ],
      },
      {
        heading: "3. Data Sharing",
        body: [
          "We share data only with trusted partners necessary to deliver our services — such as payment processors, banking partners, and compliance providers. All partners are bound by strict data protection agreements.",
        ],
      },
      {
        heading: "4. Data Security",
        body: [
          "We use industry-standard encryption, secure infrastructure, and regular security audits to protect your data. All payment data is encrypted in transit and at rest.",
        ],
      },
      {
        heading: "5. Your Rights",
        body: [
          "You have the right to access, correct, or delete your personal data at any time. You may also request a copy of your data or withdraw consent for non-essential processing. Contact us at privacy@dubupay.com to exercise these rights.",
        ],
      },
      {
        heading: "6. Cookies",
        body: [
          "We use essential cookies to keep our platform functional and analytics cookies to understand usage patterns. You can manage cookie preferences through your browser settings.",
        ],
      },
      {
        heading: "7. Changes to This Policy",
        body: [
          "We may update this policy from time to time. Material changes will be communicated via email or through our platform. Your continued use of Dubu after changes constitutes acceptance.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "May 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: [
          "By accessing or using the Dubu platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use our services.",
        ],
      },
      {
        heading: "2. Services",
        body: [
          "Dubu provides payment processing infrastructure that enables businesses to accept, manage, and settle payments in multiple currencies including USD, NGN, and cryptocurrency. Our services are available through our merchant dashboard and API.",
        ],
      },
      {
        heading: "3. Account Registration",
        body: [
          "To use Dubu, you must create a merchant account and provide accurate business information. You are responsible for maintaining the security of your account credentials and for all activity under your account.",
        ],
      },
      {
        heading: "4. Fees",
        body: [
          "Dubu charges a service fee of 1.5% plus applicable VAT on all local transactions and 3.5% on all international transactions. Fees are deducted from each successful transaction before settlement. We reserve the right to modify fees with 30 days' written notice.",
        ],
      },
      {
        heading: "5. Prohibited Activities",
        body: [
          "You may not use Dubu for illegal activities, money laundering, terrorist financing, fraud, or any activity that violates applicable laws and regulations. We reserve the right to suspend or terminate accounts engaged in prohibited activities.",
        ],
      },
      {
        heading: "6. Liability",
        body: [
          'Dubu provides its services "as is" and is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the fees you paid in the 12 months preceding the claim.',
        ],
      },
      {
        heading: "7. Termination",
        body: [
          "Either party may terminate this agreement with 30 days' written notice. Dubu may suspend or terminate your account immediately if you violate these terms. Upon termination, any pending settlements will be processed according to our standard schedule.",
        ],
      },
      {
        heading: "8. Governing Law",
        body: [
          "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved through arbitration in Lagos, Nigeria.",
        ],
      },
      {
        heading: "9. Contact",
        body: ["For questions about these terms, contact us at legal@dubupay.com."],
      },
    ],
  },
};
