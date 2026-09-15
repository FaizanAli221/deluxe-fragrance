import PolicyPage from "@/components/PolicyPage";

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping policy"
      paragraphs={[
        "Orders are processed within 1–2 business days and typically arrive within 3–5 business days nationwide.",
        "Shipping is free on orders over Rs.5,000. Orders below that threshold carry a flat Rs.250 delivery fee.",
        "You'll receive a tracking link by email or SMS as soon as your order ships.",
      ]}
    />
  );
}
