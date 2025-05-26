import React, { useState, useEffect } from 'react';
import styles from './MarketplaceCreater.module.css';
import { RuleData } from '../RuleCreater/RuleCreater';
import { RuleMarketplaceItem } from '../RuleMarketplaceElement/RuleMarketplaceItem';

export interface MarketplaceData {
    id: string;
    name: string;
    urlDomain: string;
    rules: RuleData[];
}

export interface MarketplaceCreaterProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: MarketplaceData) => void;
    onBindRule?: (id: string) => void;
}

export function MarketplaceCreater({ isOpen, onClose, onSave }: MarketplaceCreaterProps) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [urlDomain, setUrlDomain] = useState('');
    const [rules, setRules] = useState<RuleData[]>([]);

    useEffect(() => {
        if (isOpen) {
            setId(crypto.randomUUID());
            setName('');
            setUrlDomain('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSave({ id, name: name.trim(), urlDomain: urlDomain.trim(), rules: rules });
        onClose();
    };

    const handleAddRule = () => {
        const mock: RuleData = {
            id: crypto.randomUUID(),
            name: 'Пример правила',
            description: 'Описание примера',
        };
        setRules(prev => [...prev, mock]);
    };

    const handleRemoveRule = (ruleId: string) => {
        setRules(prev => prev.filter(r => r.id !== ruleId));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalBox}>
                <h2 className={styles.modalTitle}>Маркетплейс {id}</h2>
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
                        <label htmlFor="urlDomain">Url Domain</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="urlDomain"
                            value={urlDomain}
                            onChange={e => setUrlDomain(e.target.value)}
                            placeholder="Введите url маркетплейса"
                            required
                        />
                    </div>

                    {rules.length > 0 && (
                        <div className={styles.ruleList}>
                            <label htmlFor="rulesList">Rules list</label>
                            {rules.map(r => (
                                <RuleMarketplaceItem
                                    key={r.id}
                                    {...r}
                                    onRemove={handleRemoveRule}
                                />
                            ))}
                        </div>
                    )}

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submit}>Создать</button>
                        <button
                            type="button"
                            className={styles.bindRule}
                            onClick={handleAddRule}
                        >
                            Привязать правило
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}