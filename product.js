const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function renderProductCards(categoryProducts) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';
    console.log(categoryProducts)

    categoryProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.title;

            const productInfo = document.createElement('div');
            productInfo.classList.add('product-info');

            const title = document.createElement('h3');
            title.textContent = product.title;

            const vendor = document.createElement('p');
            vendor.textContent = `Vendor: ${product.vendor}`;

            const price = document.createElement('p');
            price.textContent = `Price: $${product.price}`;

            const comparePrice = document.createElement('p');
            comparePrice.textContent = `Compare at: $${product.compare_at_price}`;

            const discount = document.createElement('p');
            const discountPercentage = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
            discount.textContent = `Discount: ${discountPercentage.toFixed(2)}% off`;

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.classList.add('add-to-cart');

            // Append elements 
            productInfo.appendChild(title);
            productInfo.appendChild(vendor);
            productInfo.appendChild(price);
            productInfo.appendChild(comparePrice);
            productInfo.appendChild(discount);
            productCard.appendChild(productImage);
            productCard.appendChild(productInfo);
            productCard.appendChild(addToCartButton);

            productContainer.appendChild(productCard);
        });
    
}




async function changeCategory(category) {
    console.log("stage -1")
    const categories = await fetchData();
    const selectedCategory = categories.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());


    if (selectedCategory) {
        renderProductCards(selectedCategory.category_products);
        //console.log(selectedCategory.category_products)

    } else {
        console.error('Category not found:', category);
    }
}

// Initial load with a default category (e.g., 'Men')
changeCategory('Men');
