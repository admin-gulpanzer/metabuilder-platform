/**
 * Utility function to clean up LLM response formatting
 * Preserves markdown formatting and cleans up whitespace
 */
export function cleanResponseFormatting(response: string): string {
  return response
    // Clean up excessive whitespace while preserving important line breaks
    .replace(/\n\s*\n\s*\n\s*\n+/g, '\n\n') // Replace 3+ consecutive newlines with 2
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Replace 3 consecutive newlines with 2
    // Fix problematic asterisk patterns while preserving valid markdown
    .replace(/\*\*\s+\*\*/g, '**') // Remove double asterisks with multiple spaces between them
    .replace(/\*\s+\*/g, '*') // Remove single asterisks with multiple spaces between them
    .replace(/\*\*\*\*/g, '**') // Convert quadruple asterisks to double
    // Clean up extra spaces around colons but preserve markdown
    .replace(/([^:])\s*:\s*/g, '$1: ') // Normalize colon spacing but don't affect markdown
    // Ensure proper spacing after headers
    .replace(/(## [^\n]+)\n([^#\n])/g, '$1\n\n$2')
    // Ensure proper spacing after bullet points
    .replace(/(\n- [^\n]+)\n([^-\n])/g, '$1\n\n$2')
    // Ensure proper spacing after numbered lists
    .replace(/(\n\d+\. [^\n]+)\n([^\d\n])/g, '$1\n\n$2')
    // Trim leading/trailing whitespace
    .trim();
} 