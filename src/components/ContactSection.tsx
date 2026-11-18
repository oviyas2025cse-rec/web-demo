import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import {
  EnquiryInput,
  sanitizeEnquiryInput,
  validateEnquiryInput,
} from '../utils/siteLogic';
import { MagneticButton, ScrollReveal, SpotlightCard } from './MotionPrimitives';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactSectionProps {
  prefilledSubject?: string;
  compactHeader?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledSubject = '',
  compactHeader = false,
}) => {
  const [form, setForm] = useState<EnquiryInput>({
    name: '',
    email: '',
    phone: '',
    subject: prefilledSubject,
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryInput, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (prefilledSubject) {
      setForm((prev) => ({ ...prev, subject: prefilledSubject }));
    }
  }, [prefilledSubject]);

  const handleChange = (field: keyof EnquiryInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const sanitized = sanitizeEnquiryInput(form);
    const validation = validateEnquiryInput(sanitized);

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitized),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors && typeof data.errors === 'object') {
          setErrors(data.errors);
        }
        setServerError(
          data.error || 'Unable to submit your enquiry right now. Please try again.'
        );
        return;
      }

      setConfirmation({
        referenceId: data.referenceId || 'NIM-CONFIRMED',
        message:
          data.message ||
          'Thank you. Your enquiry has been received by NIMAI Engineering.',
      });
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch {
      setServerError(
        'Network error while sending your enquiry. Please call +6011 5555 7677 or retry.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact-section"
      aria-label="Contact NIMAI Engineering"
      className={`relative z-10 ${compactHeader ? 'py-16 lg:py-24' : 'pb-24 pt-6'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {compactHeader && (
          <ScrollReveal className="max-w-2xl space-y-3 mb-12">
            <p className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.22em] text-[#22D3EE]">
              <span className="h-px w-6 bg-[#F5C451]" />
              <span>Direct Engineering Desk · Johor Bahru</span>
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Start Your Project Consultation
            </h2>
            <p className="text-sm sm:text-base text-[#C2D2EE] leading-relaxed">
              Speak directly with our Johor Bahru engineering team for ELV system design, Astro 4K
              UHD SMATV upgrades, M&amp;E power works, structured cabling, or 24/7 maintenance SLAs.
            </p>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Verified Contact Details & Official Map */}
          <ScrollReveal className="lg:col-span-5 space-y-6">
            <SpotlightCard className="nimai-glass-violet rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="relative z-10">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5C451]">
                  Headquarters
                </p>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {COMPANY_INFO.name}
                </h3>
              </div>

              <div className="relative z-10 space-y-4 text-sm">
                <a
                  href={COMPANY_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <MapPin className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#9BB4DB]">
                      Office Address
                    </p>
                    <p className="text-white leading-relaxed mt-0.5">{COMPANY_INFO.address}</p>
                  </div>
                </a>

                <a
                  href={COMPANY_INFO.phoneHref}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#9BB4DB]">
                      Direct Phone
                    </p>
                    <p className="text-white font-mono mt-0.5">{COMPANY_INFO.phoneDisplay}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#9BB4DB]">
                      Email
                    </p>
                    <p className="text-white break-all mt-0.5">{COMPANY_INFO.email}</p>
                  </div>
                </a>

                <a
                  href={COMPANY_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Globe className="w-5 h-5 text-[#22D3EE] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-[#9BB4DB]">
                      Official Website
                    </p>
                    <p className="text-white mt-0.5">{COMPANY_INFO.websiteDisplay}</p>
                  </div>
                </a>
              </div>

              <div className="relative z-10 pt-2 flex flex-wrap gap-3">
                <a
                  href={COMPANY_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nimai-btn-sheen flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#128C7E] to-[#0891B2] hover:brightness-110 border border-cyan-300/25 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
                <a
                  href={COMPANY_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-[#E2F1FF] bg-white/8 hover:bg-white/14 border border-white/15 transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#22D3EE]" />
                </a>
              </div>
            </SpotlightCard>

            {/* Verified Google Maps Embed */}
            <div className="nimai-glass rounded-3xl overflow-hidden border border-cyan-300/20">
              <iframe
                title="NIMAI Engineering Johor Bahru Location Map"
                src={COMPANY_INFO.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[270px] border-0 block"
              />
            </div>
          </ScrollReveal>

          {/* Right Column: Live Validated Enquiry Form */}
          <ScrollReveal delay={0.08} className="lg:col-span-7">
            <SpotlightCard className="nimai-glass-cyan rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_65px_rgba(4,7,26,0.55)]">
              <div className="relative z-10 mb-7 space-y-2">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#22D3EE]">
                  Project &amp; Service Enquiry
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  Send Us Your Requirements
                </h3>
                <p className="text-sm text-[#C7D7F2]">
                  Complete the form below to receive a reference ID and direct response from our
                  engineering team.
                </p>
              </div>

              {confirmation ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="relative z-10 rounded-2xl p-6 sm:p-8 bg-[#0A1E3D]/90 border border-cyan-300/45 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-400/15 border border-cyan-300/40 flex items-center justify-center text-[#22D3EE]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#F5C451]">
                      Enquiry Logged Successfully
                    </p>
                    <h4 className="font-display text-2xl font-bold text-white">
                      Reference ID: {confirmation.referenceId}
                    </h4>
                    <p className="text-sm text-[#D2E2FA] leading-relaxed">
                      {confirmation.message}
                    </p>
                  </div>
                  <MagneticButton
                    type="button"
                    onClick={() => setConfirmation(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] to-[#38BDF8] cursor-pointer"
                  >
                    <span>Submit Another Enquiry</span>
                  </MagneticButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-5">
                  {serverError && (
                    <div
                      role="alert"
                      className="rounded-xl px-4 py-3 bg-rose-500/15 border border-rose-400/40 text-sm text-rose-200"
                    >
                      {serverError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase tracking-wider text-[#C7D7F2] mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Full Name / Company Representative"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D92B8] bg-[#070B24]/90 border border-white/15 focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 outline-none transition-all"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase tracking-wider text-[#C7D7F2] mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="name@company.com"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D92B8] bg-[#070B24]/90 border border-white/15 focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 outline-none transition-all"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-mono uppercase tracking-wider text-[#C7D7F2] mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+60 11 5555 7677"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D92B8] bg-[#070B24]/90 border border-white/15 focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 outline-none transition-all"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-mono uppercase tracking-wider text-[#C7D7F2] mb-2"
                      >
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        placeholder="e.g. ELV Systems, Astro 4K SMATV, CCTV"
                        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D92B8] bg-[#070B24]/90 border border-white/15 focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 outline-none transition-all"
                      />
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-rose-300">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-[#C7D7F2] mb-2"
                    >
                      Project / Enquiry Details *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Share your building type, required ELV / M&E / IT / cabling scope, site location, and timeline..."
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#7D92B8] bg-[#070B24]/90 border border-white/15 focus:border-[#22D3EE] focus:ring-2 focus:ring-[#22D3EE]/30 outline-none transition-all resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-300">{errors.message}</p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-[#9BB4DB]">
                      Your enquiry is recorded directly by our Johor Bahru engineering desk.
                    </p>
                    <MagneticButton
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-[#041024] bg-gradient-to-r from-[#22D3EE] via-[#38BDF8] to-[#60A5FA] hover:brightness-110 disabled:opacity-60 shadow-[0_10px_28px_rgba(34,211,238,0.3)] cursor-pointer shrink-0"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
