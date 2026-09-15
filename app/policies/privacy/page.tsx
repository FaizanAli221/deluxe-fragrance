import PolicyPage from "@/components/PolicyPage";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy policy"
      paragraphs={[
        "We collect only the information needed to process your order: your name, contact details, and delivery address.",
        "We never sell your personal information to third parties. Payment details are handled by our payment processor and are not stored on our servers.",
        "You can request a copy of your data or ask us to delete it at any time by contacting our support team.",
      ]}
    />
  );
}
