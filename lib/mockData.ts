import type { Entry } from "./supabase";

// Helper to generate dates
const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const mockEntries: Entry[] = [
  {
    id: "1",
    user_id: "user-1",
    content: "Call mom about Christmas dinner plans - she mentioned wanting to try that new recipe",
    created_at: daysAgo(0),
    updated_at: daysAgo(0),
    archived: false,
  },
  {
    id: "2",
    user_id: "user-1",
    content: "https://github.com/software-mansion/react-native-reanimated - check the new shared element transitions API",
    created_at: daysAgo(1),
    updated_at: daysAgo(1),
    archived: false,
  },
  {
    id: "3",
    user_id: "user-1",
    content: "App idea: A plant watering reminder that uses weather data to adjust schedules automatically",
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
    archived: false,
  },
  {
    id: "4",
    user_id: "user-1",
    content: "Buy groceries: avocados, sourdough bread, olive oil, parmesan, cherry tomatoes",
    created_at: daysAgo(2),
    updated_at: daysAgo(2),
    archived: false,
  },
  {
    id: "5",
    user_id: "user-1",
    content: "The best time to plant a tree was 20 years ago. The second best time is now.",
    created_at: daysAgo(3),
    updated_at: daysAgo(3),
    archived: false,
  },
  {
    id: "6",
    user_id: "user-1",
    content: "Meeting notes: Q1 roadmap discussion - focus on mobile-first, defer desktop app to Q2",
    created_at: daysAgo(4),
    updated_at: daysAgo(3),
    archived: false,
  },
  {
    id: "7",
    user_id: "user-1",
    content: "Book recommendation from Alex: 'Thinking, Fast and Slow' by Daniel Kahneman",
    created_at: daysAgo(5),
    updated_at: daysAgo(5),
    archived: false,
  },
  {
    id: "8",
    user_id: "user-1",
    content: "Dentist appointment - January 15th at 2pm, Dr. Martinez",
    created_at: daysAgo(6),
    updated_at: daysAgo(6),
    archived: false,
  },
  {
    id: "9",
    user_id: "user-1",
    content: "Song stuck in my head: 'Everything In Its Right Place' - Radiohead. Add to playlist later",
    created_at: daysAgo(7),
    updated_at: daysAgo(7),
    archived: false,
  },
  {
    id: "10",
    user_id: "user-1",
    content: "Password for wifi at the coffee shop: CaffeineRush2025!",
    created_at: daysAgo(8),
    updated_at: daysAgo(8),
    archived: false,
  },
  {
    id: "11",
    user_id: "user-1",
    content: "Research vector databases: Pinecone vs Weaviate vs pgvector - which one for side project?",
    created_at: daysAgo(10),
    updated_at: daysAgo(9),
    archived: false,
  },
  {
    id: "12",
    user_id: "user-1",
    content: "Gift idea for Sarah's birthday: that ceramic mug set she liked at the market",
    created_at: daysAgo(12),
    updated_at: daysAgo(12),
    archived: true,
  },
];
