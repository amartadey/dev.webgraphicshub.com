document.addEventListener("DOMContentLoaded", function () {
    let thankyouPage = "thankyou_tastyfx.html"; // Default fallback

    // Update modal content and thank-you page when a button is clicked
    document.querySelectorAll("[data-bs-toggle='modal']").forEach(button => {
        button.addEventListener("click", function () {
            let title = this.getAttribute("data-title") || "Sign-Up for a TastyFX Account";
            let content = this.getAttribute("data-content") || "Click below to complete the sign-up process.";
            let btnLabel = this.getAttribute("data-btnlabel") || "TAKE ME THERE";
            thankyouPage = this.getAttribute("data-thankyou") || "thankyou_tastyfx.html";

            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalContent").innerText = content;
            document.getElementById("submitBtn").innerText = btnLabel;
            document.getElementById("thankyouPage").value = thankyouPage;
            document.getElementById("leadSource").value = this.getAttribute("data-leadsource") || "Unknown";

            let msgBox = document.getElementById('msgBox');
            msgBox.style.display = (btnLabel === 'Contact Us') ? "block" : "none";
        });
    });

    // Intercept form submission
    const form = document.getElementById("tastyfxForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submission intercepted");

        if (validateForm()) {
            sendToWebhook().then(() => {
                // Redirect after webhook (SalesNexus is handled by its own script)
                const thankyouPage = document.getElementById("thankyouPage").value;
                console.log("Redirecting to:", thankyouPage);
                window.location.href = thankyouPage;
            });
        }
    });

    // Intercept submit button click to integrate with SalesNexus
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent any default action from button
        console.log("Submit button clicked");

        if (validateForm()) {
            // Trigger SalesNexus submission via its own logic
            callbackFuncForm2(event); // Call SalesNexus function directly
            sendToWebhook().then(() => {
                const thankyouPage = document.getElementById("thankyouPage").value;
                console.log("Redirecting to:", thankyouPage);
                window.location.href = thankyouPage;
            });
        }
    });

    // Form validation function
    function validateForm() {
        let isValid = true;

        document.querySelector(".firstnameError").innerText = "";
        document.querySelector(".lastnameError").innerText = "";
        document.querySelector(".emailError").innerText = "";
        document.querySelector(".phoneError").innerText = "";
        document.querySelector(".messageError").innerText = "";

        let firstname = document.querySelector(".firstname").value.trim();
        let lastname = document.querySelector(".lastname").value.trim();
        let email = document.querySelector(".email").value.trim();
        let phone = document.querySelector(".phone").value.trim();
        let message = document.querySelector(".message").value.trim();

        if (firstname === "") {
            document.querySelector(".firstnameError").innerText = "First name is required.";
            isValid = false;
        }
        if (lastname === "") {
            document.querySelector(".lastnameError").innerText = "Last name is required.";
            isValid = false;
        }
        if (!email.includes("@") || !email.includes(".")) {
            document.querySelector(".emailError").innerText = "Enter a valid email.";
            isValid = false;
        }
        if (!/^\(?([1-9]\d{2})\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) {
            document.querySelector(".phoneError").innerText = "Enter a valid US phone number (e.g., 123-456-7890).";
            isValid = false;
        }
        if (message.length > 799) {
            document.querySelector(".messageError").innerText = "Message exceeds 799-character limit.";
            isValid = false;
        }

        return isValid;
    }

    // Send data to webhook
    async function sendToWebhook() {
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";

        let formData = {
            firstname: document.querySelector(".firstname").value.trim(),
            lastname: document.querySelector(".lastname").value.trim(),
            email: document.querySelector(".email").value.trim(),
            phone: document.querySelector(".phone").value.trim(),
            message: document.querySelector(".message").value.trim() || "",
            leadSource: document.getElementById("leadSource").value,
            source: "TradingForexUSA.com"
        };

        console.log("Sending data to webhook:", formData);

        const webhookUrl = "https://hook.integrator.boost.space/7gopeqecppwrkmfebrizdevpq3op39da";

        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData),
                mode: "no-cors" // Note: Can't check response with no-cors
            });
            console.log("Webhook submission attempted");
            console.log("Webhook request sent (no-cors mode, no response available)");
            localStorage.setItem("webhookLog", "Webhook request sent successfully");
        } catch (error) {
            console.error("Webhook submission error:", error);
            localStorage.setItem("webhookLog", `Webhook error: ${error.message}`);
        }

        submitBtn.disabled = false;
        submitBtn.innerText = "Submitted";

        // Return a promise to delay redirect
        //return new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay
    }
});

















































