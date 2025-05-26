import { useState } from 'react';
import { RuleCreater, RuleData } from '../RuleCreater/RuleCreater';
import RuleTableElement from '../RuleTableElement/RuleTableElement';
import { RuleEditer } from '../RuleEditer/RuleEditer';
import styles from "./RulePanel.module.css";
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function RulePanel() {
    const [isCreatingModalOpen, setCreatingModalOpen] = useState(false);
    const [isEditingModalOpen, setEditingModalOpen] = useState(false);
    const [items, setItems] = useLocalStorage<RuleData[]>('rules', []);
    const [editedRule, setEditedRule] = useState<RuleData>({
        id: '',
        name: '',
        description: ''
    });

    const handleSave = (data: RuleData) => {
        setItems(prev => [...prev, data]);
        setCreatingModalOpen(false);
    };

    const handleSaveChanged = (data: RuleData) => {
        setItems(prev =>
            prev.map(item =>
                item.id === data.id
                    ? { ...item, name: data.name, description: data.description }
                    : item
            )
        );
        setEditingModalOpen(false);
    };

    const handleDelete = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
        setEditingModalOpen(false);
    };

    return (
        <div className="panel">
            <div className={styles.tableHeader}>
                <div><span>id</span></div>
                <div><span>name</span></div>
                <div><span>description</span></div>
                <button className="create-btn" onClick={() => setCreatingModalOpen(true)}>
                    Создать
                </button>
            </div>

            <RuleCreater
                isOpen={isCreatingModalOpen}
                onClose={() => setCreatingModalOpen(false)}
                onSave={handleSave}
            />

            <div className={styles.tableBody}>
                {items.map(item => (
                    <RuleTableElement
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        onEdit={() => {
                            setEditedRule({
                                id: item.id,
                                name: item.name,
                                description: item.description
                            });
                            setEditingModalOpen(true)
                        }}
                    />
                ))}
            </div>
            <RuleEditer
                rule={editedRule}
                isOpen={isEditingModalOpen}
                onClose={() => setEditingModalOpen(false)}
                onSave={handleSaveChanged}
                onDelete={handleDelete}
            />
        </div>
    );
}
