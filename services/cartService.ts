import api from './axios';

export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    category: string;
}

export const fetchCarts = async () => {
 
        const response = await api.get('/products');
        console.log(response.data);

        const results = response.data.products;

        return results;
};