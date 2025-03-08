import { LegalLayout } from "./LegalLayout";

export default function AcceptableUsePolicy() {
  return (
    <LegalLayout>
      <h1 className="text-3xl font-bold tracking-tight">
        Acceptable Use Policy
      </h1>
      <p className="text-sm text-gray-500">Effective Date: Jan 26, 2024</p>

      <p className="mt-6">
        This Acceptable Use Policy (&quot;Policy&quot;) outlines prohibited
        activities when using services provided by bravtcloud.com
        (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;). By using our
        services, you agree to comply with this Policy.
      </p>

      <h2 className="mt-8 text-2xl font-semibold">1. Prohibited Activities</h2>
      <p>You may not use our services to:</p>
      <ul className="pl-6 list-disc">
        <li>Engage in any illegal activities</li>
        <li>
          Host, share, or transmit harmful, offensive, or inappropriate content
        </li>
        <li>Distribute malware, phishing, or other malicious software</li>
        <li>Violate intellectual property rights</li>
        <li>Engage in spamming or unsolicited bulk email</li>
        <li>Interfere with or disrupt network operations</li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">2. Security Obligations</h2>
      <p>You must:</p>
      <ul className="pl-6 list-disc">
        <li>Maintain the security of your account credentials</li>
        <li>
          Notify us immediately if you suspect unauthorized access or activity
        </li>
      </ul>

      <h2 className="mt-8 text-2xl font-semibold">3. Enforcement</h2>
      <p>
        We reserve the right to suspend or terminate accounts found in violation
        of this Policy without notice.
      </p>

      <p className="mt-6">
        For questions about this Policy, contact us at{" "}
        <a
          href="mailto:abuse@bravtcloud.com"
          className="text-primary hover:underline"
        >
          admin@bravtcloud.com
        </a>
      </p>
    </LegalLayout>
  );
}
