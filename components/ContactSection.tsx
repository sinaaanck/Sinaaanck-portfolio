import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Input validation utilities
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 1000); // Max length
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const isValidName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100 && !/[<>{}]/.test(name);
};

const isValidMessage = (message: string): boolean => {
  return message.length >= 10 && message.length <= 2000;
};

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const lastSubmitTime = useRef<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const successMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.children;
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (successMsgRef.current) {
      if (showSuccess) {
        gsap.set(successMsgRef.current, { height: "auto", marginTop: 24, opacity: 0, y: 10 });
        gsap.to(successMsgRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(successMsgRef.current, {
          opacity: 0,
          y: -10,
          height: 0,
          marginTop: 0,
          duration: 0.4,
          ease: "power2.in"
        });
      }
    }
  }, [showSuccess]);

  const validateForm = useCallback((formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!isValidName(name)) {
      newErrors.name = 'Please enter a valid name (2-100 characters)';
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!subject || subject.length < 2 || subject.length > 200) {
      newErrors.subject = 'Please enter a valid subject (2-200 characters)';
    }
    if (!isValidMessage(message)) {
      newErrors.message = 'Please enter a message (10-2000 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Rate limiting: prevent submissions within 10 seconds
    const now = Date.now();
    if (now - lastSubmitTime.current < 10000) {
      setErrors({ form: 'Please wait a moment before submitting again.' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Validate inputs
    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    // Sanitize inputs before submission
    const sanitizedData = new FormData();
    sanitizedData.append('name', sanitizeInput(formData.get('name') as string));
    sanitizedData.append('email', (formData.get('email') as string).trim().toLowerCase());
    sanitizedData.append('subject', sanitizeInput(formData.get('subject') as string));
    sanitizedData.append('message', sanitizeInput(formData.get('message') as string));

    // Web3Forms Access Key (public key - validated by domain)
    sanitizedData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY || "e18701d3-6793-4754-98a8-656c52a2198d");

    // Honeypot field
    if (formData.get('botcheck')) {
      setIsSubmitting(false);
      return; // Bot detected
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: sanitizedData
      });

      const data = await response.json();

      if (data.success) {
        lastSubmitTime.current = now;
        setIsSubmitting(false);
        setShowSuccess(true);
        form.reset();

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        setIsSubmitting(false);
        setErrors({ form: 'Something went wrong. Please try again.' });
      }
    } catch {
      setIsSubmitting(false);
      setErrors({ form: 'Error connecting to the server. Please try again.' });
    }
  };

  return (
    <section id="contact" className="relative flex w-full flex-col items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8 font-manrope">

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center">
        <div ref={containerRef} className="flex w-full flex-col items-center gap-8 rounded-xl p-4">
          <div className="text-center opacity-0">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-4 text-base font-normal leading-normal text-gray-500 sm:text-lg max-w-lg mx-auto">
              Have a project in mind? Let's discuss how we can work together to build something exceptional.
            </p>
          </div>

          {errors.form && (
            <div className="w-full max-w-2xl p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {errors.form}
            </div>
          )}

          <form className="w-full max-w-2xl space-y-6 mt-4 opacity-0" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                  Name
                </p>
                <input
                  required
                  name="name"
                  maxLength={100}
                  className={`form-input h-12 w-full resize-none overflow-hidden rounded-lg border ${errors.name ? 'border-red-500/50' : 'border-white/10'} bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10`}
                  placeholder="Enter your name"
                  type="text"
                  autoComplete="name"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name}</span>}
              </label>
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                  Email
                </p>
                <input
                  required
                  name="email"
                  maxLength={254}
                  className={`form-input h-12 w-full resize-none overflow-hidden rounded-lg border ${errors.email ? 'border-red-500/50' : 'border-white/10'} bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10`}
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="email"
                />
                {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
              </label>
            </div>
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                Subject
              </p>
              <input
                required
                name="subject"
                maxLength={200}
                className={`form-input h-12 w-full resize-none overflow-hidden rounded-lg border ${errors.subject ? 'border-red-500/50' : 'border-white/10'} bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10`}
                placeholder="Topic"
                type="text"
              />
              {errors.subject && <span className="text-red-400 text-xs mt-1">{errors.subject}</span>}
            </label>
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                Message
              </p>
              <textarea
                required
                name="message"
                maxLength={2000}
                className={`form-input min-h-36 w-full resize-none overflow-hidden rounded-lg border ${errors.message ? 'border-red-500/50' : 'border-white/10'} bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10`}
                placeholder="Write your message here..."
              ></textarea>
              {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message}</span>}
            </label>

            {/* Honeypot for spam/bot protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="flex flex-col items-center pt-2 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative flex h-14 w-full sm:w-auto min-w-[200px] items-center justify-center gap-2 rounded-full px-8 text-base font-bold transition-all duration-300 ease-in-out ${isSubmitting
                  ? 'bg-gray-800 cursor-not-allowed text-gray-500'
                  : 'bg-white text-black hover:bg-gray-200 hover:scale-105 active:scale-95'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-xl">progress_activity</span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="material-symbols-outlined text-xl transition-transform duration-300 group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>

              <div ref={successMsgRef} className="w-full max-w-md overflow-hidden opacity-0 h-0">
                <div className="relative mt-2">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-25"></div>

                  <div className="relative flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-4 rounded-xl shadow-2xl">
                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                      <span className="material-symbols-outlined">check</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm md:text-base">Message Sent Successfully</h4>
                      <p className="text-gray-400 text-xs md:text-sm mt-0.5">Thank you for reaching out. I'll get back to you shortly.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
};