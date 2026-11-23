import { useState } from "react";

type Notification = {
    id: number;
    title: string;
    description: string;
    read: boolean;
}

function Notifications (){
    const [data, updateData] = useState<Notification[]>([
        {id:75, title: 'Статус Изменен', description: 'На проверка', read: false},
        {id:76, title: 'Отправлен ответ', description: 'Студент отправил КТ', read: false},
        {id:77, title: 'Технические работы', description: 'Ожидаются перебои', read: false},
    ])

    const handleReadAllClick = () => {
        updateData(state => {
            return state.map(item => ({...item, read: true}));
        });
    }

    const handleReadClick = (id: number) => {
        updateData(state => {
            return state.map(item =>
                item.id === id ? { ...item, read: true } : item
            );
        });
    }

    return(
        <article>
            <h3>Уведомления</h3>
            <section>
                {data.map(({ id, title, description, read }) => (
                    <section key={id}>
                        <h4>{title}</h4>
                        <p>{description}</p>
                        {!read && <button onClick={() => handleReadClick(id)}>Закрыть</button>}
                    </section>
                ))}
            </section>
            <button onClick={handleReadAllClick}>Отметить прочитанным</button>
        </article>
    )
}

export default function NotificationsPage() {
    return (
        <>
            <Notifications />
        </>
    )
}