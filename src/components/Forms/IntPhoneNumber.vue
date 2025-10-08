<template>
    <div class="phone-input-wrapper">
        <div class="phone-input-container">
            <div class="country-code-selector">
                <button type="button" @click="displayCodes" class="code-select-button">
                    <span class="flag">{{ phone_flag }}</span>
                    <span class="code">{{ phone_ext }}</span>
                    <svg class="chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>

                <div v-if="show_codes" class="country-dropdown">
                    <div class="dropdown-search">
                        <input 
                            @keyup="searchCodes" 
                            type="text" 
                            placeholder="Search country..." 
                            class="search-input" 
                        />
                    </div>

                    <div @mouseleave="hideCodes" class="country-list">
                        <button 
                            type="button"
                            v-for="(ele, idx) in country_codes" 
                            @click="() => updateExt(ele.code, ele.key, ele.flag)"
                            :key="`phone-int-code-${idx}`" 
                            class="country-option"
                        >
                            <span class="country-flag">{{ ele.flag }}</span>
                            <span class="country-name">{{ ele.name }}</span>
                            <span class="country-code">{{ ele.code }}</span>
                        </button>
                    </div>
                </div>
            </div>

            <input 
                @keydown="updateParent" 
                @change="updateParent" 
                type="text" 
                id="phone_number" 
                name="phone_number"
                v-model="phone_num" 
                v-mask="'################'" 
                class="phone-number-input"
                placeholder="(Area Code) Phone Number" 
            />
        </div>
    </div>
</template>

<style scoped>
/* Phone Input - Native Journey Design */
.phone-input-wrapper {
    width: 100%;
}

.phone-input-container {
    display: flex;
    gap: var(--space-2);
    width: 100%;
}

.country-code-selector {
    position: relative;
}

.code-select-button {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3);
    background: white;
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
    min-width: 100px;
}

.code-select-button:hover {
    border-color: var(--primary-teal);
}

.code-select-button:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.flag {
    font-size: var(--text-lg);
}

.code {
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--neutral-900);
}

.chevron {
    color: var(--neutral-500);
    transition: transform var(--transition-base);
}

.country-code-selector:has(.code-select-button:focus) .chevron {
    transform: rotate(180deg);
}

.country-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: var(--space-2);
    background: white;
    border: 1px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    z-index: 100;
    min-width: 280px;
    max-width: 320px;
}

.dropdown-search {
    padding: var(--space-3);
    border-bottom: 1px solid var(--neutral-200);
}

.search-input {
    width: 100%;
    padding: var(--space-2) var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    transition: all var(--transition-base);
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.country-list {
    max-height: 240px;
    overflow-y: auto;
    padding: var(--space-2);
}

.country-option {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    width: 100%;
    padding: var(--space-3);
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: all var(--transition-base);
    text-align: left;
}

.country-option:hover {
    background: var(--neutral-100);
}

.country-flag {
    font-size: var(--text-lg);
}

.country-name {
    flex: 1;
    font-size: var(--text-sm);
    color: var(--neutral-900);
}

.country-code {
    font-size: var(--text-sm);
    color: var(--neutral-600);
    font-weight: var(--font-medium);
}

.phone-number-input {
    flex: 1;
    padding: var(--space-3);
    border: 2px solid var(--neutral-200);
    border-radius: var(--radius-lg);
    font-size: var(--text-sm);
    transition: all var(--transition-base);
}

.phone-number-input:focus {
    outline: none;
    border-color: var(--primary-teal);
    box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.1);
}

.country-list::-webkit-scrollbar {
    width: 6px;
}

.country-list::-webkit-scrollbar-track {
    background: var(--neutral-100);
    border-radius: var(--radius-full);
}

.country-list::-webkit-scrollbar-thumb {
    background: var(--neutral-300);
    border-radius: var(--radius-full);
}

.country-list::-webkit-scrollbar-thumb:hover {
    background: var(--neutral-400);
}
</style>

<script>
import { CountryCodes } from '../../utils/geoUtils';
import { mask } from 'vue-the-mask';

export default {
        name: "IntPhoneNumber",

        props: {
                current_phone_number: String,
                current_phone_code: String,
        },

        directives: {
                mask
        },

        mounted() {
                this.phone_num = this.current_phone_number;
                this.phone_ext = this.current_phone_code;
                this.phone_flag = this.getFlagEmoji(this.phone_ext, true);
                
                // Add click outside listener
                document.addEventListener('click', this.handleClickOutside);
        },

        unmounted() {
                // Remove click outside listener
                document.removeEventListener('click', this.handleClickOutside);
        },

        created() {
                this.country_codes = CountryCodes.getCodes();
        },

        data: () => {
                return {
                        phone_ext: "+1",
                        phone_num: "",
                        phone_flag: "",
                        phone_cnt: "us",
                        country_codes: [],
                        show_codes: false,
                        search_term: "",
                }
        },

        methods: {
                handleClickOutside(event) {
                        // Close dropdown if click is outside the component
                        const dropdown = this.$el?.querySelector('.country-code-selector');
                        if (dropdown && !dropdown.contains(event.target)) {
                                this.hideCodes();
                        }
                },

                getFlagEmoji(countryCode, useExt = false) {
                        let code = countryCode;
                        if (useExt) {
                                const codes = CountryCodes.getCodes();
                                const result = codes.filter((c) => c.code === code);
                                if (result.length > 0) {
                                        code = result[0].key;
                                }
                        }
                        const codePoints = code
                                .toUpperCase()
                                .split('')
                                .map(char => 127397 + char.charCodeAt());
                        return String.fromCodePoint(...codePoints);

                },

                displayCodes() {
                        this.show_codes = true;
                },

                hideCodes() {
                        this.show_codes = false;
                },

                searchCodes(evt) {
                        const codes = CountryCodes.getCodes();
                        const val = evt.target.value;
                        if (val.trim() === "") {
                                this.country_codes = codes;
                        } else {
                                this.country_codes = codes.filter((c) => {
                                        return (c.name.toLowerCase().includes(val.toLowerCase()) || c.code.includes(`${val}`));
                                });
                        }

                },

                updateExt(ext, cnt, flag) {
                        this.phone_ext = ext;
                        this.phone_cnt = cnt;
                        this.show_codes = false;
                        this.phone_flag = flag;
                        this.updateParent();
                },

                updateParent() {
                        const { phone_ext, phone_num } = this;
                        this.$emit('onphoneupdate', { phone_ext, phone_num });
                }
        }
}
</script>