/*
document.addEventListener("DOMContentLoaded", function () {
    let thankyouPage = "thankyou_tastyfx.html"; // Default fallback

    // Update modal content and thank-you page when a button is clicked
    document.querySelectorAll("[data-bs-toggle='modal']").forEach(button => {
        button.addEventListener("click", function () {
            let title = this.getAttribute("data-title") || "Sign-Up for a TastyFX Account";
            let content = this.getAttribute("data-content") || "Click below to complete the sign-up process.";
            let btnLabel = this.getAttribute("data-btnlabel") || "TAKE ME THERE";
            thankyouPage = this.getAttribute("data-thankyou") || "thankyou_tastyfx.html";

            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalContent").innerText = content;
            document.getElementById("submitBtn").innerText = btnLabel;
            document.getElementById("thankyouPage").value = thankyouPage;
            document.getElementById("leadSource").value = this.getAttribute("data-leadsource") || "Unknown";

            let msgBox = document.getElementById('msgBox');
            msgBox.style.display = (btnLabel === 'Contact Us') ? "block" : "none";
        });
    });

    // Intercept form submission
    document.getElementById("tastyfxForm").addEventListener("submit", function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Validate the form
        if (validateForm()) {
            // First send data to webhook, then trigger SalesNexus submission
            sendToWebhook();
        }
    });

    // Form validation function
    function validateForm() {
        let isValid = true;

        // Clear previous errors
        document.querySelector(".firstnameError").innerText = "";
        document.querySelector(".lastnameError").innerText = "";
        document.querySelector(".emailError").innerText = "";
        document.querySelector(".phoneError").innerText = "";
        document.querySelector(".messageError").innerText = "";

        // Get input values
        let firstname = document.querySelector(".firstname").value.trim();
        let lastname = document.querySelector(".lastname").value.trim();
        let email = document.querySelector(".email").value.trim();
        let phone = document.querySelector(".phone").value.trim();
        let message = document.querySelector(".message").value.trim();

        // Simple validation
        if (firstname === "") {
            document.querySelector(".firstnameError").innerText = "First name is required.";
            isValid = false;
        }
        if (lastname === "") {
            document.querySelector(".lastnameError").innerText = "Last name is required.";
            isValid = false;
        }
        if (!email.includes("@") || !email.includes(".")) {
            document.querySelector(".emailError").innerText = "Enter a valid email.";
            isValid = false;
        }
        if (!/^\(?([1-9]\d{2})\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) {
            document.querySelector(".phoneError").innerText = "Enter a valid US phone number (e.g., 123-456-7890). Area codes cannot start with zero.";
            isValid = false;
        }
        if (message.length > 799) {
            document.querySelector(".messageError").innerText = "Your message exceeds the 799-character limit. Please shorten it before submitting.";
            isValid = false;
        }

        return isValid;
    }

    // Send data to webhook
    async function sendToWebhook() {
        // Disable submit button and show loading state
        const submitBtn = document.getElementById("submitBtn");
        submitBtn.disabled = true;
        submitBtn.innerText = "Submitting...";
    
        // Collect form data
        let formData = {
            firstname: document.querySelector(".firstname").value.trim(),
            lastname: document.querySelector(".lastname").value.trim(),
            email: document.querySelector(".email").value.trim(),
            phone: document.querySelector(".phone").value.trim(),
            message: document.querySelector(".message").value.trim() || "",
            leadSource: document.getElementById("leadSource").value,
            source: "TradingForexUSA.com"
        };
    
        console.log("Sending data to webhook:", formData);

        // The webhook URL
        const webhookUrl = "https://hook.integrator.boost.space/7gopeqecppwrkmfebrizdevpq3op39da";
    
        try {
            let response = await fetch( webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
                mode: "no-cors"
            });
    
            let responseData = await response.text();
            console.log("Webhook Response:", responseData);
    
            if (!response.ok) {
                throw new Error(`Webhook submission failed: ${response.status}`);
            }
    
        } catch (error) {
            console.error("Webhook submission error:", error);
        }
    
        // Proceed to SalesNexus Submission after webhook is complete
       triggerSalesNexusSubmission();
    }
    

    // Function to trigger SalesNexus submission
    function triggerSalesNexusSubmission() {
        console.log("Triggering SalesNexus submission");
        
        try {
            // Create a hidden form specifically for SalesNexus
            const salesNexusForm = document.createElement('form');
            salesNexusForm.style.display = 'none';
            salesNexusForm.id = 'salesNexusForm';
            
            // Copy data from original form to the SalesNexus form
            const originalForm = document.getElementById('tastyfxForm');
            const formData = new FormData(originalForm);
            
            for (const [name, value] of formData.entries()) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                salesNexusForm.appendChild(input);
            }
            
            // Add the form to the document body
            document.body.appendChild(salesNexusForm);
            
            // This should trigger any handlers attached by the SalesNexus script
            if (typeof FT152883_sendToApp === 'function') {
                // If SalesNexus exposes its submission function
                FT152883_sendToApp();
                console.log("Called SalesNexus submission function directly");
            } else {
                // Otherwise try submitting the form
                const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
                salesNexusForm.dispatchEvent(submitEvent);
                console.log("Dispatched submit event to SalesNexus form");
            }
        } catch (error) {
            console.error("Error in SalesNexus submission:", error);
        }
        
        //Redirect to thank you page regardless of SalesNexus result
        setTimeout(() => {
            const thankyouPage = document.getElementById("thankyouPage").value;
            console.log("Redirecting to thank you page:", thankyouPage);
            window.location.href = thankyouPage;
        }, 1000);
    }
});
*/