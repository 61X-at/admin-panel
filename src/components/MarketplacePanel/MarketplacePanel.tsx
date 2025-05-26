import { useState } from 'react';
import { MarketplaceCreater, MarketplaceData } from '../MarketplaceCreater/MarketplaceCreater';
import styles from "./MarketplacePanel.module.css";
import MarketplaceTableElement from '../MarketplaceTableElement/MarketplaceTableElement';
import { MarketplaceEditer } from '../MarketplaceEditer/MarketplaceEditer';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function MarketplacePanel() {
    const [isCreatingModalOpen, setCreatingModalOpen] = useState(false);
    const [isEditingModalOpen, setEditingModalOpen] = useState(false);
    const [items, setItems] = useLocalStorage<MarketplaceData[]>('markets', []);
    const [editedMarketplace, setEditedMarketplace] = useState<MarketplaceData>({
        id: '',
        name: '',
        urlDomain: '',
        rules: []
    });

  const handleSave = (data: MarketplaceData) => {
      setItems(prev => [...prev, data]);
      setCreatingModalOpen(false);
  };

  const handleDeleteMarketplace = (id: string) => {
    setItems(prev => prev.filter(m => m.id !== id));
    setEditingModalOpen(false);
  };

  const handleSaveChanged = (data: MarketplaceData) => {
    setItems(prev =>
      prev.map(item =>
        item.id === data.id
          ? { ...item, name: data.name, urlDomain: data.urlDomain, rules: data.rules }
          : item
      )
    );
    setEditingModalOpen(false);
  };

  const handleBindRule = (id: string) => {
    console.log('Привязать правило к маркетплейсу:', id);
  };

  return (
      <div className="panel">
        <div className={styles.tableHeader}>
            <div><span>id</span></div>
            <div><span>name</span></div>
              <div><span>urlDomain</span></div>
              <button className="create-btn" onClick={() => setCreatingModalOpen(true)}>
            Создать
            </button>
        </div>

          <MarketplaceCreater
              isOpen={isCreatingModalOpen}
              onClose={() => setCreatingModalOpen(false)}
            onSave={handleSave}
            onBindRule={handleBindRule}
        />

        <div className={styles.tableBody}>
            {items.map(item => (
                <MarketplaceTableElement
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    urlDomain={item.urlDomain}
                    onEdit={() => {
                        setEditedMarketplace({
                            id: item.id,
                            name: item.name,
                            urlDomain: item.urlDomain,
                            rules: item.rules
                          });
                        setEditingModalOpen(true)
                    }}
                />
            ))}
        </div>
          <MarketplaceEditer
              marketplace={editedMarketplace}
              isOpen={isEditingModalOpen}
              onClose={() => setEditingModalOpen(false)}
              onSave={handleSaveChanged}
              onBindRule={handleBindRule}
              onDelete={handleDeleteMarketplace}
          />
      </div>
  );
}
