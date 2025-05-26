import { RuleData } from '../RuleCreater/RuleCreater';
import styles from './RuleMarketplaceItem.module.css';

interface RuleMarketplaceItemProps extends RuleData {
    onRemove: (id: string) => void;
}

export function RuleMarketplaceItem({ id, name, description, onRemove }: RuleMarketplaceItemProps) {
    return (
        <div className={styles.ruleItem}>
            <div className={styles.info}>
                <div className={styles.title}>
                    <span className={styles.label}>ID:</span> {id}
                </div>
                <div className={styles.title}>
                    <span className={styles.label}>Name:</span> {name}
                </div>
                <div className={styles.desc}>
                    <span className={styles.label}>Desc:</span> {description}
                </div>
            </div>
            <button
                className={styles.removeBtn}
                onClick={() => onRemove(id)}
                aria-label="Удалить правило"
            >
                ×
            </button>
        </div>
    );
}
