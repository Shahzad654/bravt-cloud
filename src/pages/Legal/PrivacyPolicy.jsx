import { LegalLayout } from "./LegalLayout";

export default function PrivacyPolicy() {
  return (
    <LegalLayout>
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="text-sm text-gray-500">Effective Date: Jan 26, 2024</p>

      <p className="mt-6">
        bravtcloud.com (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) is
        committed to protecting your privacy. This Privacy Policy explains how
        we collect, use, disclose, and safeguard your information when you visit
        our website, bravtcloud.com, or use our services.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>

      <h3 className="mt-6 text-xl font-semibold">a. Personal Information</h3>
      <ul className="pl-6 list-disc">
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>
          Payment information (processed securely via third-party payment
          providers)
        </li>
      </ul>

      <h3 className="mt-6 text-xl font-semibold">
        b. Non-Personal Information
      </h3>
      <ul className="pl-6 list-disc">
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>
          Usage data, such as pages viewed, time spent, and other analytics
        </li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">
        2. How We Use Your Information
      </h2>
      <p>We use your information to:</p>
      <ul className="pl-6 list-disc">
        <li>Provide, operate, and maintain our services</li>
        <li>Process transactions and send invoices</li>
        <li>Respond to inquiries and provide customer support</li>
        <li>Improve and personalize your user experience</li>
        <li>Communicate updates, promotions, and service changes</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">
        3. Sharing Your Information
      </h2>
      <p>
        We do not sell your personal information. However, we may share your
        information with:
      </p>
      <ul className="pl-6 list-disc">
        <li>Payment processors (e.g., Stripe)</li>
        <li>
          Service providers, such as hosting providers and analytics tools
        </li>
        <li>Legal authorities, if required by law</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">4. Data Retention</h2>
      <p>
        We retain your personal data for as long as necessary to fulfill the
        purposes outlined in this policy unless a longer retention period is
        required by law.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">5. Your Rights</h2>
      <p>Depending on your location, you may have rights to:</p>
      <ul className="pl-6 list-disc">
        <li>Access and update your personal data</li>
        <li>Request data deletion</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <p className="mt-6">
        For inquiries or requests, contact us at{" "}
        <a
          href="mailto:privacy@bravtcloud.com"
          className="text-primary hover:underline"
        >
          admin@bravtcloud.com
        </a>
      </p>
    </LegalLayout>
  );
}
