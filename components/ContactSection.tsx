import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Security: Check Rate Limit (1 minute cooldown)
    const lastSubmission = localStorage.getItem('lastSubmissionTime');
    const now = Date.now();
    if (lastSubmission && now - parseInt(lastSubmission) < 60000) {
        alert("Please wait a minute before sending another message.");
        return;
    }

    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Security: Spam Trap (Honeypot) check
    if (formData.get("botcheck")) {
        console.warn("Bot detected.");
        setIsSubmitting(false);
        return;
    }

    // WEB3FORMS API KEY
    const accessKey = "e18701d3-6793-4754-98a8-656c52a2198d"; 

    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitting(false);
        setShowSuccess(true);
        form.reset(); 
        
        // Update rate limit timestamp
        localStorage.setItem('lastSubmissionTime', Date.now().toString());

        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      } else {
        console.error("Submission failed", data);
        setIsSubmitting(false);
        alert("Something went wrong. Please check your internet connection or try again later.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setIsSubmitting(false);
      alert("Error connecting to the server.");
    }
  };

  return (
    <section id="contact" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8 font-manrope">
      
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

          <form className="w-full max-w-2xl space-y-6 mt-4 opacity-0" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                  Name
                </p>
                <input
                  required
                  name="name" 
                  className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10"
                  placeholder="Enter your name"
                  type="text"
                />
              </label>
              <label className="flex flex-col">
                <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                  Email
                </p>
                <input
                  required
                  name="email"
                  className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10"
                  placeholder="Enter your email"
                  type="email"
                />
              </label>
            </div>
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                Subject
              </p>
              <input
                required
                name="subject"
                className="form-input h-12 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10"
                placeholder="Topic"
                type="text"
              />
            </label>
            <label className="flex flex-col">
              <p className="pb-2 text-sm font-medium leading-normal text-gray-400">
                Message
              </p>
              <textarea
                required
                name="message"
                className="form-input min-h-36 w-full resize-none overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 text-base font-normal leading-normal text-white placeholder:text-gray-600 transition-all duration-300 focus:outline-none focus:border-white focus:ring-0 focus:bg-white/10"
                placeholder="Write your message here..."
              ></textarea>
            </label>
            
            {/* Honeypot for spam protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            <div className="flex flex-col items-center pt-2 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group relative flex h-14 w-full sm:w-auto min-w-[200px] items-center justify-center gap-2 rounded-full px-8 text-base font-bold transition-all duration-300 ease-in-out ${
                    isSubmitting
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