import request from '../utils/request.js';

export function getAllDishes() {
    return request('/api/alldishes');
}