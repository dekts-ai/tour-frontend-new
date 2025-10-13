<template>
	<div v-if="form && form.fields && form.fields.length" class="accordion-item">
		<div class="accordion-header" id="headingThree">
			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
				data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
				Additional Options:
			</button>
		</div>
		<div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
			data-bs-parent="#accordionExample">
			<div class="accordion-body">
				<div class="custom-fields">
					<div v-if="loading" class="loading-container">
						<div class="spinner"></div>
						<span class="loading-text">Loading add-ons...</span>
					</div>
					<div v-else-if="form && form.fields && form.fields.length" class="fields-container">
						<!-- Total Cost Summary -->
						<div class="total-cost-summary" aria-live="polite">
							<span class="total-cost-label">Total Add-on Cost:</span>
							<span class="total-cost-amount">${{ totalCost.toFixed(2) }}</span>
						</div>
						<div v-for="field in sortedFields" :key="field.id" class="field-card">
							<div class="field-header">
								<label :for="'field-' + field.id" class="field-label">
									{{ field.label }}
									<span v-if="field.required" class="required-indicator">*</span>
									<span v-if="field.description" class="tooltip-wrapper">
										<svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										<span class="tooltip">{{ field.description }}</span>
									</span>
								</label>
								<span
									v-if="field.additional_fee && field.price && !['radio', 'dropdown'].includes(field.type)"
									class="price-tag">
									${{ field.price }} ({{ field.unit_type.replace('pax', 'people') }})
								</span>
							</div>

							<!-- Dynamic Input Component -->
							<component :is="getInputComponent(field.type)" :field="field" :value="getFieldValue(field)"
								:enabled="enabled" :display-errors="display_errors" :error="errors[field.id]"
								@update:value="updateValue(field, $event)" @validate="validateField(field)" />

							<!-- Nested/Conditional Children -->
							<transition-group name="fade" tag="div" class="nested-fields">
								<div v-for="child in sortedChildren(field.children)" :key="child.id"
									class="child-field-card">
									<div class="field-header">
										<label :for="'field-' + child.id" class="field-label">
											{{ child.label }}
											<span v-if="child.required" class="required-indicator">*</span>
											<span v-if="child.description" class="tooltip-wrapper">
												<svg class="info-icon" fill="none" stroke="currentColor"
													viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path stroke-linecap="round" stroke-linejoin="round"
														stroke-width="2"
														d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
													</path>
												</svg>
												<span class="tooltip">{{ child.description }}</span>
											</span>
										</label>
										<span
											v-if="child.additional_fee && child.price && !['radio', 'dropdown'].includes(child.type)"
											class="price-tag">
											- ${{ child.price }} ({{ child.unit_type ? child.unit_type.replace('pax',
												'people') : 'N/A' }})
										</span>
									</div>

									<template v-if="shouldShowChildren(field)">
										<template
											v-if="field.unit_type === 'Price per pax' && total_people_selected > 0">
											<div v-for="personIndex in total_people_selected" :key="personIndex"
												class="person-input">
												<div class="person-header">Person {{ personIndex }}</div>
												<component :is="getInputComponent(child.type)" :field="child"
													:value="getChildValue(child, personIndex - 1)" :enabled="enabled"
													:display-errors="display_errors"
													:error="errors[`${child.id}-${personIndex}`]"
													:id-suffix="`-${personIndex}`"
													@update:value="updateChildValue(child, personIndex - 1, $event)"
													@validate="validateField(child, `${personIndex}`)" />
											</div>
										</template>
										<template v-else-if="field.unit_type === 'Price per unit'">
											<div v-for="unitIndex in getRepeatCount(field)" :key="unitIndex">
												<div class="unit-header">Unit {{ unitIndex }}</div>
												<component :is="getInputComponent(child.type)" :field="child"
													:value="getChildValue(child, unitIndex - 1)" :enabled="enabled"
													:display-errors="display_errors"
													:error="errors[`${child.id}-${unitIndex}`]"
													:id-suffix="`-${unitIndex}`"
													@update:value="updateChildValue(child, unitIndex - 1, $event)"
													@validate="validateField(child, `${unitIndex}`)" />
											</div>
										</template>
										<template v-else>
											<component :is="getInputComponent(child.type)" :field="child"
												:value="getFieldValue(child)" :enabled="enabled"
												:display-errors="display_errors" :error="errors[child.id]"
												@update:value="updateValue(child, $event)"
												@validate="validateField(child)" />
										</template>
									</template>
								</div>
							</transition-group>

							<!-- Field Error Display -->
							<div v-if="display_errors && errors[field.id]" class="error-message"
								:id="'error-field-' + field.id">
								{{ errors[field.id] }}
							</div>

							<!-- Subtotal for parent fields -->
							<div v-if="!field.parent_field_id && safeValues[field.id]?.subtotal > 0"
								class="subtotal-tag">
								Subtotal: ${{ safeValues[field.id].subtotal.toFixed(2) }} (Fee: ${{
									safeValues[field.id].fee.toFixed(2) }})
							</div>
						</div>

						<button v-if="display_submit" @click="submitForm" class="submit-button" :disabled="!enabled">
							Submit Add-ons
						</button>
					</div>
					<div v-else class="no-addons">No add-ons available for this package.</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, computed } from 'vue';
