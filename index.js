        const form = document.getElementById('feedbackForm');
        const status = document.getElementById('status');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            status.textContent = 'Submitting...';
            status.style.color = '#ffff00';

            const formData = new FormData(form);
            const data = {};

            formData.forEach((value, key) => {
                data[key] = value.trim();
            });

            // Get selected NPS value
            data.nps = form.querySelector('input[name="nps"]:checked')?.value || '';

            try {
                // Replace with your actual Google Apps Script URL
                const scriptURL = 'https://script.google.com/macros/s/AKfycbx7bPrZNQqTRBFECqPPjlKp_3tOX8IyBBVx2BD-4EO076T0OXaXyCjnQ6_J4iyzoneF/exec';

                await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                status.textContent = 'Feedback Submitted Successfully! Thank you!';
                status.style.color = '#00ff00';
                form.reset();

            } catch (error) {
                console.error('Error:', error);
                status.textContent = 'Error submitting feedback. Please try again.';
                status.style.color = '#ff4444';
            }
        });