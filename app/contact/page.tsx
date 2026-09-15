"use client";

import { useState } from "react";
import { MessageCircle, Mail, Phone, MapPin, Clock, CheckCircle2, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Fragrance Recommendation",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-2">Concierge & Customer Care</p>
          <h1 className="font-display text-3xl italic text-ink sm:text-5xl">
            Contact Fragrance Deluxe
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink/75 sm:text-base">
            Whether you are seeking scent advice, checking an order, or
            inquiring about retail availability, our fragrance specialists are
            at your service.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="https://wa.me/923258764465"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center border border-line bg-white/50 p-6 text-center transition-all hover:border-brass hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
              <MessageCircle size={24} />
            </div>
            <h3 className="mt-4 font-display text-base text-ink">
              WhatsApp Support
            </h3>
            <p className="mt-1 text-xs text-stone">Fastest response time</p>
            <p className="mt-2 text-sm font-semibold text-ink group-hover:text-brass">
              +92 325 8764465
            </p>
          </a>

          <div className="flex flex-col items-center border border-line bg-white/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brass/15 text-brass">
              <Phone size={22} />
            </div>
            <h3 className="mt-4 font-display text-base text-ink">
              Customer Helpline
            </h3>
            <p className="mt-1 text-xs text-stone">Mon – Sat, 10am – 10pm</p>
            <p className="mt-2 text-sm font-semibold text-ink">
              +92 325 8764465
            </p>
          </div>

          <div className="flex flex-col items-center border border-line bg-white/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wine/15 text-wine">
              <Mail size={22} />
            </div>
            <h3 className="mt-4 font-display text-base text-ink">
              Email Concierge
            </h3>
            <p className="mt-1 text-xs text-stone">Within 24 business hours</p>
            <p className="mt-2 text-sm font-semibold text-ink">
              info@fragrancedeluxe.pk
            </p>
          </div>

          <div className="flex flex-col items-center border border-line bg-white/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/10 text-ink">
              <MapPin size={22} />
            </div>
            <h3 className="mt-4 font-display text-base text-ink">
              Distribution Hub
            </h3>
            <p className="mt-1 text-xs text-stone">Karachi & Lahore, PK</p>
            <p className="mt-2 text-xs font-medium text-stone">
              Formulated in Sharjah, UAE
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7 border border-line bg-white/60 p-8 sm:p-10">
            {submitted ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 size={48} className="text-brass" />
                <h3 className="mt-4 font-display text-2xl italic text-ink">
                  Message Sent Successfully
                </h3>
                <p className="mt-2 max-w-md text-sm text-stone">
                  Thank you for contacting Fragrance Deluxe. One of our
                  specialists will review your inquiry and get back to you
                  shortly.
                </p>
                <div className="mt-6 flex gap-4">
                  <a
                    href="https://wa.me/923258764465"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp Now
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "Fragrance Recommendation",
                        message: "",
                      });
                    }}
                    className="border border-ink px-5 py-2.5 text-xs text-ink hover:bg-ink hover:text-parchment"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl italic text-ink">
                  Send us a message
                </h2>
                <p className="mt-1 text-xs text-stone">
                  Fill out the form below and we will respond promptly.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs tracking-wider text-stone uppercase">
                        Your Full Name *
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="e.g. Bilal Ahmed"
                        className="w-full border border-line bg-parchment/60 px-3.5 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs tracking-wider text-stone uppercase">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="you@example.com"
                        className="w-full border border-line bg-parchment/60 px-3.5 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs tracking-wider text-stone uppercase">
                        Phone / WhatsApp
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="0300-1234567"
                        className="w-full border border-line bg-parchment/60 px-3.5 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs tracking-wider text-stone uppercase">
                        Inquiry Topic
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        className="w-full border border-line bg-parchment/60 px-3.5 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
                      >
                        <option>Fragrance Recommendation</option>
                        <option>Order Status Inquiry</option>
                        <option>Wholesale & Corporate Gifting</option>
                        <option>Return or Exchange</option>
                        <option>Other Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs tracking-wider text-stone uppercase">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Tell us what you are looking for, or share your order reference..."
                      className="w-full border border-line bg-parchment/60 px-3.5 py-2.5 text-sm text-ink focus:border-brass focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 bg-ink py-3.5 text-xs tracking-widest2 text-parchment transition-colors hover:bg-brass hover:text-ink uppercase"
                  >
                    <Send size={14} /> Send Message
                  </button>
                </form>
              </>
            )}
          </div>

          <div className="flex flex-col justify-between lg:col-span-5 border border-line bg-brass/[0.06] p-8 sm:p-10">
            <div>
              <p className="eyebrow mb-2">Our Promise</p>
              <h3 className="font-display text-2xl italic text-ink">
                Authentic luxury, without compromise
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/80">
                Every bottle from Fragrance Deluxe is manufactured under strict
                quality controls in the United Arab Emirates, utilizing premium
                fragrance oils and extrait-strength maceration.
              </p>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock size={18} className="mt-0.5 text-brass" />
                  <div>
                    <p className="font-semibold text-ink">Immediate Shipping</p>
                    <p className="text-xs text-stone">
                      Dispatched within 24 hours from Karachi & Lahore hubs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 text-brass" />
                  <div>
                    <p className="font-semibold text-ink">7-Day Guarantee</p>
                    <p className="text-xs text-stone">
                      Hassle-free exchange policy for all unopened orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-xs text-stone">
                Need an immediate answer regarding active deliveries?
              </p>
              <a
                href="https://wa.me/923258764465"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-brass hover:underline"
              >
                Chat directly with our dispatch manager on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