import axios from 'axios';
import NumberInput from './AddonInput/NumberInput.vue';
import RadioInput from './AddonInput/RadioInput.vue';
import CheckboxInput from './AddonInput/CheckboxInput.vue';
import DropdownInput from './AddonInput/DropdownInput.vue';
import TextInput from './AddonInput/TextInput.vue';
import TextboxInput from './AddonInput/TextboxInput.vue';

export default {
	name: 'CustomFields',
	components: {
		NumberInput,
		RadioInput,
		CheckboxInput,
		DropdownInput,
		TextInput,
		TextboxInput
	},
	props: {
		values: {
			type: Object,
			default: () => ({})
		},
		enabled: {
			type: Boolean,
			default: true
		},
		display_errors: {
			type: Boolean,
			default: false
		},
		display_submit: {
			type: Boolean,
			default: false
		},
		display_height: {
			type: Number,
			default: 275
		},
		service_commission: {
			type: [Number, String],
			default: 0
		},
		endpoint: {
			type: String,
			required: true
		},
		total_people_selected: {
			type: [Number, String],
			default: 0
		}
	},
	setup() {
		const internalValues = reactive({});

		const totalCost = computed(() => {
			let total = 0;
			if (internalValues && typeof internalValues === 'object') {
				Object.values(internalValues).forEach(item => {
					total += (item.subtotal || 0) + (item.fee || 0);
				});
			}
			return total;
		});

		return { internalValues, totalCost };
	},
	data() {
		return {
			form: null,
			loading: true,
			errors: {}
		};
	},
	computed: {
		sortedFields() {
			if (!this.form || !this.form.fields) return [];
			return [...this.form.fields].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
		},
		safeValues() {
			return this.values && typeof this.values === 'object' && this.values !== null ? this.values : this.internalValues;
		}
	},
	watch: {
		values: {
			handler() {
				if (this.form && this.form.fields) {
					this.initializeValues(this.form.fields);
					this.updateAllFees();
					if (this.display_errors) {
						this.validate();
					}
				}
			},
			deep: true,
			immediate: true
		},
		total_people_selected: {
			handler(newValue) {
				console.log('total_people_selected updated:', newValue);
				if (this.form && this.form.fields) {
					this.initializeValues(this.form.fields);
					this.updateAllFees();
				}
			},
			immediate: true
		},
		service_commission() {
			if (this.form && this.form.fields) {
				this.updateAllFees();
			}
		}
	},
	created() {
		console.log('CustomFields created, enabled:', this.enabled);
		this.fetchForm();
	},
	methods: {
		getInputComponent(type) {
			console.log('getInputComponent called with type:', type);
			switch (type) {
				case 'number': return 'NumberInput';
				case 'radio': return 'RadioInput';
				case 'checkbox': return 'CheckboxInput';
				case 'dropdown': return 'DropdownInput';
				case 'text': return 'TextInput';
				case 'textbox': return 'TextboxInput';
				default: return null;
			}
		},
		getFieldValue(field) {
			return this.safeValues[field.id]?.value ?? this.defaultForType(field.type);
		},
		getChildValue(child, index) {
			const value = this.safeValues[child.id]?.values?.[index] ?? this.defaultForType(child.type);
			console.log(`getChildValue for child ${child.id}, index ${index}:`, value);
			return value;
		},
		async fetchForm() {
			this.loading = true;
			try {
				const resp = await axios.get(this.endpoint);
				const data = resp.data;
				this.form = data.form;
				this.$emit('customformexists', this.form && this.form.fields && this.form.fields.length > 0);
				this.initializeValues(this.form.fields || []);
				this.updateAllFees();
			} catch (err) {
				console.error('Error fetching add-on form:', err);
				this.form = { fields: [] };
				this.$emit('customformexists', false);
			} finally {
				this.loading = false;
			}
		},
		initializeValues(fields) {
			if (!fields) return;
			fields.forEach(field => {
				if (!this.safeValues || typeof this.safeValues !== 'object') {
					console.warn(`Skipping initialization for field ${field.id}: safeValues is not an object`);
					return;
				}
				if (!(field.id in this.safeValues)) {
					this.safeValues[field.id] = {
						value: this.defaultForType(field.type),
						price: 0,
						subtotal: 0,
						fee: 0,
						isRepeated: ['Price per unit', 'Price per pax'].includes(field.unit_type),
						values: ['Price per unit', 'Price per pax'].includes(field.unit_type) ? [] : null
					};
				}
				if (field.children && field.children.length) {
					this.initializeValues(field.children);
				}
			});
		},
		defaultForType(type) {
			switch (type) {
				case 'checkbox': return false;
				case 'number': return 0;
				case 'radio':
				case 'dropdown': return '';
				case 'text':
				case 'textbox': return '';
				default: return '';
			}
		},
		getRepeatCount(field) {
			return this.safeValues[field.id]?.value || 0;
		},
		shouldShowChildren(field) {
			if (!field.rules || !field.rules.length) return true;
			const rule = field.rules[0];
			const value = this.safeValues[field.id]?.value ?? null;
			if (value === undefined || value === null) return false;
			switch (rule.operator) {
				case 'checked': return !!value;
				case '==': return value === rule.value;
				case '!=': return value !== rule.value;
				case '>': return Number(value) > Number(rule.value);
				case '<': return Number(value) < Number(rule.value);
				case '>=': return Number(value) >= Number(rule.value);
				case '<=': return Number(value) <= Number(rule.value);
				default: return false;
			}
		},
		sortedChildren(children) {
			if (!children) return [];
			return [...children].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
		},
		updateValue(field, newValue) {
			if (!this.safeValues[field.id]) {
				this.safeValues[field.id] = {
					value: newValue,
					price: 0,
					subtotal: 0,
					fee: 0,
					isRepeated: ['Price per unit', 'Price per pax'].includes(field.unit_type),
					values: ['Price per unit', 'Price per pax'].includes(field.unit_type) ? [] : null
				};
			} else {
				this.safeValues[field.id].value = newValue;
			}
			this.initializeValues(this.form.fields);
			this.updateAllFees();
			if (this.display_errors) {
				this.validate();
			}
		},
		updateChildValue(child, index, newValue) {
			if (!this.safeValues[child.id]) {
				this.safeValues[child.id] = {
					value: this.defaultForType(child.type),
					price: 0,
					subtotal: 0,
					fee: 0,
					isRepeated: ['Price per unit', 'Price per pax'].includes(child.unit_type),
					values: ['Price per unit', 'Price per pax'].includes(child.unit_type) ? [] : null
				};
			}
			if (!this.safeValues[child.id].values) {
				this.safeValues[child.id].values = [];
			}
			this.safeValues[child.id].values[index] = newValue;
			this.updateAllFees();
			if (this.display_errors) {
				this.validate();
			}
		},
		resizeChildValues(child, parent, commissionRate) {
			const item = this.safeValues[child.id];
			if (!item) return;

			let count = 0;
			if (child.unit_type === 'Price per unit') {
				count = this.safeValues[parent.id]?.value || 0;
			} else if (child.unit_type === 'Price per pax') {
				count = Number(this.total_people_selected) || 0;
			}

			let values = item.values || [];
			while (values.length < count) {
				values.push(this.defaultForType(child.type));
			}
			if (values.length > count) {
				values.length = count;
			}
			item.values = values;

			let subtotal = 0;
			values.forEach(val => {
				let instanceCost = 0;
				if (child.type === 'radio' || child.type === 'dropdown') {
					const selectedOption = child.options?.find(opt => opt.value === val) || {};
					if (selectedOption.additional_fee && selectedOption.price) {
						instanceCost = Number(selectedOption.price) || 0;
					}
				} else if (child.type === 'number') {
					if (child.additional_fee && child.price) {
						instanceCost = Number(child.price) * Number(val || 0);
					}
				} else if (child.type === 'checkbox') {
					if (child.additional_fee && child.price && val === true) {
						instanceCost = Number(child.price) || 0;
					}
				} else if (child.additional_fee && child.price) {
					instanceCost = Number(child.price) || 0;
				}
				subtotal += instanceCost;
			});

			const fee = subtotal * commissionRate;
			item.subtotal = subtotal;
			item.fee = fee;
		},
		updateAllFees() {
			const commissionRate = Number(this.service_commission) / 100 || 0;
			const allFields = this.getAllFields();
			allFields.forEach(field => {
				const entry = this.safeValues[field.id];
				if (!entry) return;

				let price = 0;
				let subtotal = 0;
				const value = entry.value;

				if (field.type === 'radio' || field.type === 'dropdown') {
					if (value && field.options) {
						const selectedOption = field.options.find(option => option.value === value);
						if (selectedOption && selectedOption.additional_fee && selectedOption.price) {
							price = Number(selectedOption.price) || 0;
							subtotal = price;
						}
					}
				} else if (field.type === 'number') {
					if (field.additional_fee && field.price) {
						price = Number(field.price) || 0;
						subtotal = price * (Number(value) || 0);
					}
				} else if (field.type === 'checkbox') {
					if (field.additional_fee && field.price && value === true) {
						price = Number(field.price) || 0;
						if (field.unit_type === 'Price per pax' && Number(this.total_people_selected) > 0) {
							subtotal = price * Number(this.total_people_selected);
						} else {
							subtotal = price;
						}
					}
				} else if (field.additional_fee && field.price) {
					price = Number(field.price) || 0;
					subtotal = price;
				}

				const fee = subtotal * commissionRate;
				entry.price = price;
				entry.subtotal = subtotal;
				entry.fee = fee;
			});

			this.getAllFields().forEach(field => {
				if (field.children) {
					field.children.forEach(child => {
						if (['Price per unit', 'Price per pax'].includes(field.unit_type)) {
							this.resizeChildValues(child, field, commissionRate);
						}
					});
				}
			});
		},
		getAllFields(fields = this.form.fields, allFields = []) {
			if (!fields) return allFields;
			fields.forEach(field => {
				allFields.push(field);
				if (field.children) {
					this.getAllFields(field.children, allFields);
				}
			});
			return allFields;
		},
		validateField(field, suffix = '') {
			const fieldId = suffix ? `${field.id}-${suffix}` : field.id;
			this.errors[fieldId] = '';

			const value = this.safeValues[field.id]?.value ?? null;

			if (field.required && !value && value !== 0) {
				this.errors[fieldId] = `${field.label} is required.`;
				return;
			}

			if (field.type === 'number') {
				const numValue = Number(value);
				if (field.min !== null && numValue < field.min) {
					this.errors[fieldId] = `${field.label} must be at least ${field.min}.`;
					return;
				}
				if (field.max !== null && numValue > field.max) {
					this.errors[fieldId] = `${field.label} cannot exceed ${field.max}.`;
					return;
				}
			}

			if (['text', 'textbox'].includes(field.type) && field.required && (value || '').trim() === '') {
				this.errors[fieldId] = `${field.label} cannot be empty.`;
				return;
			}

			if (field.rules && field.rules.length) {
				field.rules.forEach(rule => {
					let isValid = true;
					switch (rule.operator) {
						case 'checked': isValid = !!value; break;
						case '==': isValid = value === rule.value; break;
						case '!=': isValid = value !== rule.value; break;
						case '>': isValid = Number(value) > Number(rule.value); break;
						case '<': isValid = Number(value) < Number(rule.value); break;
						case '>=': isValid = Number(value) >= Number(rule.value); break;
						case '<=': isValid = Number(value) <= Number(rule.value); break;
						default: isValid = true;
					}
					if (!isValid) {
						this.errors[fieldId] = `${field.label} does not meet the condition: ${rule.operator} ${rule.value || 'checked'}.`;
					}
				});
			}

			if (!this.errors[fieldId]) {
				delete this.errors[fieldId];
			}

			if (this.shouldShowChildren(field) && field.children) {
				field.children.forEach(child => {
					if (['Price per unit', 'Price per pax'].includes(field.unit_type)) {
						if (field.unit_type === 'Price per pax' && Number(this.total_people_selected) > 0) {
							for (let personIndex = 1; personIndex <= Number(this.total_people_selected); personIndex++) {
								this.validateChildField(child, `${personIndex}`);
							}
						} else if (field.unit_type === 'Price per unit') {
							const count = this.getRepeatCount(field);
							for (let unitIndex = 1; unitIndex <= count; unitIndex++) {
								this.validateChildField(child, `${unitIndex}`);
							}
						}
					} else {
						this.validateField(child);
					}
				});
			}
		},
		validateChildField(child, suffix) {
			const fieldId = `${child.id}-${suffix}`;
			const value = this.safeValues[child.id]?.values?.[parseInt(suffix) - 1] ?? null;

			this.errors[fieldId] = '';

			if (child.required && !value && value !== 0) {
				this.errors[fieldId] = `${child.label} is required.`;
				return;
			}

			if (child.type === 'number') {
				const numValue = Number(value);
				if (child.min !== null && numValue < child.min) {
					this.errors[fieldId] = `${child.label} must be at least ${child.min}.`;
					return;
				}
				if (child.max !== null && numValue > field.max) {
					this.errors[fieldId] = `${child.label} cannot exceed ${child.max}.`;
					return;
				}
			}

			if (['text', 'textbox'].includes(child.type) && child.required && (value || '').trim() === '') {
				this.errors[fieldId] = `${child.label} cannot be empty.`;
				return;
			}

			if (child.type === 'radio' && child.required && !value) {
				this.errors[fieldId] = `${child.label} is required.`;
				return;
			}

			if (!this.errors[fieldId]) {
				delete this.errors[fieldId];
			}
		},
		validate() {
			if (!this.form || !this.form.fields) return;
			this.errors = {};
			this.getAllFields().forEach(field => {
				this.validateField(field);
			});
		}
	}
};
</script>

