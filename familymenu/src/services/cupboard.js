import request from '../utils/request.js';

export function fetch() {
  return request('/api/mykitchen/cupboard');
}

export function patch(id, values) {
  return request(`/api/mykitchen/cupboard/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function add(values) {
  return request('/api/mykitchen/cupboard', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
