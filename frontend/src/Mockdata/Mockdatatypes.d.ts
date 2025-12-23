
export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    creator: string;
    category: string;
    isPromotion: boolean;
    discount: number
}

export interface Promotion {
    id: number;
    title: string; 
    description: string;
    discount: number;
    itemCount: number;
    image: string;
    endsAt: string;
    category: string;
}

export interface categoryPromotion {
    name: string;
    count: number;
    discount: string;
    icon: string;
}

export interface category {
    id: string;
    name: string;
    description: string;
    icon: string;
    productCount: number;
    image: string;
}