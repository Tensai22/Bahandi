import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './AllProducts.css'; 

const MOKKY_BASE_URL = "https://a8b7ddd6558fddf5.mokky.dev";

function ProductsPage() { 
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['burgers', 'drinks', 'combo']; 

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            setError(null);
            
            const promises = categories.map(async (categoryName) => {
                try {
                    const response = await axios.get(`${MOKKY_BASE_URL}/${categoryName}`);
                    
                    return {
                        category: categoryName,
                        data: response.data
                    };
                } catch (err) {
                    console.warn(`Коллекция ${categoryName} не найдена или пуста.`, err);
                    return { category: categoryName, data: [] }; 
                }
            });

            try {
                const results = await Promise.all(promises);
                
                const allProducts = results.flatMap(result => 
                    result.data.map(item => ({
                        ...item,
                        category: item.category || result.category 
                    }))
                );
                
                setProducts(allProducts);
            } catch (err) {
                console.error("Критическая ошибка загрузки продуктов:", err);
                setError('Не удалось загрузить продукты.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        if (!searchTerm) {
            return products;
        }

        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return products.filter(product => 
            product.name && product.name.toLowerCase().includes(lowerCaseSearch)
        );
    }, [products, searchTerm]);

    if (loading) return <div className="loading-message">Загрузка всех видов еды...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="product-list-page-container product-page">
            <h1 className="page-title">Все продукты ({filteredProducts.length})</h1>
            
            <input
                type="text"
                placeholder="Поиск по названию..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="product-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id + product.category} className="product-card">
                            
                            {product.image ? (
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="product-image"
                                />
                            ) : (
                                <div className="product-img-placeholder">
                                    [Нет изображения для {product.name}]
                                </div>
                            )}

                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">
                                Цена: {product.price ? `${product.price} ₽` : 'Цена не указана'}
                            </p>
                            <span className="product-category">Категория: {product.category}</span>
                            <button className="add-to-cart-btn">В корзину</button>
                        </div>
                    ))
                ) : (
                    <p className="no-results-message">Ничего не найдено.</p>
                )}
            </div>
        </div>
    );
}

export default ProductsPage;