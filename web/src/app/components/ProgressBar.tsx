import { Progress } from '@mantine/core';
import React from 'react';

interface ProgressBarProps {
    score: number
    numWords: number
    color: string
}

export default function ProgressBar({score, numWords, color}: ProgressBarProps) {
  return (
    <>
        <Progress color={color} radius="xs" size="xl" value={(score/numWords)*100}  transitionDuration={650} style={{flex: "1"}}/>
    </>
  );
}