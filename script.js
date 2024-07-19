
function createElementWithAttributes(tag, attributes, parent) {
    const element = document.createElement(tag);
    for (let key in attributes) {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'innerText') {
            element.innerText = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    if (parent) {
        parent.appendChild(element);
    }
    return element;
}


async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


async function fetchPricingPlans() {
    try {
        const response = await fetch('http://localhost:3000/pricingPlans');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching pricing plans:', error);
    }
}


function createHeader() {
    const header = createElementWithAttributes('header', { class: 'bg-white shadow-md' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto flex items-center justify-between px-4 py-2' }, header);


    const logo = createElementWithAttributes('a', { href: '#', class: 'logo text-xl font-bold flex items-center' }, container);
    createElementWithAttributes('i', { class: 'fas fa-shopping-cart mr-2' }, logo);
    createElementWithAttributes('span', { innerText: 'Gatunganga' }, logo);

    const searchForm = createElementWithAttributes('form', { action: '#', class: 'search-form flex items-center' }, container);
    const searchInput = createElementWithAttributes('input', { type: 'text', placeholder: 'Search here...', name: 'search', id: 'searchbox', class: 'border-2 border-gray-300 rounded-l px-4 py-2 focus:outline-none' }, searchForm);
    const searchBtn = createElementWithAttributes('button', { type: 'submit', class: 'border-2 border-gray-300 bg-gray-200 rounded-r px-4 py-2 hover:bg-gray-300' }, searchForm);
    createElementWithAttributes('i', { class: 'fas fa-search' }, searchBtn);


    const icons = createElementWithAttributes('div', { class: 'icons flex items-center space-x-4' }, container);
    createElementWithAttributes('div', { id: 'menu-btn', class: 'fas fa-bars cursor-pointer' }, icons);
    createElementWithAttributes('div', { id: 'search-btn', class: 'fas fa-search cursor-pointer' }, icons);
    createElementWithAttributes('div', { id: 'user-btn', class: 'fas fa-user cursor-pointer' }, icons);
    createElementWithAttributes('div', { id: 'share-btn', class: 'fas fa-share cursor-pointer' }, icons);


    const navbar = createElementWithAttributes('nav', { class: 'navbar hidden lg:flex items-center space-x-4' }, container);
    createElementWithAttributes('a', { href: '#home', innerText: 'Home', class: 'hover:text-blue-500' }, navbar);
    createElementWithAttributes('a', { href: '#products', innerText: 'Products', class: 'hover:text-blue-500' }, navbar);
    createElementWithAttributes('a', { href: '#blogs', innerText: 'Blogs', class: 'hover:text-blue-500' }, navbar);
    createElementWithAttributes('a', { href: '#contact', innerText: 'Contact', class: 'hover:text-blue-500' }, navbar);

    document.body.appendChild(header);
}


function createHomeSection() {
    const homeSection = createElementWithAttributes('section', { class: 'home py-12 bg-white' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto flex items-center justify-between px-4' }, homeSection);
    const leftColumn = createElementWithAttributes('div', { class: 'w-1/2' }, container);
    const rightColumn = createElementWithAttributes('div', { class: 'w-1/2 px-8' }, container);

 
    createElementWithAttributes('img', { src: 'image.jpg', alt: 'Home Image', class: 'w-full rounded-lg shadow-lg' }, leftColumn);

 
    createElementWithAttributes('h3', { class: 'text-3xl font-bold mb-4', innerText: 'Gatunganga Auto Spares Order and Delivery Site' }, rightColumn);
    createElementWithAttributes('p', { class: 'text-lg', innerText: 'We make sure skills meet quality.' }, rightColumn);
    createElementWithAttributes('a', { href: '#products', class: 'btn bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 inline-block', innerText: 'Shop Now' }, rightColumn);

    document.body.appendChild(homeSection);
}


function createFormSection() {
    const formSection = createElementWithAttributes('section', { class: 'form-container bg-gray-200 py-12' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto px-4' }, formSection);
    const form = createElementWithAttributes('form', { action: '#' }, container);

   
    const inputBoxes = ['where', 'when', 'time'];
    inputBoxes.forEach(label => {
        const inputBox = createElementWithAttributes('div', { class: 'inputBox flex items-center space-x-2 mb-4' }, form);
        createElementWithAttributes('span', { innerText: label }, inputBox);
        createElementWithAttributes('input', { type: label === 'when' ? 'date' : (label === 'time' ? 'time' : 'text'), placeholder: `Enter ${label}`, class: 'border-2 border-gray-300 rounded px-4 py-2 focus:outline-none' }, inputBox);
    });

       createElementWithAttributes('input', { type: 'submit', value: 'Order Now', class: 'btn bg-blue-500 text-white py-2 px-6 rounded-lg' }, form);

    document.body.appendChild(formSection);
}


async function renderProducts() {
    const products = await fetchProducts();
    if (!products) return;

    const productsSection = createElementWithAttributes('section', { class: 'packages py-12 bg-white', id: 'products' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto px-4' }, productsSection);

    createElementWithAttributes('h1', { class: 'heading text-3xl font-bold mb-8', innerText: 'Our Products' }, container);

    const boxContainer = createElementWithAttributes('div', { class: 'box-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8' }, container);

    products.forEach(product => {
        const box = createElementWithAttributes('div', { class: 'box bg-gray-100 rounded-lg overflow-hidden shadow-lg' }, boxContainer);

        // Image
        createElementWithAttributes('img', { src: product.image, alt: product.name, class: 'w-full' }, box);

        // Content
        const content = createElementWithAttributes('div', { class: 'content p-4' }, box);
        createElementWithAttributes('h3', { class: 'text-xl font-bold mb-2', innerText: product.name }, content);
        createElementWithAttributes('p', { innerText: `Ksh ${product.price}` }, content);
        createElementWithAttributes('a', { href: '#', class: 'btn bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 inline-block', innerText: 'Order Now' }, content);
    });

    document.body.appendChild(productsSection);
}


async function renderPricingPlans() {
    const pricingPlans = await fetchPricingPlans();
    if (!pricingPlans) return;

    const pricingSection = createElementWithAttributes('section', { class: 'pricing py-12 bg-gray-200', id: 'pricing' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto px-4' }, pricingSection);

    createElementWithAttributes('h1', { class: 'heading text-3xl font-bold mb-8', innerText: 'Our Pricing' }, container);

    const boxContainer = createElementWithAttributes('div', { class: 'box-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' }, container);

    pricingPlans.forEach(plan => {
        const box = createElementWithAttributes('div', { class: 'box bg-white rounded-lg overflow-hidden shadow-lg p-6' }, boxContainer);
        createElementWithAttributes('h3', { class: 'text-xl font-bold mb-2', innerText: plan.name }, box);

        const price = createElementWithAttributes('div', { class: 'price flex items-center mb-4' }, box);
        createElementWithAttributes('span', { innerText: 'Ksh ' }, price);
        createElementWithAttributes('span', { class: 'amount', innerText: plan.price }, price);
        createElementWithAttributes('span', { innerText: ' /mo' }, price);

        const featuresList = createElementWithAttributes('ul', {}, box);
        plan.features.forEach(feature => {
            createElementWithAttributes('li', { innerText: feature }, featuresList);
        });

        createElementWithAttributes('a', { href: '#', class: 'btn bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 inline-block', innerText: 'Choose Plan' }, box);
    });

    document.body.appendChild(pricingSection);
}


function createContactSection() {
    const contactSection = createElementWithAttributes('section', { class: 'contact py-12 bg-white', id: 'contact' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto px-4' }, contactSection);

    createElementWithAttributes('h1', { class: 'heading text-3xl font-bold mb-8', innerText: 'Contact Us' }, container);

    const form = createElementWithAttributes('form', { action: '#' }, container);
    const inputBoxes = ['Name', 'Email', 'Number', 'Subject'];
    inputBoxes.forEach(label => {
        const inputBox = createElementWithAttributes('div', { class: 'inputBox flex items-center space-x-2 mb-4' }, form);
        createElementWithAttributes('input', { type: label === 'Email' ? 'email' : (label === 'Number' ? 'tel' : 'text'), placeholder: label, class: 'border-2 border-gray-300 rounded px-4 py-2 focus:outline-none w-1/2' }, inputBox);
    });

    createElementWithAttributes('textarea', { class: 'border-2 border-gray-300 rounded px-4 py-2 focus:outline-none w-full', placeholder: 'Your message', rows: '5' }, form);
    createElementWithAttributes('input', { type: 'submit', value: 'Send Message', class: 'btn bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 inline-block' }, form);

    document.body.appendChild(contactSection);
}


function createBlogsSection() {
    const blogsSection = createElementWithAttributes('section', { class: 'blogs py-12 bg-gray-200', id: 'blogs' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto px-4' }, blogsSection);

    createElementWithAttributes('h1', { class: 'heading text-3xl font-bold mb-8', innerText: 'Our Blogs' }, container);

    const boxContainer = createElementWithAttributes('div', { class: 'box-container grid grid-cols-1 sm:grid-cols-2 gap-8' }, container);

     const blog1 = createElementWithAttributes('div', { class: 'box bg-white rounded-lg overflow-hidden shadow-lg' }, boxContainer);
    createElementWithAttributes('img', { src: 'blog_image_1.jpg', alt: 'Blog Image', class: 'w-full' }, blog1);
    const content1 = createElementWithAttributes('div', { class: 'content p-4' }, blog1);
    createElementWithAttributes('h3', { class: 'text-xl font-bold mb-2', innerText: 'German Brass Rod' }, content1);
    createElementWithAttributes('p', { innerText: 'Why choose brass blazing rods?...' }, content1);
    createElementWithAttributes('a', { href: '#', class: 'btn bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 inline-block', innerText: 'Read More' }, content1);
    const icons1 = createElementWithAttributes('div', { class: 'icons flex items-center space-x-2 mt-4 text-sm text-gray-600' }, content1);
    createElementWithAttributes('a', { href: '#', class: 'flex items-center' }, icons1);
    createElementWithAttributes('i', { class: 'fas fa-calendar mr-2' }, icons1);
    createElementWithAttributes('span', { innerText: '1st March, 2021' }, icons1);
    createElementWithAttributes('a', { href: '#', class: 'flex items-center' }, icons1);
    createElementWithAttributes('i', { class: 'fas fa-user mr-2' }, icons1);
    createElementWithAttributes('span', { innerText: 'by admin' }, icons1);

      const blog2 = createElementWithAttributes('div', { class: 'box bg-white rounded-lg overflow-hidden shadow-lg' }, boxContainer);
    createElementWithAttributes('img', { src: 'blog_image_2.jpg', alt: 'Blog Image', class: 'w-full' }, blog2);
    const content2 = createElementWithAttributes('div', { class: 'content p-4' }, blog2);
    createElementWithAttributes('h3', { class: 'text-xl font-bold mb-2', innerText: 'German Brass Powder' }, content2);
    createElementWithAttributes('p', { innerText: 'Why choose brass brazing powder?...' }, content2);
    createElementWithAttributes('a', { href: '#', class: 'btn bg-blue-500 text-white py-2 px-6 rounded-lg mt-4 inline-block', innerText: 'Read More' }, content2);
    const icons2 = createElementWithAttributes('div', { class: 'icons flex items-center space-x-2 mt-4 text-sm text-gray-600' }, content2);
    createElementWithAttributes('a', { href: '#', class: 'flex items-center' }, icons2);
    createElementWithAttributes('i', { class: 'fas fa-calendar mr-2' }, icons2);
    createElementWithAttributes('span', { innerText: '1st March, 2021' }, icons2);
    createElementWithAttributes('a', { href: '#', class: 'flex items-center' }, icons2);
    createElementWithAttributes('i', { class: 'fas fa-user mr-2' }, icons2);
    createElementWithAttributes('span', { innerText: 'by admin' }, icons2);

    document.body.appendChild(blogsSection);
}


function createFooterSection() {
    const footerSection = createElementWithAttributes('section', { class: 'footer py-12 bg-gray-800 text-white' });
    const container = createElementWithAttributes('div', { class: 'container mx-auto px-4' }, footerSection);
    const boxContainer = createElementWithAttributes('div', { class: 'box-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8' }, container);

    
    const branchesBox = createElementWithAttributes('div', { class: 'box' }, boxContainer);
    createElementWithAttributes('h3', { innerText: 'Our Branches', class: 'text-xl font-bold mb-4' }, branchesBox);
    createElementWithAttributes('a', { href: '#', class: 'flex items-center text-gray-300 hover:text-white' }, branchesBox);
    createElementWithAttributes('i', { class: 'fas fa-map-marker-alt mr-2' }, branchesBox);
    createElementWithAttributes('span', { innerText: 'Kenya' }, branchesBox);
    const quickLinksBox = createElementWithAttributes('div', { class: 'box' }, boxContainer);
    createElementWithAttributes('h3', { innerText: 'Quick Links', class: 'text-xl font-bold mb-4' }, quickLinksBox);
    const quickLinksList = createElementWithAttributes('ul', {}, quickLinksBox);
    ['Home', 'Products', 'Blogs', 'Contact'].forEach(link => {
        createElementWithAttributes('li', {}, quickLinksList);
        createElementWithAttributes('a', { href: `#${link.toLowerCase()}`, innerText: link, class: 'text-gray-300 hover:text-white' }, quickLinksList.lastChild);
    });
    const socialMediaBox = createElementWithAttributes('div', { class: 'box' }, boxContainer);
    createElementWithAttributes('h3', { innerText: 'Social Media', class: 'text-xl font-bold mb-4' }, socialMediaBox);
    const socialIcons = createElementWithAttributes('div', { class: 'social-icons flex space-x-4' }, socialMediaBox);
    ['facebook', 'twitter', 'instagram'].forEach(social => {
        const icon = createElementWithAttributes('a', { href: '#', class: 'text-gray-300 hover:text-white' }, socialIcons);
        createElementWithAttributes('i', { class: `fab fa-${social}` }, icon);
    });
    const contactBox = createElementWithAttributes('div', { class: 'box' }, boxContainer);
    createElementWithAttributes('h3', { innerText: 'Contact Us', class: 'text-xl font-bold mb-4' }, contactBox);
    const contactList = createElementWithAttributes('ul', {}, contactBox);
    ['Phone: +254 701 234 567', 'Email: info@gatunganga.com', 'Nairobi, Kenya'].forEach(contact => {
        createElementWithAttributes('li', { class: 'text-gray-300 mb-2' }, contactList);
        createElementWithAttributes('span', { innerText: contact }, contactList.lastChild);
    });

    document.body.appendChild(footerSection);
}
async function loadPage() {
    createHeader();
    createHomeSection();
    createFormSection();
    await renderProducts();
    await renderPricingPlans();
    createContactSection();
    createBlogsSection();
    createFooterSection();
}

loadPage();