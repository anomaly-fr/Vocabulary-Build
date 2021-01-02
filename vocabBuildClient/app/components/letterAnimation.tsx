import { makeStyles } from '@material-ui/core';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { Theme } from '../constants/theme';

export default function WordAnimation() {
  const theme = Theme;
  const ref = useRef([]);
  const [items, set] = useState([]);
  const transitions = useTransition(items, null, {
    from: {
      opacity: 0,
      height: 0,
      innerHeight: 0,
      transform: 'perspective(600px) rotateX(0deg)',
      color: theme.palette.primary.dark
    },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: theme.palette.primary.light },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [
      { color: theme.palette.primary.main },
      { innerHeight: 0 },
      { opacity: 0, height: 0 },
    ],
    update: { color: theme.palette.primary.dark },
  });

  const useStyles = makeStyles({
    items: {
      overflow: 'hidden',
      width: '100%',
      color: 'white',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontWeight: 800,
      textTransform: ' uppercase',
      // willChange: transform, opacity, height,
      whitePpace: 'nowrap',
      cursor: 'pointer',
      lineHeight: '80px',
    },
  });

  const reset = useCallback(() => {
    ref.current.map(clearTimeout);
    ref.current = [];
    set([]);
    ref.current.push(setTimeout(() => set(['Spell', 'Listen']), 2000));
    ref.current.push(setTimeout(() => set(['Score']), 2000));
    ref.current.push(setTimeout(() => set(['Spell', 'Define']), 2000));
  }, []);

  useEffect(() => void reset(), []);

  const classes = useStyles();

  return (
    <div style={{ alignItems: 'center', justifyContent: 'center' }}>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div
          className={classes.items}
          key={key}
          style={rest}
          onClick={reset}
        >
          <animated.div
            style={{
              overflow: 'hidden',
              height: innerHeight,
              fontSize: 50,
              fontWeight: 'bold',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {item}
          </animated.div>
        </animated.div>
      ))}
    </div>
  );
}
