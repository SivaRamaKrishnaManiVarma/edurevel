/**
 * EduRevel Main Interactive JavaScript
 * Accessible mobile navigation, FAQ accordion, and WhatsApp enquiry routing.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const siteNav = document.querySelector('.site-nav');

  if (menuBtn && siteNav) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      siteNav.classList.toggle('is-open');
    });

    // Close mobile nav when clicking a link
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (siteNav.classList.contains('is-open')) {
          siteNav.classList.remove('is-open');
          menuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    });
  }

  // 2. Accessible FAQ Accordion
  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      
      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isExpanded) {
        item.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 3. Contact Form Handler (Client validation and WhatsApp prefill generation)
  const contactForm = document.getElementById('enquiryForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const offeringSelect = document.getElementById('offering');
      const messageInput = document.getElementById('message');
      const formFeedback = document.getElementById('formFeedback');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const offering = offeringSelect ? offeringSelect.value : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !phone) {
        if (formFeedback) {
          formFeedback.innerHTML = '<div style="color: #c53030; background: #fff5f5; padding: 12px; border-radius: 6px; border: 1px solid #feb2b2; margin-top: 15px;">Please provide your name and phone number to proceed.</div>';
        }
        return;
      }

      // Format WhatsApp query
      const whatsappText = `Hi EduRevel, my name is ${name}. I am inquiring regarding: ${offering}. ${message ? 'Message: ' + message : ''}`;
      const whatsappUrl = `https://wa.me/917730912808?text=${encodeURIComponent(whatsappText)}`;

      if (formFeedback) {
        formFeedback.innerHTML = `
          <div style="color: #22543d; background: #f0fff4; padding: 16px; border-radius: 8px; border: 1px solid #9ae6b4; margin-top: 20px;">
            <p style="font-weight: 700; margin-bottom: 8px;">Enquiry Ready</p>
            <p style="margin-bottom: 12px; font-size: 0.95rem;">Click below to send your enquiry directly to the EduRevel admissions team on WhatsApp:</p>
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="display: inline-flex;">
              Continue to WhatsApp (+91 77309 12808)
            </a>
          </div>
        `;
      }
    });
  }

  // 4. Folder Cards Accessible Interaction (Touch & Keyboard support)
  const folderCards = document.querySelectorAll('.folder-card');
  if (folderCards.length > 0) {
    folderCards.forEach(card => {
      card.addEventListener('click', () => {
        const wasActive = card.classList.contains('is-active');
        folderCards.forEach(c => c.classList.remove('is-active'));
        if (!wasActive) {
          card.classList.add('is-active');
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const wasActive = card.classList.contains('is-active');
          folderCards.forEach(c => c.classList.remove('is-active'));
          if (!wasActive) {
            card.classList.add('is-active');
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.folder-card')) {
        folderCards.forEach(c => c.classList.remove('is-active'));
      }
    });
  }
});
