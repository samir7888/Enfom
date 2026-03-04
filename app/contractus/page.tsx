"use client";

import { useState, ChangeEvent, FormEvent, JSX } from "react";

interface ContactInfo {
  icon: JSX.Element;
  label: string;
  value: string;
}

interface SocialLink {
  label: string;
  icon: JSX.Element;
}

interface FormState {
  firstName: string;
  lastName: string;
  countryCode: string;
  phone: string;
  message: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    value: "+971 54 234 9253",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email / Whatsapp",
    value: "info@cloud22.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Our Office",
    value: "Lorem ipsum dummy text",
  },
];

const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactPage(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    countryCode: "+971",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    alert("Message sent!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16 font-sans">
      <div className="w-full max-w-5xl">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-2 tracking-tight">
          Contact Us
        </h1>
        <div className="flex justify-center mb-10">
          <div className="h-1 w-12 bg-blue-600 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Form Card */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Send us a message
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              If you have a question or comment, fill out the form to choose the
              right product from Zero. Feel free to contact us.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Contact Details
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-2 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+92">🇵🇰 +92</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-3 rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-200"
              >
                Send a message
              </button>
            </form>
          </div>

          {/* Right: Info Card */}
          <div className="lg:w-72 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl shadow-md p-8 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                Hi! We are always here to help you.
              </h2>
              <p className="text-blue-200 text-xs mb-8">
                Reach out via any of the channels below.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item: ContactInfo, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 bg-blue-600 rounded-lg p-2 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-blue-300 font-medium">{item.label}</p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-10">
              <p className="text-xs text-blue-300 mb-3 font-medium">Find us on</p>
              <div className="flex gap-3">
                {socialLinks.map((s: SocialLink, i: number) => (
                  <button
                    key={i}
                    aria-label={s.label}
                    type="button"
                    className="bg-blue-600 hover:bg-blue-500 transition rounded-lg p-2"
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}