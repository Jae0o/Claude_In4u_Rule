// Enhanced Filter System for Dashboard
class EnhancedFilterSystem {
    constructor() {
        this.selectedFilters = {
            '달력_연도_월': [],
            '유통경로': '',
            '제품군': []
        };

        this.init();
    }

    init() {
        this.setupDropdownHandlers();
        this.setupToggleButtons();
        this.setupSearchFunctionality();
        this.setupTagRemoval();
        this.setupClearAll();
    }

    // Setup dropdown handlers for month and product filters
    setupDropdownHandlers() {
        // Month dropdown
        const monthDropdown = document.getElementById('month-filter-dropdown');
        if (monthDropdown) {
            const trigger = monthDropdown.querySelector('.dashboard__filter__dropdown_trigger');
            const menu = monthDropdown.querySelector('.dashboard__filter__dropdown_menu');
            const options = monthDropdown.querySelectorAll('.dashboard__filter__option');

            // Toggle dropdown
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('show');
                trigger.classList.toggle('active');
            });

            // Handle option selection
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = option.dataset.value;

                    option.classList.toggle('selected');

                    if (option.classList.contains('selected')) {
                        if (!this.selectedFilters['달력_연도_월'].includes(value)) {
                            this.selectedFilters['달력_연도_월'].push(value);
                        }
                    } else {
                        const index = this.selectedFilters['달력_연도_월'].indexOf(value);
                        if (index > -1) {
                            this.selectedFilters['달력_연도_월'].splice(index, 1);
                        }
                    }

