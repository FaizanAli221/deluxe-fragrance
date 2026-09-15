import PolicyPage from "@/components/PolicyPage";

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund policy"
      paragraphs={[
        "If you're not satisfied with your order, unopened items can be returned within 7 days of delivery for a full refund.",
        "Opened or used items can only be refunded if the product arrived damaged or was incorrect. Please contact us with photos within 48 hours of delivery.",
        "Refunds are issued to the original payment method within 5–7 business days of the return being received and inspected.",
      ]}
    />
  );
}
