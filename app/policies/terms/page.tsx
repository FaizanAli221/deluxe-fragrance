import PolicyPage from "@/components/PolicyPage";

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms of service"
      paragraphs={[
        "By placing an order with Fragrance Deluxe, you agree to provide accurate delivery and contact information.",
        "All product descriptions, images, and pricing are subject to change without notice. Prices are listed in PKR and include applicable taxes unless stated otherwise.",
        "This site is a demonstration project and does not process real payments or fulfil real orders.",
      ]}
    />
  );
}
