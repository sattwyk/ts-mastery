import { Box, Text, useApp, useInput, Newline } from 'ink';
import React, { useEffect, useMemo, useState } from 'react';

import { catalog } from '../katas/catalog.js';
import type { Difficulty, Kata } from '../katas/index.js';

const filterOptions: Array<Difficulty | 'all'> = [
  'all',
  'beginner',
  'intermediate',
  'advanced',
] as const;

const formatFilterLabel = (value: Difficulty | 'all'): string =>
  value === 'all' ? 'All' : value.charAt(0).toUpperCase() + value.slice(1);

const highlight = (label: string): string => `> ${label}`;

export const App: React.FC = () => {
  const { exit } = useApp();
  const [filterIndex, setFilterIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

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

    if (key.return || input === ' ') {
      setShowDetails((current) => !current);
    }
  });

  const instructions = '↑/↓ move · ←/→ filter · Enter/Space toggle details · q or Esc to exit';
  const filterLine = filterOptions
    .map((value, index) => {
      const label = formatFilterLabel(value);
      return index === filterIndex ? `[${label}]` : label;
    })
    .join('   ');

  return (
    <Box flexDirection="column">
      <Text color="yellow">{instructions}</Text>
      <Text dimColor>{filterLine}</Text>

      <Box flexDirection="column" marginTop={1}>
        {filteredKatas.length === 0 ? (
          <Text>No katas for this filter.</Text>
        ) : (
          filteredKatas.map((kata, index) => (
            <Text key={kata.id} color={index === selectedIndex ? 'cyan' : undefined}>
              {index === selectedIndex ? highlight(kata.title) : `  ${kata.title}`}
              {'  '}
              <Text dimColor>
                {kata.difficulty} · {kata.topics.join(', ')}
              </Text>
            </Text>
          ))
        )}
      </Box>

      {showDetails && selectedKata && (
        <Box flexDirection="column" marginTop={1}>
          <Text color="cyan">{selectedKata.title}</Text>
          <Text>{selectedKata.summary}</Text>
          <Newline />
          <Text>
            Difficulty: {selectedKata.difficulty} · Est. Time: {selectedKata.estimatedTime}
          </Text>
          <Text>Topics: {selectedKata.topics.join(', ')}</Text>
          <Newline />
          <Text bold>Objectives</Text>
          {selectedKata.objectives.map((objective, index) => (
            <Text key={`${selectedKata.id}-objective-${index}`}>• {objective}</Text>
          ))}
          <Newline />
          <Text bold>Tips</Text>
          {selectedKata.tips.map((tip, index) => (
            <Text key={`${selectedKata.id}-tip-${index}`}>• {tip}</Text>
          ))}
          <Newline />
          <Text dimColor>Run: pnpm tsx {selectedKata.entry.replace('./', '')}</Text>
        </Box>
      )}
    </Box>
  );
};
