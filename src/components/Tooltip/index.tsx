import styles from './styles.module.scss';

interface WarningProps {
  label?: string;
  isVisible: boolean;
}

export const Tooltip = ({ label, isVisible }: WarningProps) => {
  return (
    <div 
      className={`${styles.container} ${isVisible && 'fadeIn'}`}
      style={isVisible ? { opacity: 1 } : { opacity: 0 }}
    > 
      {label ? (
        <span>{label}</span>
      ) : (
        <span>Ops...tente novamente!</span>
      )}
    </div>
  );
}