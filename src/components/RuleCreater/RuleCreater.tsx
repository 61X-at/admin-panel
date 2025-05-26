import React, { useState, useEffect } from 'react';
import styles from "./RuleCreater.module.css";

export interface RuleData {
    id: string;
    name: string;
    description: string;
}

export interface RuleCreaterProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: RuleData) => void;
}

export function RuleCreater({ isOpen, onClose, onSave }: RuleCreaterProps) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen) {
            setId(crypto.randomUUID());
            setName('');
            setDescription('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave({ id, name: name.trim(), description: description.trim() });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalBox}>
                <h2 className={styles.modalTitle}>Правило {id}</h2>
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
                        <button type="submit" className={styles.submit}>Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
}