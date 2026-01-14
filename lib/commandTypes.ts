/**
 * Command Types for Unified Command Input
 *
 * Defines the type system for parsing user input into structured commands.
 * This enables syntax highlighting and action detection from natural language input.
 */

/** Supported action types for command processing */
export type ActionType = "add" | "search" | "delete" | "archive";

/** Token types for syntax highlighting and parsing */
export type TokenType = "action" | "tag" | "date" | "text";

/**
 * Represents a single token extracted from user input.
 * Tokens are used for syntax highlighting in the input field.
 */
export interface Token {
  /** The semantic type of this token */
  type: TokenType;
  /** The normalized/processed value (e.g., tag without #) */
  value: string;
  /** Original text as typed by user */
  raw: string;
  /** Start position in the input string */
  start: number;
  /** End position in the input string */
  end: number;
}

/**
 * Result of parsing a command input string.
 * Contains the detected action, extracted metadata, and tokens for highlighting.
 */
export interface ParsedCommand {
  /** The final detected action (last keyword wins, default: 'add') */
  action: ActionType;
  /** All tokens for syntax highlighting */
  tokens: Token[];
  /** Full text content (keywords included, non-destructive) */
  content: string;
  /** Extracted hashtags (without # prefix) */
  tags: string[];
  /** Original unmodified input */
  rawInput: string;
}

/**
 * Interface for command parser implementations.
 * Allows swapping between regex-based and AI-based parsing.
 */
export interface CommandParser {
  parse(input: string): ParsedCommand;
}
