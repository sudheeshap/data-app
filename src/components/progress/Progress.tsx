import styles from './Progress.module.scss';

interface ProgressProps {
  percentage: number;
}

const Progress = ({ percentage }: ProgressProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        {percentage > 0 && percentage < 100 && `Uploading ${percentage}%`}
        {percentage === 100 && 'Upload complete!'}
      </div>
      <div className={styles.container}>
        <div
          className={styles.progress}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
