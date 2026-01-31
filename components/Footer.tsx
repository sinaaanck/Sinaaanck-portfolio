/**
 * =============================================================================
 * Footer.tsx - Footer Component
 * =============================================================================
 * 
 * Simple footer section containing:
 * - Social media links with hover effects
 * - Copyright notice
 * 
 * Features:
 * - Brand-colored glow effects on social icon hover
 * - Scale animations for interactive feedback
 * - Accessible with proper aria-labels
 * 
 * @author Mohammed Sinan CK
 * @version 1.0.0
 * =============================================================================
 */

import React from 'react';

/**
 * Footer Component
 * Displays social links and copyright at the bottom of the page
 */
export const Footer = () => {
  return (
    // Footer container with top border separator
    <footer className="py-8 bg-[#050505] border-t border-white/10">
      <div className="container mx-auto px-6 text-center text-gray-400">

        {/* ============================================
            SOCIAL MEDIA ICONS
            Flexbox layout with gap for spacing
            Each icon has hover effects with brand colors
            ============================================ */}
        <div className="flex justify-center flex-wrap gap-6 mb-4">

          {/* GitHub Link */}
          <a
            href="https://github.com/sinaaanck"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:scale-110"
            aria-label="Github"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>

          {/* LinkedIn Link - Blue brand color glow */}
          <a
            href="https://www.linkedin.com/in/sinaaanck/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0077B5] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(0,119,181,0.5)] hover:scale-110"
            aria-label="LinkedIn"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
            </svg>
          </a>

          {/* Instagram Link - Pink/Red brand color glow */}
          <a
            href="https://www.instagram.com/sinaaan.ck"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E4405F] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(228,64,95,0.5)] hover:scale-110"
            aria-label="Instagram"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Snapchat Link - Yellow brand color glow */}
          <a
            href="https://www.snapchat.com/@sinaaanck"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFFC00] transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,252,0,0.5)] hover:scale-110"
            aria-label="Snapchat"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.002 0c-4.437 0-7.868 3.525-7.868 6.924 0 .973.235 1.838.455 2.457.19.537.152.924-.04 1.229-.537.854-2.126 2.053-2.126 4.353 0 1.346.756 2.025 1.542 2.373.243.107.508.15.54.492.026.273-.087.643-.223 1.096-.282.936-.921 3.064 1.258 3.064.939 0 1.728-.485 2.463-.935.409-.251.815-.5 1.3-.5.733 0 1.52.502 2.196 1.942.155.33.619.505.996.505.38 0 .848-.178 1.006-.51 0 0 1.428-2.915 4.502-1.937 0 0 1.424.453 1.916-1.554-.136-.453-.25-.823-.222-1.096.031-.342.296-.385.54-.492.786-.348 1.542-1.027 1.542-2.373 0-2.3-1.589-3.499-2.126-4.353-.191-.305-.23-.692-.04-1.229.22-.619.454-1.484.454-2.457.001-3.399-3.43-6.924-7.868-6.924h-.2z" />
            </svg>
          </a>

          {/* X (Twitter) Link - White glow */}
          <a
            href="https://x.com/sinaaan_ck?"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:scale-110"
            aria-label="X (Twitter)"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>

        </div>

        {/* Copyright Notice */}
        <p className="text-sm">
          © 2025 Mohammed Sinan. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};