import { ReactNode } from 'react';

import styles from './Panel.module.css';

interface PanelProps {
  children: ReactNode;
}

const Panel = ({ children }: PanelProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default Panel;
