import React, { useEffect, useState } from 'react';
import styles from './RuleEditer.module.css';
import { RuleData } from '../RuleCreater/RuleCreater';

export interface RuleEditerProps {
    rule: RuleData;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: RuleData) => void;
    onDelete: (id: string) => void;
}

export function RuleEditer({ rule, isOpen, onClose, onSave, onDelete }: RuleEditerProps) {
    const [name, setName] = useState(rule.name);
    const [description, setDescription] = useState(rule.description);

    useEffect(() => {
        setName(rule.name);
        setDescription(rule.description);
    }, [rule]);

    const isChanged =
        name.trim() !== rule.name ||
        description.trim() !== rule.description;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave({ id: rule.id, name: name.trim(), description: description.trim() });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalBox}>
                <h2 className={styles.modalTitle}>Правило {rule.id}</h2>
                <button className={styles.close} onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Введите название"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="description">Description</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Введите описание правила"
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            className={styles.submit}
                            disabled={!isChanged}
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            className={styles.delete}
                            onClick={() => onDelete(rule.id)}
                        >
                            Удалить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}