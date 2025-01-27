import { LegalLayout } from "./LegalLayout";

export default function TermsOfService() {
  return (
    <LegalLayout>
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="text-sm text-gray-500">Effective Date: Jan 26, 2024</p>

      <p className="mt-6">
        These Terms of Service (&quot;Terms&quot;) govern your use of services
        provided by bravtcloud.com (&quot;we,&quot; &quot;our,&quot;
        &quot;us&quot;). By using our services, you agree to these Terms.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">1. Account Registration</h2>
      <p>To use our services, you must:</p>
      <ul className="pl-6 list-disc">
        <li>Provide accurate and complete information during registration</li>
        <li>Maintain the confidentiality of your account credentials</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">2. Payment Terms</h2>
      <ul className="pl-6 list-disc">
        <li>
          All payments are due in advance and are non-refundable, unless
          otherwise stated
        </li>
        <li>
          Failure to make timely payments may result in account suspension or
          termination
        </li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">3. Service Use</h2>
      <p>You agree to:</p>
      <ul className="pl-6 list-disc">
        <li>Use our services only for lawful purposes</li>
        <li>Abide by our Acceptable Use Policy</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">4. Service Availability</h2>
      <p>
        We strive for 99.9% uptime but do not guarantee uninterrupted access.
        Scheduled maintenance and unforeseen issues may affect availability.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">
        5. Limitation of Liability
      </h2>
      <p>To the fullest extent permitted by law:</p>
      <ul className="pl-6 list-disc">
        <li>
          We are not liable for indirect, incidental, or consequential damages
        </li>
        <li>
          Our total liability is limited to the amount you paid for the service
          in the three months preceding the event
        </li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">6. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account for breach of
        these Terms or our Acceptable Use Policy.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">7. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of
        the United States of America.
      </p>

      <p className="mt-6">
        For questions about these Terms, contact us at{" "}
        <a
          href="mailto:legal@bravtcloud.com"
          className="text-primary hover:underline"
        >
          admin@bravtcloud.com
        </a>
      </p>
    </LegalLayout>
  );
}
