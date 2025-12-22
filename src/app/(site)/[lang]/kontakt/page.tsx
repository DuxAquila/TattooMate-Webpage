import { getDict, t } from "@/lib/i18n/dictionaries";
import InboundRequestForm from "@/components/site/InboundRequestForm";

export default async function kontakt({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  const copy = {
    title: t(dict, "common.contact.title"),
    lead: t(dict, "common.contact.lead"),

    nameLabel: t(dict, "common.contact.fields.name"),
    emailLabel: t(dict, "common.contact.fields.email"),
    companyLabel: t(dict, "common.contact.fields.company"),
    phoneLabel: t(dict, "common.contact.fields.phone"),
    messageLabel: t(dict, "common.contact.fields.message"),

    submit: t(dict, "common.contact.submit"),
    hint: t(dict, "common.contact.hint"),
    home: t(dict, "common.nav.home"),

    successTitle: t(dict, "common.contact.success.title"),
    successText: t(dict, "common.contact.success.text"),

    errorText: t(dict, "common.contact.error"),
  };

  return (
    <main className="tm-section">
      <div className="tm-container">
        <InboundRequestForm type="CONTACT" lang={lang as "de" | "en"} copy={copy} />
      </div>
    </main>
  );
}

