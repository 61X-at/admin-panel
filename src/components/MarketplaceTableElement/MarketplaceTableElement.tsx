import styles from  "./MarletplaceTableElement.module.css"

interface Props {
    id: string
    name: string
    urlDomain: string
    onEdit: () => void
}

export default function MarletplaceTableElement({ id, name, urlDomain, onEdit }: Props) {
    return (
        <>
            <div className={styles.tableItem}>
                <div>
                    <span>{id}</span>
                </div>
                <div>
                    <span>{name}</span>
                </div>
                <div className={styles.urlDomainCell}>
                    <span>{urlDomain}</span>
                </div>
                <button className="edit-btn" onClick={onEdit}>Изменить</button>
            </div>
        </>
    );
}
