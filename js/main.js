// Tool Categories Data
const categories = [
    {
        id: 'image-tools',
        name: 'Image Tools',
        icon: 'fas fa-image',
        description: 'Convert, resize, and optimize images',
        tools: [
            { name: 'Image to PNG', path: '/tools/image-tools/image-to-png.html' },
            { name: 'Image to JPG', path: '/tools/image-tools/image-to-jpg.html' },
            { name: 'Image Resizer', path: '/tools/image-tools/image-resizer.html' }
        ]
    },
    {
        id: 'seo-tools',
        name: 'SEO Tools',
        icon: 'fas fa-search',
        description: 'Optimize your website for search engines',
        tools: [
            { name: 'Meta Tag Generator', path: '/tools/seo-tools/meta-tag-generator.html' },
            { name: 'Keyword Density', path: '/tools/seo-tools/keyword-density.html' },
            { name: 'Sitemap Generator', path: '/tools/seo-tools/sitemap-generator.html' }
        ]
    },
    {
        id: 'text-tools',
        name: 'Text Tools',
        icon: 'fas fa-font',
        description: 'Process and analyze text content',
        tools: [
            { name: 'Word Counter', path: '/tools/text-tools/word-counter.html' },
            { name: 'Case Converter', path: '/tools/text-tools/case-converter.html' },
            { name: 'Plagiarism Checker', path: '/tools/text-tools/plagiarism-checker.html' }
        ]
    }
];

// Featured Tools Data
const featuredTools = [
    {
        name: 'Image to PNG Converter',
        description: 'Convert any image format to PNG with high quality',
        path: '/tools/image-tools/image-to-png.html',
        icon: 'fas fa-file-image'
    },
    {
        name: 'Word Counter',
        description: 'Count words, characters, and sentences in your text',
        path: '/tools/text-tools/word-counter.html',
        icon: 'fas fa-calculator'
    },
    {
        name: 'Meta Tag Generator',
        description: 'Generate SEO-friendly meta tags for your website',
        path: '/tools/seo-tools/meta-tag-generator.html',
        icon: 'fas fa-tags'
    }
];

// Load Header and Footer
async function loadComponents() {
    try {
        // Load Header
        const headerResponse = await fetch('/components/header.html');
        const headerHtml = await headerResponse.text();
        document.getElementById('header-placeholder').innerHTML = headerHtml;

        // Load Footer
        const footerResponse = await fetch('/components/footer.html');
        const footerHtml = await footerResponse.text();
        document.getElementById('footer-placeholder').innerHTML = footerHtml;
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Render Categories
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;

    categoriesGrid.innerHTML = categories.map(category => `
        <div class="col-md-4">
            <div class="category-card">
                <i class="${category.icon}"></i>
                <h3>${category.name}</h3>
                <p>${category.description}</p>
                <a href="/tools/${category.id}/" class="btn btn-primary">View Tools</a>
            </div>
        </div>
    `).join('');
}

// Render Featured Tools
function renderFeaturedTools() {
    const featuredToolsContainer = document.getElementById('featuredTools');
    if (!featuredToolsContainer) return;

    featuredToolsContainer.innerHTML = featuredTools.map(tool => `
        <div class="col-md-4">
            <div class="tool-card">
                <div class="card-body">
                    <i class="${tool.icon} fa-2x mb-3 text-primary"></i>
                    <h5 class="card-title">${tool.name}</h5>
                    <p class="card-text">${tool.description}</p>
                    <a href="${tool.path}" class="btn btn-outline-primary">Use Tool</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    const headerSearchForm = document.getElementById('headerSearchForm');

    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    if (headerSearchForm) {
        headerSearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSearch(e.target.querySelector('input').value);
        });
    }
}

function handleSearch(query) {
    const allTools = [...categories.flatMap(c => c.tools), ...featuredTools];
    const searchResults = allTools.filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    );

    // Update UI with search results
    updateSearchResults(searchResults);
}

function updateSearchResults(results) {
    const featuredToolsContainer = document.getElementById('featuredTools');
    if (!featuredToolsContainer) return;

    if (results.length === 0) {
        featuredToolsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">No tools found matching your search.</p>
            </div>
        `;
        return;
    }

    featuredToolsContainer.innerHTML = results.map(tool => `
        <div class="col-md-4">
            <div class="tool-card">
                <div class="card-body">
                    <h5 class="card-title">${tool.name}</h5>
                    <p class="card-text">${tool.description}</p>
                    <a href="${tool.path}" class="btn btn-outline-primary">Use Tool</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize Ad Space
function initializeAdSpace() {
    const adContainer = document.querySelector('.ad-container');
    if (adContainer) {
        // Add your ad code here
        adContainer.innerHTML = `
            <div class="ad-placeholder">
                <p class="text-muted">Advertisement Space</p>
            </div>
        `;
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    renderCategories();
    renderFeaturedTools();
    initializeSearch();
    initializeAdSpace();
}); 