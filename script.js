document.addEventListener('DOMContentLoaded', () => {
  // Hanapin ang inquiry form sa pahina
  const inquiryForm = document.querySelector('#contactForm') || document.querySelector('form');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Iwasan ang pag-reload ng page

      const submitBtn = inquiryForm.querySelector('button[type="submit"]') || inquiryForm.querySelector('.btn-primary');
      const originalText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) submitBtn.textContent = 'SENDING...';

      // Kunin ang mga input values mula sa form
      const formData = new FormData(inquiryForm);
      const data = Object.fromEntries(formData.entries());

      try {
        // Ipadala ang data sa iyong backend API na nakakonekta sa Turso DB
        const response = await fetch('/api/send-inquiry', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          alert('Salamat! matagumpay na naisumite ang iyong inquiry.');
          inquiryForm.reset();
        } else {
          throw new Error('Nagkaroon ng problema sa pag-save sa database.');
        }
      } catch (error) {
        console.error('Error submitting inquiry:', error);
        alert('Nagkaroon ng error. Paki-subok ulit mamaya.');
      } finally {
        if (submitBtn) submitBtn.textContent = originalText;
      }
    });
  }
});