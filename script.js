document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const statusMsg = document.getElementById('contactStatusMsg');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    if (statusMsg) statusMsg.textContent = '';

    try {
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (response.ok) {
        if (statusMsg) {
          statusMsg.style.color = 'green';
          statusMsg.textContent = 'Salamat! Naisumite na ang iyong inquiry.';
        } else {
          alert('Salamat! Naisumite na ang iyong inquiry.');
        }
        form.reset();
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
      if (statusMsg) {
        statusMsg.style.color = 'red';
        statusMsg.textContent = 'Nagkaroon ng error. Paki-subok ulit.';
      } else {
        alert('Nagkaroon ng error. Paki-subok ulit.');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
});