                    this.updateDropdownTriggerText(monthDropdown, '달력_연도_월');
                    this.updateSelectedTags();
                });
            });
        }

        // Product dropdown
        const productDropdown = document.getElementById('product-filter-dropdown');
        if (productDropdown) {
            const trigger = productDropdown.querySelector('.dashboard__filter__dropdown_trigger');
            const menu = productDropdown.querySelector('.dashboard__filter__dropdown_menu');
            const options = productDropdown.querySelectorAll('.dashboard__filter__option');

            // Toggle dropdown
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.toggle('show');
                trigger.classList.toggle('active');
            });

            // Handle option selection
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const value = option.dataset.value;

                    option.classList.toggle('selected');

                    if (option.classList.contains('selected')) {
                        if (!this.selectedFilters['제품군'].includes(value)) {
                            this.selectedFilters['제품군'].push(value);
                        }
                    } else {
                        const index = this.selectedFilters['제품군'].indexOf(value);
                        if (index > -1) {
                            this.selectedFilters['제품군'].splice(index, 1);
                        }
                    }

                    this.updateDropdownTriggerText(productDropdown, '제품군');
                    this.updateSelectedTags();
                });
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.dashboard__filter__dropdown_menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.dashboard__filter__dropdown_trigger.active').forEach(trigger => {
                trigger.classList.remove('active');
            });
        });
    }

    // Setup toggle buttons for distribution channel
    setupToggleButtons() {
        const toggleGroup = document.getElementById('channel-filter');
        if (toggleGroup) {
            const buttons = toggleGroup.querySelectorAll('.dashboard__filter__toggle_btn');

            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    this.selectedFilters['유통경로'] = button.dataset.value;
                    this.updateSelectedTags();
                });
            });
        }
    }

    // Setup search functionality for product filter
    setupSearchFunctionality() {
        const productDropdown = document.getElementById('product-filter-dropdown');
        if (productDropdown) {
            const searchInput = productDropdown.querySelector('.dashboard__filter__search_input');
            const options = productDropdown.querySelectorAll('.dashboard__filter__option');

            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();

                    options.forEach(option => {
                        const text = option.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            option.style.display = 'flex';
                        } else {
                            option.style.display = 'none';
                        }
                    });
                });
            }
        }
    }

    // Update dropdown trigger text based on selection
    updateDropdownTriggerText(dropdown, filterKey) {
        const trigger = dropdown.querySelector('.dashboard__filter__dropdown_trigger span');
        const count = this.selectedFilters[filterKey].length;

        if (count === 0) {
            trigger.textContent = '선택하세요';
        } else if (count === 1) {
            trigger.textContent = this.selectedFilters[filterKey][0];
        } else {
            trigger.textContent = `${count}개 선택됨`;
        }

        // Add count badge
        let countBadge = dropdown.querySelector('.dashboard__filter__count');
        if (count > 0) {
            if (!countBadge) {
                countBadge = document.createElement('span');
                countBadge.className = 'dashboard__filter__count';
                dropdown.querySelector('.dashboard__filter__dropdown_trigger').appendChild(countBadge);
            }
            countBadge.textContent = count;
        } else if (countBadge) {
            countBadge.remove();
        }
    }

    // Update selected tags display
    updateSelectedTags() {
        const container = document.getElementById('selected-filters');
        if (!container) return;

        container.innerHTML = '';

        let hasFilters = false;

        // Add month tags
        this.selectedFilters['달력_연도_월'].forEach(value => {
            hasFilters = true;
            const tag = this.createTag(value, '달력_연도_월');
            container.appendChild(tag);
        });

        // Add channel tag
        if (this.selectedFilters['유통경로'] && this.selectedFilters['유통경로'] !== '') {
            hasFilters = true;
            const tag = this.createTag(this.selectedFilters['유통경로'], '유통경로');
            container.appendChild(tag);
        }

        // Add product tags
        this.selectedFilters['제품군'].forEach(value => {
            hasFilters = true;
            const tag = this.createTag(value, '제품군');
            container.appendChild(tag);
        });

        // Show empty message or clear all button
        if (!hasFilters) {
            container.innerHTML = '<span class="dashboard__filter__selected_tags_empty">선택된 필터가 없습니다</span>';
        } else {
            const clearAllBtn = document.createElement('span');
            clearAllBtn.className = 'dashboard__filter__clear_all';
            clearAllBtn.textContent = '모두 지우기';
            clearAllBtn.addEventListener('click', () => this.clearAllFilters());
            container.appendChild(clearAllBtn);
        }
    }

    // Create a filter tag element
    createTag(value, filterKey) {
        const tag = document.createElement('span');
        tag.className = 'dashboard__filter__tag';
        tag.innerHTML = `
            ${value}
            <span class="dashboard__filter__tag_remove" data-filter="${filterKey}" data-value="${value}">×</span>
        `;
        return tag;
    }

    // Setup tag removal handlers
    setupTagRemoval() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('dashboard__filter__tag_remove')) {
                const filterKey = e.target.dataset.filter;
                const value = e.target.dataset.value;

                if (filterKey === '달력_연도_월' || filterKey === '제품군') {
                    const index = this.selectedFilters[filterKey].indexOf(value);
                    if (index > -1) {
                        this.selectedFilters[filterKey].splice(index, 1);
                    }

                    // Update UI
                    const selector = filterKey === '달력_연도_월' ?
                        '#month-filter-dropdown' : '#product-filter-dropdown';
                    const dropdown = document.querySelector(selector);
                    if (dropdown) {
                        const option = dropdown.querySelector(`[data-value="${value}"]`);
                        if (option) {
                            option.classList.remove('selected');
                        }
                        this.updateDropdownTriggerText(dropdown, filterKey);
                    }
                } else if (filterKey === '유통경로') {
                    this.selectedFilters['유통경로'] = '';

                    // Reset toggle buttons
                    const toggleGroup = document.getElementById('channel-filter');
                    if (toggleGroup) {
                        toggleGroup.querySelectorAll('.dashboard__filter__toggle_btn').forEach(btn => {
                            btn.classList.remove('active');
                            if (btn.dataset.value === '') {
                                btn.classList.add('active');
                            }
                        });
                    }
                }

                this.updateSelectedTags();
            }
        });
    }

    // Setup clear all functionality
    setupClearAll() {
        // This is handled in updateSelectedTags
    }

    // Clear all filters
    clearAllFilters() {
        this.selectedFilters = {
            '달력_연도_월': [],
            '유통경로': '',
            '제품군': []
        };

        // Reset all UI elements
        document.querySelectorAll('.dashboard__filter__option.selected').forEach(option => {
            option.classList.remove('selected');
        });

        // Reset dropdown triggers
        document.querySelectorAll('.dashboard__filter__dropdown').forEach(dropdown => {
            const trigger = dropdown.querySelector('.dashboard__filter__dropdown_trigger span');
            if (trigger) {
                trigger.textContent = '선택하세요';
            }
            const countBadge = dropdown.querySelector('.dashboard__filter__count');
            if (countBadge) {
                countBadge.remove();
            }
        });

        // Reset toggle buttons
        const toggleGroup = document.getElementById('channel-filter');
        if (toggleGroup) {
            toggleGroup.querySelectorAll('.dashboard__filter__toggle_btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.value === '') {
                    btn.classList.add('active');
                }
            });
        }

        this.updateSelectedTags();
    }

    // Get current filter values for dashboard
    getFilterValues() {
        return {
            months: this.selectedFilters['달력_연도_월'],
            channel: this.selectedFilters['유통경로'],
            products: this.selectedFilters['제품군']
        };
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedFilters = new EnhancedFilterSystem();
});

// Global functions for button handlers
function applyFilters() {
    const filters = window.enhancedFilters.getFilterValues();
    console.log('Applying filters:', filters);

    // Call the existing dashboard update functions
    if (window.dashboardController) {
        // Update the dashboard with selected filters
        window.dashboardController.updateFilters(filters);
    }
}

function resetFilters() {
    window.enhancedFilters.clearAllFilters();

    // Reset dashboard filters
    if (window.dashboardController) {
        window.dashboardController.resetFilters();
    }
}