<style scoped>
/* Fallback Scoped CSS */
.custom-fields {
	background-color: #ffffff;
}

.total-cost-summary {
	background-color: #f0fdf4;
	padding: 8px;
	border-radius: 6px;
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.total-cost-label {
	font-size: 14px;
	font-weight: 500;
	color: #374151;
}

.total-cost-amount {
	font-size: 14px;
	font-weight: 700;
	color: #16a34a;
}

.loading-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	gap: 8px;
}

.spinner {
	width: 24px;
	height: 24px;
	border: 2px solid #e5e7eb;
	border-top: 2px solid #3b82f6;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

.loading-text {
	color: #4b5563;
	font-size: 14px;
}

.fields-container {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.field-card {
	background-color: #f9fafb;
	border-radius: 6px;
	padding: 12px;
}

.field-header {
	display: flex;
	flex-direction: column;
	gap: 4px;
}

.field-label {
	font-size: 16px;
	font-weight: 500;
	color: #1f2937;
	display: flex;
	align-items: center;
}

.required-indicator {
	margin-left: 4px;
	color: #ef4444;
	font-size: 14px;
}

.tooltip-wrapper {
	position: relative;
	margin-left: 4px;
}

.info-icon {
	width: 16px;
	height: 16px;
	color: #9ca3af;
	cursor: help;
}

.tooltip {
	display: none;
	position: absolute;
	background-color: #1f2937;
	color: #ffffff;
	font-size: 12px;
	border-radius: 4px;
	padding: 4px 8px;
	top: -32px;
	width: 160px;
	z-index: 10;
}

.tooltip-wrapper:hover .tooltip {
	display: block;
}

.price-tag {
	font-size: 12px;
	color: #16a34a;
	font-weight: 500;
}

.subtotal-tag {
	margin-top: 8px;
	font-size: 14px;
	color: #374151;
	font-weight: 500;
}

.rate-group-header,
.unit-header {
	margin-top: 8px;
	font-size: 14px;
	font-weight: 600;
	color: #1f2937;
}

.person-input {
	margin-left: 8px;
}

.input-wrapper {
	margin-top: 8px;
}

.input-error {
	border-color: #ef4444;
}

.nested-fields {
	margin-top: 12px;
	margin-left: 8px;
	border-left: 2px solid #e5e7eb;
	padding-left: 8px;
}

.child-field-card {
	background-color: #f3f4f6;
	border-radius: 6px;
	padding: 8px;
}

.error-message {
	margin-top: 4px;
	color: #ef4444;
	font-size: 12px;
}

.submit-button {
	width: 100%;
	background-color: #3b82f6;
	color: #ffffff;
	padding: 8px;
	border-radius: 6px;
	font-size: 14px;
	font-weight: 500;
	transition: background-color 0.2s ease, box-shadow 0.2s ease;
	cursor: pointer;
}

.submit-button:hover:not(:disabled) {
	background-color: #2563eb;
}

.submit-button:focus {
	outline: none;
	box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.submit-button:disabled {
	background-color: #9ca3af;
	cursor: not-allowed;
}

.no-addons {
	text-align: center;
	color: #6b7280;
	font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

@media (min-width: 640px) {
	.total-cost-summary {
		padding: 12px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.total-cost-label,
	.total-cost-amount {
		font-size: 16px;
	}

	.spinner {
		width: 32px;
		height: 32px;
	}

	.loading-text {
		font-size: 16px;
	}

	.fields-container {
		gap: 24px;
	}

	.field-card {
		padding: 16px;
	}

	.field-header {
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	.field-label {
		font-size: 18px;
	}

	.required-indicator {
		font-size: 16px;
	}

	.info-icon {
		width: 20px;
		height: 20px;
	}

	.tooltip {
		font-size: 14px;
		top: -40px;
		width: 192px;
	}

	.price-tag {
		font-size: 14px;
	}

	.subtotal-tag {
		font-size: 16px;
	}

	.rate-group-header,
	.unit-header {
		font-size: 16px;
	}

	.submit-button {
		padding: 12px;
		font-size: 16px;
	}

	.no-addons {
		font-size: 16px;
	}
}

@media (min-width: 768px) {
	.total-cost-summary {
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.nested-fields {
		margin-left: 16px;
		padding-left: 16px;
	}

	.child-field-card {
		padding: 12px;
	}
}
</style>