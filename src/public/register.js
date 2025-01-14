const buttonRegister = document.querySelector('#sendRegister');
const nombreInput = document.querySelector('#first_name');
const apellidoInput = document.querySelector('#last_name');
const edadInput = document.querySelector('#age');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const newUser = {
  first_name: '',
  last_name: '',
  age: '',
  email: '',
  password: '',
};

nombreInput.addEventListener('input', handleChange);
apellidoInput.addEventListener('input', handleChange);
edadInput.addEventListener('input', handleChange);
emailInput.addEventListener('input', handleChange);
passwordInput.addEventListener('input', handleChange);

buttonRegister.addEventListener('click', async () => {
  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201 || response.status < 300) window.location.href = '/users/login';
  } catch (e) {
    console.log('error', e);
  }
});
