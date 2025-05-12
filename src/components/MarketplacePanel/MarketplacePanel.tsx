import { useState } from 'react';
import { MarketplaceAdder, MarketplaceData } from '../MarketplaceAdder/MarketplaceAdder';
import styles from "./MarketplacePanel.module.css";
import MarketplaceTableElement from '../MarketplaceElement/MarketplaceTableElement';

export default function MarketplacePanel() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [items, setItems] = useState<MarketplaceData[]>([]);

  const handleSave = (data: MarketplaceData) => {
      setItems(prev => [...prev, data]);
      setModalOpen(false);
  };

  const handleBindRule = (id: string) => {
    console.log('Привязать правило к маркетплейсу:', id);
  };

  return (
      <div className="panel">
        <div className={styles.tableHeader}>
            <div><span>id</span></div>
            <div><span>name</span></div>
            <div><span>description</span></div>
            <button className="create-btn" onClick={() => setModalOpen(true)}>
            Создать
            </button>
        </div>

        <MarketplaceAdder
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            onBindRule={handleBindRule}
        />

        <div className={styles.tableBody}>
            {items.map(item => (
                <MarketplaceTableElement
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    onEdit={() => console.log('Редактировать', item.id)}
                />
            ))}
        </div>
      </div>
  );
}
