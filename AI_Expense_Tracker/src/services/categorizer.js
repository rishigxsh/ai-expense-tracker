/**
 * Auto-categorization service for expense descriptions
 * Uses keyword-based matching to suggest categories
 */

// Category keywords mapping
const categoryKeywords = {
  'Grocery': ['walmart', 'kroger', 'aldi', 'grocery', 'supermarket', 'food', 'grocery store', 'safeway', 'whole foods', 'trader joe'],
  'Transportation': ['uber', 'lyft', 'bus', 'train', 'taxi', 'gas', 'fuel', 'parking', 'metro', 'subway', 'flight', 'airline'],
  'Entertainment': ['netflix', 'spotify', 'movie', 'concert', 'theater', 'cinema', 'game', 'hulu', 'disney', 'amazon prime'],
  'Utilities': ['electric', 'water', 'gas', 'internet', 'phone', 'cable', 'utility', 'electricity', 'heating', 'cooling'],
  'Healthcare': ['pharmacy', 'doctor', 'hospital', 'medicine', 'medical', 'clinic', 'dentist', 'prescription', 'health', 'cvs', 'walgreens'],
  'Shopping': ['amazon', 'target', 'mall', 'clothes', 'shopping', 'store', 'retail', 'nike', 'adidas', 'best buy', 'home depot'],
  'Food': ['restaurant', 'mcdonald', 'pizza', 'coffee', 'dining', 'lunch', 'dinner', 'breakfast', 'cafe', 'starbucks', 'subway', 'burger']
};

/**
 * Suggests a category based on expense description
 * @param {string} description - The expense description
 * @returns {string} - Suggested category or 'Other' if no match
 */
export function suggestCategory(description) {
  if (!description || typeof description !== 'string') {
    return 'Other';
  }

  // Convert to lowercase for case-insensitive matching
  const lowerDescription = description.toLowerCase().trim();

  // Check each category for keyword matches
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (lowerDescription.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  // No match found, return default
  return 'Other';
}

/**
 * Get all available categories
 * @returns {Array<string>} - Array of category names
 */
export function getCategories() {
  return Object.keys(categoryKeywords).concat(['Other']);
}
