"use client";

import { BusinessRegistrationFormValues, PLAN_PRICES, SERVICE_PRICES } from "./business-registration-form-schema";


const SERVICE_LABELS: Record<string, string> = {
  analytics: "Analytics",
  support: "Priority Support",
  training: "Team Training",
};

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  retail: "Retail",
  restaurant: "Restaurant & Food Service",
  ecommerce: "E-commerce",
  saas: "SaaS / Software",
  consulting: "Consulting",
  manufacturing: "Manufacturing",
  healthcare: "Healthcare",
  "real-estate": "Real Estate",
  education: "Education",
  finance: "Financial Services",
  other: "Other",
};

interface FormSummaryProps {
  values: Partial<BusinessRegistrationFormValues>;
}

export function FormSummary({ values }: FormSummaryProps) {
  const basePlanPrice = values.businessSize
    ? PLAN_PRICES[values.businessSize] ?? 0
    : 0;

  const servicesTotal = (values.services ?? []).reduce(
    (acc, s) => acc + (SERVICE_PRICES[s] ?? 0),
    0
  );

  const total = basePlanPrice + servicesTotal;

  const formatPrice = (price: number) =>
    price === 0 ? "Free" : `$${price}/mo`;

  return (
    <aside className="hidden lg:block w-96 bg-gray-50 border-l border-gray-200 sticky top-12 h-screen overflow-y-auto">
      {/* ← removed h-fit, sticky/top-16 from here and from inner div */}
      <div className="px-8 py-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Summary</h2>

        <div className="space-y-0">
          <SummaryRow
            label="Business registration"
            value={values.businessName || "—"}
          />
          <SummaryRow
            label="Business type"
            value={
              values.businessType
                ? BUSINESS_TYPE_LABELS[values.businessType] ?? "—"
                : "—"
            }
          />
          <SummaryRow
            label="Base plan"
            value={
              values.businessSize ? formatPrice(basePlanPrice) : "$0"
            }
          />

          {(values.services ?? []).map((service) => (
            <SummaryRow
              key={service}
              label={SERVICE_LABELS[service]}
              value={`$${SERVICE_PRICES[service]}`}
            />
          ))}
        </div>

        <div className="border-t-2 border-gray-200 mt-6 pt-5">
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold text-gray-900">
              Monthly total
            </span>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-200 last:border-b-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right max-w-[55%] break-words">
        {value}
      </span>
    </div>
  );
}