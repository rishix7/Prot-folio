ScrollReveal().reveal('.hero-left', { origin: 'left', distance: '50px', duration: 1000, delay: 300 });
ScrollReveal().reveal('.hero-right', { origin: 'right', distance: '50px', duration: 1000, delay: 500 });
ScrollReveal().reveal('.navbar', { origin: 'top', distance: '20px', duration: 800, delay: 200 });

ScrollReveal().reveal('.about-img', {
  origin: 'left',
  distance: '50px',
  duration: 1000,
  delay: 200
});
ScrollReveal().reveal('.about-content', {
  origin: 'right',
  distance: '50px',
  duration: 1000,
  delay: 300
});


ScrollReveal().reveal('.contact-section', {
  origin: 'bottom',
  distance: '60px',
  duration: 1000,
  delay: 300,
});

document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const responseMessageElement = document.getElementById('responseMessage');

  responseMessageElement.textContent = ''; // Clear previous messages
  responseMessageElement.classList.remove('error');

  try {
      const response = await fetch('http://localhost:3000/api/contact', { // Send to your backend API endpoint
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, message })
      });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

      const data = await response.json();

      if (response.ok) {
          responseMessageElement.textContent = data.message;
          document.getElementById('contactForm').reset(); // Clear the form
      } else {
          responseMessageElement.textContent = data.message || 'An error occurred.';
          responseMessageElement.classList.add('error');
      }
  } catch (error) {
      console.error('Error sending message:', error);
      responseMessageElement.textContent = 'Network error. Please try again later.';
      responseMessageElement.classList.add('error');
  }
});


