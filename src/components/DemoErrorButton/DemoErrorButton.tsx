import { useToast } from '../Error/ErrorToast';


const mockMessages = [
    {
        code: '500',
        msg: 'внутренний сбой сервера'
    },
    {
        code: '404',
        msg: 'не найдено'
    },
    {
        code: '001',
        msg: 'Ошибка валидации: неверный формат данных'
    },
    {
        code: '000',
        msg: 'Сетевая ошибка: таймаут'
    },
    {
        code: '422',
        msg: 'правило уже существует'
    },
];

export default function DemoErrorButton() {
    const pushError = useToast();

    const resp = mockMessages[Math.floor(Math.random() * mockMessages.length)];

    const handleClick = () => {
        pushError(resp.code, resp.msg);
    };

    return (
        <button onClick={handleClick}>
            Сгенерировать мок-ошибку
        </button>
    );
 }
