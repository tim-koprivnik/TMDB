'use client';

import { useRef, useEffect, FC } from 'react';
import styles from './UserScore.module.scss';

interface UserScoreProps {
  score?: number;
  small?: boolean;
}

const UserScore: FC<UserScoreProps> = ({ score = 0, small = false }) => {
  const userScore = (score / 10) * 100;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const getBarColor = (currentScore: number) => {
      if (currentScore > 70) {
        return '#21D07A';
      }
      if (currentScore < 20) {
        return '#DB2360';
      }
      return '#d2d531';
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const trackColor = '#423d0f';
    const barColor = getBarColor(userScore);
    const lineWidth = 8;

    const drawProgress = (
      context: CanvasRenderingContext2D,
      centerX: number,
      centerY: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      color: string
    ) => {
      context.beginPath();
      context.arc(centerX, centerY, radius, startAngle, endAngle, false);
      context.lineWidth = lineWidth;
      context.strokeStyle = color;
      context.stroke();
    };

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - lineWidth / 2;
    const startAngle = -Math.PI / 2;
    const endAngle = 2 * Math.PI * (userScore / 100) - Math.PI / 2;

    drawProgress(ctx, centerX, centerY, radius, 0, 2 * Math.PI, trackColor);
    drawProgress(ctx, centerX, centerY, radius, startAngle, endAngle, barColor);
  }, [userScore]);

  return (
    <div className={`${styles.chart} ${small ? styles.small : ''}`}>
      <div className={`${styles.consensus} ${styles.details}`}>
        <div className={styles['outer-ring']}>
          <div className={styles['user-score-chart']}>
            <div className={styles.percent}>
              <div>{Math.round(userScore)}</div>
              <span>%</span>
            </div>
            <canvas
              ref={canvasRef}
              height="120"
              width="120"
              style={{ height: '60px', width: '60px' }}
            />
          </div>
        </div>
      </div>
      <div className={styles.text}>
        User
        <br />
        Score
      </div>
    </div>
  );
};

export default UserScore;
