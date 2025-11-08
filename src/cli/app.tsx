import { Box, Newline, Text, useApp, useInput, useStdout } from 'ink';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';

import { catalog } from '../katas/catalog.js';
import type { Difficulty, Kata } from '../katas/index.js';

const filterOptions: Array<Difficulty | 'all'> = [
  'all',
  'beginner',
  'intermediate',
  'advanced',
] as const;

// Color scheme hierarchy
const COLORS = {
  beginner: '#4ade80', // green
  intermediate: '#60a5fa', // blue
  advanced: '#f472b6', // pink
  header: '#fbbf24', // amber
  dim: 'gray',
  accent: '#a78bfa', // purple
  success: '#34d399',
} as const;

// Subtle ASCII art
const LOGO = `
╔══════════════════════════════════╗
║   ⚡ TypeScript Mastery Katas   ║
╚══════════════════════════════════╝`;

const PROGRESS_FILE = path.join(os.homedir(), '.ts-mastery-progress.json');

interface Progress {
  completed: Record<string, boolean>;
}

const loadProgress = (): Progress => {
  try {
    const data = fs.readFileSync(PROGRESS_FILE, 'utf-8');
    return JSON.parse(data) as Progress;
  } catch {
    return { completed: {} };
  }
};

const saveProgress = (progress: Progress): void => {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
  } catch {
    // Silently fail - progress tracking is optional
  }
};

const formatFilterLabel = (value: Difficulty | 'all'): string =>
  value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1);

const getDifficultyColor = (difficulty: Difficulty): string => {
  return COLORS[difficulty];
};

const getDifficultySymbol = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'beginner':
      return '◆';
    case 'intermediate':
      return '◈';
    case 'advanced':
      return '◉';
  }
};

// Memoized KataListItem component to prevent unnecessary re-renders
interface KataListItemProps {
  kata: Kata;
  isSelected: boolean;
  isCompleted: boolean;
}

const KataListItem = memo<KataListItemProps>(({ kata, isSelected, isCompleted }) => {
  const diffColor = getDifficultyColor(kata.difficulty);
  const symbol = getDifficultySymbol(kata.difficulty);

  return (
    <Box marginY={0} flexDirection="row">
      <Box flexShrink={0}>
        <Text color={diffColor}>{symbol} </Text>
      </Box>
      <Box flexGrow={1}>
        {isSelected ? (
          <Text color={diffColor} bold>
            {'▸ '}
            {kata.title}
          </Text>
        ) : (
          <Text dimColor>
            {'  '}
            {kata.title}
          </Text>
        )}
      </Box>
      {isCompleted && (
        <Box flexShrink={0}>
          <Text color={COLORS.success}> ✓</Text>
        </Box>
      )}
    </Box>
  );
});

KataListItem.displayName = 'KataListItem';

// Memoized KataDetails component to prevent unnecessary re-renders
interface KataDetailsProps {
  kata: Kata;
  isCompleted: boolean;
  detailsWidth: number;
  detailsHeight: number;
}

const KataDetails = memo<KataDetailsProps>(({ kata, isCompleted, detailsWidth, detailsHeight }) => {
  const diffColor = getDifficultyColor(kata.difficulty);
  const symbol = getDifficultySymbol(kata.difficulty);

  return (
    <Box
      flexDirection="column"
      width={detailsWidth}
      height={detailsHeight}
      minHeight={detailsHeight}
      borderStyle="round"
      borderColor={diffColor}
      paddingX={1}
      paddingY={1}
      overflow="hidden"
    >
      <Box marginBottom={1}>
        <Text color={diffColor} bold>
          {symbol} {kata.title}
        </Text>
        {isCompleted && <Text color={COLORS.success}> ✓ Completed</Text>}
      </Box>

      <Text>{kata.summary}</Text>
      <Newline />

      <Box>
        <Text color={diffColor}>{kata.difficulty}</Text>
        <Text dimColor> · </Text>
        <Text color={COLORS.accent}>{kata.estimatedTime}</Text>
      </Box>

      <Box marginTop={1}>
        <Text dimColor>Topics: </Text>
        <Text>{kata.topics.join(' · ')}</Text>
      </Box>

      <Newline />
      <Text bold color={COLORS.header}>
        ⚡ Objectives
      </Text>
      {kata.objectives.map((objective, index) => (
        <Box key={`${kata.id}-objective-${index}`} paddingLeft={2}>
          <Text dimColor>
            {index + 1}. {objective}
          </Text>
        </Box>
      ))}

      <Newline />
      <Text bold color={COLORS.header}>
        💡 Tips
      </Text>
      {kata.tips.map((tip, index) => (
        <Box key={`${kata.id}-tip-${index}`} paddingLeft={2}>
          <Text dimColor>• {tip}</Text>
        </Box>
      ))}

      <Newline />
      <Box borderStyle="single" borderColor={COLORS.dim} paddingX={1}>
        <Text color={COLORS.accent}>▸ </Text>
        <Text dimColor>pnpm tsx {kata.entry.replace('./', '')}</Text>
      </Box>
    </Box>
  );
});

KataDetails.displayName = 'KataDetails';

