import request from '../utils/request.js';

export function submitList(values) {
  return request('/api/myingredients/submit', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function initialIngredients() {
  return request('/api/myingredients/initial');
}
