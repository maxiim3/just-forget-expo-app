/**
 * Command Parser for Unified Command Input
 *
 * Parses user input to detect actions, tags, and dates for highlighting.
 * Uses regex-based tokenization - designed to be replaceable by AI model later.
 *
 * Key behaviors:
 * - Last action keyword wins (e.g., "add foo delete bar" -> action is DELETE)
 * - Content is non-destructive (keywords stay in content)
 * - Default action is 'add' when no keyword detected
 */

import type {
  ActionType,
  Token,
  ParsedCommand,
  CommandParser,
} from "./commandTypes";

/** Maps keyword strings to their action types (case-insensitive matching) */
const ACTION_KEYWORDS: Record<string, ActionType> = {
  add: "add",
  create: "add",
  find: "search",
  search: "search",
  remove: "delete",
  delete: "delete",
  archive: "archive",
};

/** Date keywords to detect (not resolved, just highlighted) */
const DATE_KEYWORDS = [
  "today",
  "tomorrow",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "next week",
];

/** Regex pattern for hashtags */
const TAG_PATTERN = /#(\w+)/g;

/** Regex pattern for "next week" (multi-word date) */
const NEXT_WEEK_PATTERN = /\bnext\s+week\b/gi;

/**
 * Finds all matches of a pattern in the input string.
 * Returns match info with positions for token creation.
 */
function findMatches(
  input: string,
  pattern: RegExp
): Array<{ match: string; index: number }> {
  const matches: Array<{ match: string; index: number }> = [];
  let result: RegExpExecArray | null;

  // Reset lastIndex for global patterns
  pattern.lastIndex = 0;

  while ((result = pattern.exec(input)) !== null) {
    matches.push({ match: result[0], index: result.index });
  }

  return matches;
}

/**
 * Tokenizes the input string into typed tokens for highlighting.
 * Processes in order: multi-word dates, tags, action keywords, then remaining text.
 */
export function tokenize(input: string): Token[] {
  if (!input.trim()) {
    return [];
  }

  // Track which character positions have been claimed by tokens
  const claimed = new Array(input.length).fill(false);
  const tokens: Token[] = [];

  // 1. Find "next week" (multi-word date) first
  const nextWeekMatches = findMatches(input, NEXT_WEEK_PATTERN);
  for (const { match, index } of nextWeekMatches) {
    tokens.push({
      type: "date",
      value: "next week",
      raw: match,
      start: index,
      end: index + match.length,
    });
    for (let i = index; i < index + match.length; i++) {
      claimed[i] = true;
    }
  }

  // 2. Find hashtags
  const tagMatches = findMatches(input, TAG_PATTERN);
  for (const { match, index } of tagMatches) {
    // Skip if already claimed
    if (claimed[index]) continue;

    const tagValue = match.slice(1); // Remove # prefix
    tokens.push({
      type: "tag",
      value: tagValue,
      raw: match,
      start: index,
      end: index + match.length,
    });
    for (let i = index; i < index + match.length; i++) {
      claimed[i] = true;
    }
  }

  // 3. Find single-word dates and action keywords
  // Match word boundaries for clean detection
  const wordPattern = /\b(\w+)\b/g;
  const wordMatches = findMatches(input, wordPattern);

  for (const { match, index } of wordMatches) {
    // Skip if any part is already claimed
    const isClaimed = claimed.slice(index, index + match.length).some(Boolean);
    if (isClaimed) continue;

    const lowerMatch = match.toLowerCase();

    // Check if it's a date keyword
    if (DATE_KEYWORDS.includes(lowerMatch)) {
      tokens.push({
        type: "date",
        value: lowerMatch,
        raw: match,
        start: index,
        end: index + match.length,
      });
      for (let i = index; i < index + match.length; i++) {
        claimed[i] = true;
      }
      continue;
    }

    // Check if it's an action keyword
    if (lowerMatch in ACTION_KEYWORDS) {
      tokens.push({
        type: "action",
        value: ACTION_KEYWORDS[lowerMatch],
        raw: match,
        start: index,
        end: index + match.length,
      });
      for (let i = index; i < index + match.length; i++) {
        claimed[i] = true;
      }
    }
  }

  // 4. Remaining unclaimed text becomes 'text' tokens
  let textStart = -1;
  for (let i = 0; i <= input.length; i++) {
    const isEnd = i === input.length;
    const isClaimed = isEnd || claimed[i];

    if (!isClaimed && textStart === -1) {
      // Start of unclaimed text
      textStart = i;
    } else if (isClaimed && textStart !== -1) {
      // End of unclaimed text segment
      const raw = input.slice(textStart, i);
      // Only add non-whitespace-only segments as meaningful text tokens
      if (raw.trim()) {
        tokens.push({
          type: "text",
          value: raw.trim(),
          raw: raw,
          start: textStart,
          end: i,
        });
      }
      textStart = -1;
    }
  }

  // Sort tokens by position for consistent ordering
  tokens.sort((a, b) => a.start - b.start);

  return tokens;
}

/**
 * Parses a command input string into a structured ParsedCommand.
 *
 * @param input - Raw user input string
 * @returns ParsedCommand with action, tokens, tags, and content
 *
 * @example
 * parseCommand("buy milk")
 * // -> { action: 'add', content: 'buy milk', tags: [], ... }
 *
 * @example
 * parseCommand("add foo delete bar")
 * // -> { action: 'delete', content: 'add foo delete bar', ... }
 *
 * @example
 * parseCommand("search #work tomorrow")
 * // -> { action: 'search', tags: ['work'], ... }
 */
export function parseCommand(input: string): ParsedCommand {
  const tokens = tokenize(input);

  // Find the last action token (last keyword wins)
  let action: ActionType = "add"; // Default
  for (const token of tokens) {
    if (token.type === "action") {
      action = token.value as ActionType;
    }
  }

  // Extract tags (without # prefix)
  const tags = tokens
    .filter((t) => t.type === "tag")
    .map((t) => t.value);

  return {
    action,
    tokens,
    content: input, // Non-destructive: keep full input
    tags,
    rawInput: input,
  };
}

/**
 * Regex-based command parser implementation.
 * Implements CommandParser interface for future AI replacement.
 */
export class RegexCommandParser implements CommandParser {
  parse(input: string): ParsedCommand {
    return parseCommand(input);
  }
}

/** Default parser instance */
export const defaultParser = new RegexCommandParser();
