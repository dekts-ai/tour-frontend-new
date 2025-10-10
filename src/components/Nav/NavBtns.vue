<template>
    <div class="modern-nav">
        <div class="modern-nav-container">
            <!-- Brand -->
            <div class="modern-nav-brand">
                <div class="brand-logo" v-if="tourOperatorLogo && tourOperatorLogo.logo">
                    <img :src="tourOperatorLogo.logo" :alt="tourOperatorName" />
                </div>
                <div class="brand-icon" v-else>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 4L4 10V22L16 28L28 22V10L16 4Z" fill="currentColor" opacity="0.2"/>
                        <path d="M16 4V16M16 16L4 10M16 16L28 10M16 16V28M16 28L4 22M16 28L28 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="brand-text">
                    <div class="brand-title">{{ tourOperatorName }}</div>
                    <div class="brand-subtitle">Tours</div>
                </div>
            </div>

            <!-- Progress Steps -->
            <div class="nav-steps">
                <div 
                    v-for="(step, index) in steps" 
                    :key="index"
                    class="nav-step"
                    :class="{
                        'active': tabs === step.id,
                        'completed': tabs > step.id,
                        'disabled': !canNavigateTo(step.id)
                    }"
                    @click="handleNavigation(step.id, step.route)">
                    
                    <div class="step-indicator">
                        <div class="step-number" v-if="tabs < step.id">{{ getStepNumber(step.id) }}</div>
                        <svg v-else class="step-check" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    
                    <div class="step-content">
                        <div class="step-label">Step {{ getStepNumber(step.id) }}</div>
                        <div class="step-title">{{ step.title }}</div>
                    </div>
                </div>
            </div>

            <!-- Close Button -->
            <button v-if="iframeStatus" class="nav-close" @click="closeIframe" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBtns',
    props: ['comboIds', 'tabs'],
    data() {
        return {
            iframeStatus: true
        };
    },
    created() {
        this.iframeStatus = this.$store.state.iframeStatus;
    },
    computed: {
        tourOperatorLogo() {
            return this.$store.state.tourPackageLogo;
        },
        tourOperatorName() {
            return this.tourOperatorLogo && this.tourOperatorLogo.name 
                ? this.tourOperatorLogo.name 
                : 'Native Journeys';
        },
        hasCustomFields() {
            return this.$store.state.hasCustomFields;
        },
        isComboPackage() {
            return this.$store.state.comboIds && this.$store.state.comboIds !== 0;
        },
        steps() {
            const steps = [];
            
            // All flows start with Browse and Schedule
            steps.push({ id: 1, title: 'Browse Tours', route: 'Index' });
            steps.push({ id: 2, title: 'Choose Date', route: 'Init' });
            
            if (this.isComboPackage) {
                // Combination package flow
                if (this.hasCustomFields === true) {
                    steps.push({ id: 3, title: 'Add Extras', route: 'Addons' });
                    steps.push({ id: 4, title: 'My Trip', route: 'MyTrip' });
                    steps.push({ id: 5, title: 'Trip Map', route: 'Maps' });
                    steps.push({ id: 6, title: 'Checkout', route: 'Checkout' });
                } else {
                    // No add-ons for combo
                    steps.push({ id: 3, title: 'My Trip', route: 'MyTrip' });
                    steps.push({ id: 4, title: 'Trip Map', route: 'Maps' });
                    steps.push({ id: 5, title: 'Checkout', route: 'Checkout' });
                }
            } else {
                // Single package flow
                if (this.hasCustomFields === true) {
                    steps.push({ id: 3, title: 'Add Extras', route: 'Addons' });
                    steps.push({ id: 4, title: 'Checkout', route: 'Checkout' });
                } else {
                    // No add-ons for single
                    steps.push({ id: 3, title: 'Checkout', route: 'Checkout' });
                }
            }
            
            return steps;
        }
    },
    methods: {
        getStepNumber(stepId) {
            // Return the visual step number (1, 2, 3, 4) based on position in steps array
            const index = this.steps.findIndex(s => s.id === stepId);
            return index + 1;
        },
        canNavigateTo(stepId) {
            // Allow navigation to current or previous steps
            return stepId <= this.tabs || stepId === 1;
        },
        handleNavigation(tab, destination) {
            if (this.canNavigateTo(tab)) {
                this.$emit('navigatetotab', tab, destination);
            }
        },
        closeIframe() {
            window.parent.postMessage({ message: 'close_iframe' }, '*');
        }
    }
};
</script>

<style scoped>
.modern-nav {
    background: white;
    border-bottom: 1px solid var(--neutral-200);
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    box-shadow: var(--shadow-sm);
}

.modern-nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--space-4) var(--space-6);
    display: flex;
    align-items: center;
    gap: var(--space-8);
    width: 100%;
    box-sizing: border-box;
}

/* Brand */
.modern-nav-brand {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-shrink: 0;
}

.brand-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.brand-logo {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.brand-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.brand-text {
    display: flex;
    flex-direction: column;
}

.brand-title {
    font-size: var(--text-base);
    font-weight: var(--font-bold);
    color: var(--neutral-900);
    line-height: 1.2;
}

.brand-subtitle {
    font-size: var(--text-xs);
    color: var(--neutral-500);
    line-height: 1;
}

/* Steps */
.nav-steps {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    overflow-x: auto;
    scrollbar-width: none;
}

.nav-steps::-webkit-scrollbar {
    display: none;
}

.nav-step {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-base);
    flex-shrink: 0;
    position: relative;
}

.nav-step::after {
    content: '';
    position: absolute;
    right: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 2px;
    background: var(--neutral-300);
}

.nav-step:last-child::after {
    display: none;
}

.nav-step.disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nav-step.active {
    background: linear-gradient(135deg, var(--primary-teal) 0%, var(--primary-teal-light) 100%);
    color: white;
}

.nav-step.completed {
    background: var(--neutral-100);
}

.nav-step:not(.disabled):not(.active):hover {
    background: var(--neutral-100);
}

.step-indicator {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
}

.nav-step.active .step-indicator {
    background: rgba(255, 255, 255, 0.3);
}

.nav-step.completed .step-indicator {
    background: var(--primary-teal);
    color: white;
}

.step-number {
    font-size: var(--text-sm);
    font-weight: var(--font-bold);
    color: var(--neutral-600);
}

.nav-step.active .step-number {
    color: white;
}

.step-check {
    color: white;
}

.step-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.step-label {
    font-size: var(--text-xs);
    font-weight: var(--font-medium);
    opacity: 0.8;
    line-height: 1;
    margin-bottom: 2px;
}

.step-title {
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    line-height: 1.2;
}

/* Close Button */
.nav-close {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-lg);
    border: none;
    background: var(--neutral-100);
    color: var(--neutral-600);
    cursor: pointer;
    transition: all var(--transition-base);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.nav-close:hover {
    background: var(--neutral-200);
    color: var(--neutral-900);
}

/* Responsive */
@media (max-width: 1024px) {
    .modern-nav-container {
        gap: var(--space-4);
    }
    
    .step-label {
        display: none;
    }
}

@media (max-width: 768px) {
    .modern-nav-container {
        padding: var(--space-3) var(--space-4);
    }
    
    .brand-subtitle {
        display: none;
    }
    
    .step-content {
        display: none;
    }
    
    .nav-step {
        padding: var(--space-2);
    }
}
</style>
