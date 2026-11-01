"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type AudioContextWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};

/** A very soft, locally-generated tanpura-like drone; it never starts without a click. */
export function useAmbientAudio() {
  const contextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const gainRef = useRef<GainNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    const context = contextRef.current;
    const gain = gainRef.current;
    const nodesToStop = [...nodesRef.current];
    nodesRef.current = [];
    if (context && gain) {
      const now = context.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setTargetAtTime(0, now, 0.12);
      window.setTimeout(() => {
        nodesToStop.forEach((node) => {
          try {
            node.stop();
          } catch {
            // An oscillator can already have stopped during unmount.
          }
        });
        void context.close();
        if (contextRef.current === context) contextRef.current = null;
        if (gainRef.current === gain) gainRef.current = null;
      }, 500);
      contextRef.current = null;
      gainRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const start = useCallback(async () => {
    const Context = window.AudioContext ?? (window as AudioContextWindow).webkitAudioContext;
    if (!Context || contextRef.current) return;

    const context = new Context();
    contextRef.current = context;
    await context.resume();

    const master = context.createGain();
    master.gain.setValueAtTime(0, context.currentTime);
    master.gain.setTargetAtTime(0.075, context.currentTime, 0.8);
    master.connect(context.destination);
    gainRef.current = master;

    [73.42, 146.83, 220].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const voiceGain = context.createGain();
      oscillator.type = index === 2 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      voiceGain.gain.value = index === 2 ? 0.12 : 0.22;
      oscillator.connect(voiceGain);
      voiceGain.connect(master);
      oscillator.start();
      nodesRef.current.push(oscillator);
    });

    setIsPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      void start();
    }
  }, [isPlaying, start, stop]);

  useEffect(() => () => {
    nodesRef.current.forEach((node) => {
      try {
        node.stop();
      } catch {
        // Ignore nodes that have already stopped.
      }
    });
    if (contextRef.current) void contextRef.current.close();
  }, []);

  return { isPlaying, toggle };
}
