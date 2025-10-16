/**
 * form-broker.js - Fixed Multi-Form Handler
 * Handles TastyFX, Oanda, and Contact forms with unified webhook submission
 * 
 * IMPORTANT: This script works with a SINGLE modal (#exampleModal2) that uses
 * the standard field classes (.firstname, .lastname, .email, .phone, .message)
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Form broker initialized");

    let currentFormConfig = {
        thankyouPage: "thankyou_tastyfx.html",
        leadSource: "Unknown",
        formType: "tastyfx"
    };

    // Update modal content when trigger buttons are clicked
    document.querySelectorAll("[data-bs-toggle='modal']").forEach(button => {
        button.addEventListener("click", function () {
            console.log("🔍 Modal trigger clicked");
            
            let title = this.getAttribute("data-title") || "Sign-Up for a TastyFX Account";
            let content = this.getAttribute("data-content") || "Click below to complete the sign-up process.";
            let btnLabel = this.getAttribute("data-btnlabel") || "TAKE ME THERE";
            let thankyou = this.getAttribute("data-thankyou") || "thankyou_tastyfx.html";
            let leadSource = this.getAttribute("data-leadsource") || "Unknown";

            // Update current config
            currentFormConfig.thankyouPage = thankyou;
            currentFormConfig.leadSource = leadSource;
            
            // Detect form type from lead source
            if (leadSource.toLowerCase().includes('oanda')) {
                currentFormConfig.formType = 'oanda';
            } else if (leadSource.toLowerCase().includes('contact')) {
                currentFormConfig.formType = 'contact';
            } else {
                currentFormConfig.formType = 'tastyfx';
            }

            console.log("📋 Form config:", currentFormConfig);

            // Update modal elements
            const modalTitle = document.getElementById("modalTitle");
            const modalContent = document.getElementById("modalContent");
            const submitBtn = document.getElementById("submitBtn");
            const thankyouPageInput = document.getElementById("thankyouPage");
            const leadSourceInput = document.getElementById("leadSource");
            const msgBox = document.getElementById('msgBox');

            if (modalTitle) modalTitle.innerText = title;
            if (modalContent) modalContent.innerText = content;
            if (submitBtn) submitBtn.innerText = btnLabel;
            if (thankyouPageInput) thankyouPageInput.value = thankyou;
            if (leadSourceInput) leadSourceInput.value = leadSource;
            
            // Show/hide message box for Contact form
            if (msgBox) {
                msgBox.style.display = (currentFormConfig.formType === 'contact') ? "block" : "none";
            }

            // Clear all form fields and errors when modal opens
            clearFormData();
        });
    });

    // Clear form data and errors
    function clearFormData() {
        // Clear input fields (using standard classes)
        const fields = ['.firstname', '.lastname', '.email', '.phone', '.message'];
        fields.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.value = "";
        });

        // Clear consent checkbox
        const consent = document.querySelector('input[name="consent"]');
        if (consent) consent.checked = false;

        // Clear all error messages
        const errors = ['.firstnameError', '.lastnameError', '.emailError', '.phoneError', '.messageError', '.consentError'];
        errors.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) element.innerText = "";
        });

        console.log("🧹 Form cleared");
    }

    // Unified validation function
    function validateForm() {
        console.log("🔍 Validating form type:", currentFormConfig.formType);
        
        let isValid = true;

        // Clear all error messages first
        const errorSelectors = ['.firstnameError', '.lastnameError', '.emailError', '.phoneError', '.messageError', '.consentError'];
        errorSelectors.forEach(selector => {
            const errorEl = document.querySelector(selector);
            if (errorEl) errorEl.innerText = "";
        });

        // Get field values using standard classes
        const firstname = document.querySelector('.firstname')?.value.trim() || "";
        const lastname = document.querySelector('.lastname')?.value.trim() || "";
        const email = document.querySelector('.email')?.value.trim() || "";
        const phone = document.querySelector('.phone')?.value.trim() || "";
        const message = document.querySelector('.message')?.value.trim() || "";
        const consent = document.querySelector('input[name="consent"]')?.checked || false;

        console.log("📝 Form values:", { firstname, lastname, email, phone, message: message.substring(0, 50), consent });

        // Helper function to set error
        const setError = (selector, message) => {
            const errorEl = document.querySelector(selector);
            if (errorEl) {
                errorEl.innerText = message;
                isValid = false;
            }
        };

        // Validate required fields
        if (!firstname) {
            setError('.firstnameError', "First name is required.");
        }

        if (!lastname) {
            setError('.lastnameError', "Last name is required.");
        }

        if (!email || !email.includes("@") || !email.includes(".")) {
            setError('.emailError', "Enter a valid email.");
        }

        if (!phone || !/^\(?([1-9]\d{2})\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone)) {
            setError('.phoneError', "Enter a valid US phone number (e.g., 123-456-7890).");
        }

        // Validate message if it exists and has content
        if (message && message.length > 799) {
            setError('.messageError', "Message exceeds 799-character limit.");
        }

        // Validate consent
        if (!consent) {
            setError('.consentError', "Consent is required.");
        }

        console.log(isValid ? "✅ Validation passed" : "❌ Validation failed");
        return isValid;
    }

    // Send data to webhook with comprehensive error handling
    async function sendToWebhook() {
        const submitBtn = document.getElementById("submitBtn");
        
        if (!submitBtn) {
            console.error("❌ Submit button not found");
            return;
        }

        submitBtn.disabled = true;
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Submitting...";

        try {
            console.log("📤 Preparing webhook data for form type:", currentFormConfig.formType);

            // Get field values using standard classes
            const firstname = document.querySelector('.firstname')?.value.trim() || "";
            const lastname = document.querySelector('.lastname')?.value.trim() || "";
            const email = document.querySelector('.email')?.value.trim() || "";
            const phone = document.querySelector('.phone')?.value.trim() || "";
            const message = document.querySelector('.message')?.value.trim() || "";

            // Get lead source from hidden field or config
            const leadSourceEl = document.getElementById("leadSource");
            const leadSource = leadSourceEl?.value || currentFormConfig.leadSource;

            console.log("📊 Collected data:", {
                firstname,
                lastname,
                email,
                phone,
                message: message.substring(0, 50) + (message.length > 50 ? "..." : ""),
                leadSource,
                formType: currentFormConfig.formType
            });

            // Final validation before sending
            if (!email || !email.includes('@')) {
                console.error("❌ CRITICAL: Email is invalid or missing:", email);
                alert("Error: Invalid email address. Please check and try again.");
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                return;
            }

            // Validate all required fields are present
            const missingFields = [];
            if (!firstname) missingFields.push('firstname');
            if (!lastname) missingFields.push('lastname');
            if (!email) missingFields.push('email');
            if (!phone) missingFields.push('phone');

            if (missingFields.length > 0) {
                console.error("❌ Missing required fields:", missingFields);
                alert(`Error: Missing required fields: ${missingFields.join(', ')}`);
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
                return;
            }

            // Construct form data - EXACTLY the same for all forms
            const formData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                message: message,
                leadSource: leadSource,
                source: "TradingForexUSA.com"
            };

            console.log("📦 Webhook payload:", JSON.stringify(formData, null, 2));

            const webhookUrl = "https://hook.integrator.boost.space/7gopeqecppwrkmfebrizdevpq3op39da";

            console.log("🚀 Sending to webhook...");
            console.log("🔗 Webhook URL:", webhookUrl);
            
            // Send the request
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData),
                mode: "no-cors" // Note: Response not available in no-cors mode
            });

            console.log("✅ Webhook request sent successfully");
            console.log("⚠️ Note: Response unavailable due to no-cors mode");
            
            // Log success
            localStorage.setItem("webhookLog", JSON.stringify({
                timestamp: new Date().toISOString(),
                status: "success",
                formType: currentFormConfig.formType,
                leadSource: leadSource,
                data: formData
            }));

            console.log("💾 Success logged to localStorage");

        } catch (error) {
            console.error("❌ Webhook submission error:", error);
            console.error("❌ Error details:", {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            
            // Log error
            localStorage.setItem("webhookLog", JSON.stringify({
                timestamp: new Date().toISOString(),
                status: "error",
                error: error.message,
                formType: currentFormConfig.formType
            }));

            alert("There was an error submitting your form. Please try again.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Submitted";
            console.log("🏁 Webhook submission complete");
        }
    }

    // Main submit button click handler
    const submitBtn = document.getElementById("submitBtn");
    
    if (submitBtn) {
        submitBtn.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("🖱️ Submit button clicked");
            console.log("📍 Current form type:", currentFormConfig.formType);

            if (validateForm()) {
                const thankyouPageInput = document.getElementById("thankyouPage");
                const thankyouPage = thankyouPageInput?.value || currentFormConfig.thankyouPage;
                
                console.log("✅ Validation passed, proceeding with submission");
                console.log("🔗 Thank you page:", thankyouPage);

                // Open thank you page immediately
                window.open(thankyouPage, "_blank");

                // Call SalesNexus if available
                if (typeof callbackFuncForm2 === 'function') {
                    console.log("📞 Calling SalesNexus...");
                    try {
                        callbackFuncForm2(event);
                        console.log("✅ SalesNexus called successfully");
                    } catch (error) {
                        console.warn("⚠️ SalesNexus error (non-critical):", error);
                    }
                }

                // Send to webhook
                sendToWebhook().then(() => {
                    console.log("✅ Webhook complete, reloading page in 500ms");
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                }).catch(error => {
                    console.error("❌ Webhook failed:", error);
                    // Still reload even if webhook fails
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                });
            } else {
                console.log("❌ Validation failed, submission cancelled");
            }
        });
    } else {
        console.error("❌ Submit button #submitBtn not found!");
    }

    // Also handle form submit event as backup (for Enter key)
    const tastyfxForm = document.getElementById("tastyfxForm");
    if (tastyfxForm) {
        tastyfxForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("📝 Form submit event triggered");
            
            // Trigger the button click handler
            if (submitBtn) {
                submitBtn.click();
            }
        });
    }

    console.log("✅ Form broker ready");
    console.log("📌 Listening for forms with standard classes: .firstname, .lastname, .email, .phone, .message");
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {};
}