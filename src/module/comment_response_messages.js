export const commentAddSuccess = () => {
  document.querySelectorAll('.input').forEach((input) => {
    input.value = '';
  });
  const response = document.querySelector('.response-message');
  response.classList.remove('hide', 'red');
  response.classList.add('green');
  response.innerHTML = 'Comment added successfully!!!';
  setTimeout(() => {
    response.classList.add('hide');
    response.classList.remove('green', 'red');
    response.innerHTML = '';
  }, 5000);
};

export const commentAddError = () => {
  const response = document.querySelector('.response-message');
  response.classList.remove('hide', 'green');
  response.classList.add('red');
  response.innerHTML = 'Enter both comment and name.';
  setTimeout(() => {
    response.classList.add('hide');
    response.classList.remove('green', 'red');
    response.innerHTML = '';
  }, 10000);
};