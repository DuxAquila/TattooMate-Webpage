import { getDict, t } from "@/lib/i18n/dictionaries";
import InboundRequestForm from "@/components/site/InboundRequestForm";

export default async function demo({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  const copy = {
    title: t(dict, "common.demo.title"),
    lead: t(dict, "common.demo.lead"),

    nameLabel: t(dict, "common.demo.fields.name"),
    emailLabel: t(dict, "common.demo.fields.email"),
    companyLabel: t(dict, "common.demo.fields.company"),
    phoneLabel: t(dict, "common.demo.fields.phone"),
    messageLabel: t(dict, "common.demo.fields.message"),

    submit: t(dict, "common.demo.submit"),
    hint: t(dict, "common.demo.hint"),
    home: t(dict, "common.nav.home"),

    successTitle: t(dict, "common.demo.success.title"),
    successText: t(dict, "common.demo.success.text"),

    errorText: t(dict, "common.demo.error"),
  };

  return (
    <main className="tm-section">
      <div className="tm-container">
        <InboundRequestForm type="DEMO" lang={lang as "de" | "en"} copy={copy} />
      </div>
    </main>
  );
}

