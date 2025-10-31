import emailjs from '@emailjs/browser';

// Email configuration from environment variables
const config = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  recipientEmail: 'mykechen@usc.edu',
};

/**
 * Sends a contact form email using EmailJS
 * @param {Object} formData - The form data to send
 * @param {string} formData.firstName - Sender's first name
 * @param {string} formData.lastName - Sender's last name
 * @param {string} formData.phone - Sender's phone number
 * @param {string} formData.email - Sender's email address
 * @param {string} formData.notes - Message content
 * @returns {Promise} - Resolves on success, rejects on error
 */
export const sendContactEmail = async (formData) => {
  // Validate configuration
  if (!config.serviceId || !config.templateId || !config.publicKey) {
    throw new Error('EmailJS configuration is missing. Please check your environment variables.');
  }

  // Prepare template parameters
  const templateParams = {
    from_name: formData.firstName,
    last_name: formData.lastName,
    phone: formData.phone,
    email: formData.email,
    message: formData.notes,
    to_email: config.recipientEmail,
  };

  try {
    const response = await emailjs.send(
      config.serviceId,
      config.templateId,
      templateParams,
      config.publicKey
    );

    console.log('Email sent successfully:', response.status, response.text);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};

/**
 * Validates form data before sending
 * @param {Object} formData - The form data to validate
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
export const validateFormData = (formData) => {
  const errors = [];

  if (!formData.firstName?.trim()) {
    errors.push('First name is required');
  }

  if (!formData.lastName?.trim()) {
    errors.push('Last name is required');
  }

  if (!formData.email?.trim()) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Invalid email format');
  }

  if (!formData.notes?.trim()) {
    errors.push('Message is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
