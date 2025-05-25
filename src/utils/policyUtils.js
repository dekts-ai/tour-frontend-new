// Import policy data (assuming these are defined elsewhere or inline here)
import {
    eggshellPolicy,
    ahbbPolicy,
    apmPolicy,
    kensPolicy,
    standardPolicy
} from '../data/staticData'; // Adjust the path based on your project structure

/**
 * Returns the appropriate policy HTML based on the tenant ID.
 * @param {string} tenantId - The ID of the tenant (e.g., 'kens', 'apm')
 * @returns {string} - The policy HTML string
 */
export function getPolicyByTenant(tenantId) {
    switch (tenantId) {
        case 'kens':
            return kensPolicy();
        case 'apm':
            return apmPolicy();
        case 'ahbb':
            return ahbbPolicy();
        case 'eggshell':
            return eggshellPolicy();
        default:
            return standardPolicy();
    }
}

// Example policy functions (if not imported from staticData.js)
// function eggshellPolicy() {
//     return `
//       <div>
//         <h3>Eggshell Policy</h3>
//         <p>This is the cancellation policy for Eggshell tenants...</p>
//       </div>
//     `;
// }

// Export individual policies if needed elsewhere
export { eggshellPolicy, ahbbPolicy, apmPolicy, kensPolicy, standardPolicy };