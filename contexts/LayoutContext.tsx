/**
 * LayoutContext - Manages shared layout state for animated transitions
 * between stack and grid views across tabs.
 */

import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import {
  useSharedValue,
  withTiming,
  Easing,
  type SharedValue,
  type EasingFunction,
} from "react-native-reanimated";

export type ViewLayout = "stack" | "grid";

interface LayoutContextType {
  /** Current layout mode */
  layout: ViewLayout;
  /** Animation progress (0 = stack, 1 = grid) */
  progress: SharedValue<number>;
  /** Transition to grid layout */
  toGrid: () => void;
  /** Transition to stack layout */
  toStack: () => void;
  /** Get staggered delay for a card at given index */
  getStaggerDelay: (index: number) => number;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

// Animation configuration
const ANIMATION_CONFIG = {
  duration: 400,
  staggerMs: 40,
  maxStagger: 200,
};

// Easing for grid explode animation — fast burst, smooth landing
function getAnimationEasing(): EasingFunction {
  return Easing.bezier(0.16, 1, 0.3, 1); // Apple-style spring curve
}

interface LayoutProviderProps {
  children: ReactNode;
  initialLayout?: ViewLayout;
}

export function LayoutProvider({
  children,
  initialLayout = "stack",
}: LayoutProviderProps) {
  const [layout, setLayout] = useState<ViewLayout>(initialLayout);
  const progress = useSharedValue(initialLayout === "grid" ? 1 : 0);

  const getStaggerDelay = useCallback((index: number): number => {
    return Math.min(index * ANIMATION_CONFIG.staggerMs, ANIMATION_CONFIG.maxStagger);
  }, []);

  const toGrid = useCallback(() => {
    setLayout((current) => {
      if (current === "grid") return current;
      progress.value = withTiming(1, {
        duration: ANIMATION_CONFIG.duration,
        easing: getAnimationEasing(),
      });
      return "grid";
    });
  }, [progress]);

  const toStack = useCallback(() => {
    setLayout((current) => {
      if (current === "stack") return current;
      progress.value = withTiming(0, {
        duration: ANIMATION_CONFIG.duration,
        easing: getAnimationEasing(),
      });
      return "stack";
    });
  }, [progress]);

  return (
    <LayoutContext.Provider
      value={{
        layout,
        progress,
        toGrid,
        toStack,
        getStaggerDelay,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout(): LayoutContextType {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}
