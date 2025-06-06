import styles from "./RuleTableElement.module.css";

interface TableElementProps {
    id: string
    name: string
    description: string
    onEdit: () => void
}

export default function MarletplaceTableElement({ id, name, description, onEdit }: TableElementProps) {
    return (
        <>
            <div className={styles.tableItem}>
                <div>
                    <span>{id}</span>
                </div>
                <div>
                    <span>{name}</span>
                </div>
                <div className={styles.descriptionCell}>
                    <span>{description}</span>
                </div>
                <button className="edit-btn" onClick={onEdit}>Изменить</button>
            </div>
        </>
    );
}