export const App: React.FC = () => {
  const { exit } = useApp();
  const { stdout } = useStdout();
  const [filterIndex, setFilterIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState<Progress>(loadProgress);

  const activeFilter = filterOptions[filterIndex];

  const filteredKatas = useMemo(() => {
    if (activeFilter === 'all') {
      return catalog;
    }

    return catalog.filter((kata) => kata.difficulty === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [activeFilter]);

  const selectedKata: Kata | undefined = filteredKatas[selectedIndex];

  const toggleComplete = useCallback(() => {
    if (!selectedKata) return;

    const newProgress = {
      ...progress,
      completed: {
        ...progress.completed,
        [selectedKata.id]: !progress.completed[selectedKata.id],
      },
    };
    setProgress(newProgress);
    saveProgress(newProgress);
  }, [selectedKata, progress]);

  useInput((input, key) => {
    if (input?.toLowerCase() === 'q' || key.escape) {
      exit();
      return;
    }

    if (!filteredKatas.length) {
      return;
    }

    if (key.downArrow || input === 'j') {
      setSelectedIndex((current) => (current + 1) % filteredKatas.length);
      return;
    }

    if (key.upArrow || input === 'k') {
      setSelectedIndex((current) => (current - 1 + filteredKatas.length) % filteredKatas.length);
      return;
    }

    if (key.rightArrow || input === 'd') {
      setFilterIndex((current) => (current + 1) % filterOptions.length);
      return;
    }

    if (key.leftArrow || input === 'a') {
      setFilterIndex((current) => (current - 1 + filterOptions.length) % filterOptions.length);
      return;
    }

    if (input === 'c' || input === ' ') {
      toggleComplete();
    }
  });

  // Calculate terminal dimensions for responsive layout
  const { useVerticalSplit, listWidth, detailsWidth, detailsHeight } = useMemo(() => {
    const width = stdout?.columns || 120;
    const height = stdout?.rows || 40;
    const vertical = width >= 100;
    const lWidth = vertical ? Math.floor(width * 0.45) : width;
    const dWidth = vertical ? width - lWidth - 4 : width; // -4 for gaps and borders
    const headerHeight = 10;
    const dHeight = Math.max(25, height - headerHeight);

    return {
      useVerticalSplit: vertical,
      listWidth: lWidth,
      detailsWidth: dWidth,
      detailsHeight: dHeight,
    };
  }, [stdout?.columns, stdout?.rows]);

  // Calculate progress stats
  const { completedCount, progressPercentage } = useMemo(() => {
    const totalKatas = catalog.length;
    const completed = Object.values(progress.completed).filter(Boolean).length;
    const percentage = Math.round((completed / totalKatas) * 100);

    return {
      completedCount: completed,
      progressPercentage: percentage,
    };
  }, [progress.completed]);

  const totalKatas = catalog.length;

  const instructions = '↑/↓: navigate · ←/→: filter · Space: mark done · Q: quit';

  const filterLine = useMemo(
    () =>
      filterOptions
        .map((value, index) => {
          const label = formatFilterLabel(value);
          if (index === filterIndex) {
            return `▸ ${label}`;
          }
          return `  ${label}`;
        })
        .join('  '),
    [filterIndex],
  );

  return (
    <Box flexDirection="column">
      {/* Header */}
      <Text color={COLORS.header}>{LOGO}</Text>
      <Box marginTop={1} marginBottom={1}>
        <Text dimColor>{instructions}</Text>
      </Box>

      {/* Progress Bar */}
      <Box marginBottom={1}>
        <Text color={COLORS.accent}>
          Progress: {completedCount}/{totalKatas} ({progressPercentage}%)
        </Text>
        <Text dimColor> {'█'.repeat(Math.floor(progressPercentage / 5))}</Text>
        <Text dimColor>{'░'.repeat(20 - Math.floor(progressPercentage / 5))}</Text>
      </Box>

      {/* Filter */}
      <Box marginBottom={1}>
        <Text color={COLORS.dim}>{filterLine}</Text>
      </Box>

      {/* Main Content - Split Layout */}
      <Box flexDirection={useVerticalSplit ? 'row' : 'column'} gap={2}>
        {/* Left Panel: Kata List */}
        <Box
          flexDirection="column"
          width={useVerticalSplit ? listWidth : undefined}
          height={useVerticalSplit ? detailsHeight : undefined}
          borderStyle="round"
          borderColor={COLORS.dim}
          paddingX={1}
          overflow="hidden"
        >
          {filteredKatas.length === 0 ? (
            <Text dimColor>No katas for this filter.</Text>
          ) : (
            filteredKatas.map((kata, index) => (
              <KataListItem
                key={kata.id}
                kata={kata}
                isSelected={index === selectedIndex}
                isCompleted={progress.completed[kata.id] || false}
              />
            ))
          )}
        </Box>

        {/* Right Panel: Details */}
        {selectedKata && (
          <KataDetails
            kata={selectedKata}
            isCompleted={progress.completed[selectedKata.id] || false}
            detailsWidth={detailsWidth}
            detailsHeight={detailsHeight}
          />
        )}
      </Box>
    </Box>
  );
};
