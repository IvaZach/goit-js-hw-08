import throttle from 'lodash.throttle';

const KEY_FEEDBACK = 'feedback-form-state';

const feedbackForm = document.querySelector('.feedback-form');
const emailField = document.querySelector('input');
const textareaField = document.querySelector('textarea');

feedbackForm.addEventListener('submit', submittingForm);
feedbackForm.addEventListener('input', throttle(saveValueMassage, 500));

populateFormData();

// Save message in localStorage
function saveValueMassage(evn) {
  const formData = {
    email: emailField.value,
    message: textareaField.value,
  };
  localStorage.setItem(KEY_FEEDBACK, JSON.stringify(formData));
}

// Submitting a form and clearing fields
function submittingForm(evn) {
  evn.preventDefault();

  const sentData = JSON.parse(localStorage.getItem(KEY_FEEDBACK));

  console.log(`Email: ${sentData.email}`);
  console.log(`Message: ${sentData.message}`);

  evn.currentTarget.reset();
  localStorage.removeItem(KEY_FEEDBACK);
}

// Restoring Fields
function populateFormData() {
  let savedFormData = JSON.parse(localStorage.getItem(KEY_FEEDBACK)) || '';

  if (savedFormData !== '') {
    (emailField.value = savedFormData.email),
    (textareaField.value = savedFormData.message);
  }
}
