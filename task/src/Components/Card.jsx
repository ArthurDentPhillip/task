import { useContext } from "react"; // Импортируем useState для управления состоянием компонента
import { AppContext } from "../App"; // Импорт контекста для использования глобального состояния

function Card({ title, description, date, time, photo, id }) {
    //Используем контекст для доступа к переменным
    const { setDeleteCardFlagModal, setVisibilityModal, setUpdateCardFlagModal, setId, updateOpened, setUpdateOpened, deleteOpened, setDeleteOpened } = useContext(AppContext);
    return (
        <div className="col-6 card">
            {/* Отображаем карточки */}
            <img src={photo} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
            <p><span>{date}/{time}</span></p>

            <div className="col-12 card__button-block">
                {/* Кнопка для удаления карточки */}
                <button className="card__button" onClick={() => {
                    if (!deleteOpened) {
                        setDeleteCardFlagModal(true); // Устанавливаем флаг для модального окна удаления
                        setId(id) //Передаем ID
                        setVisibilityModal(true); // Показываем модальное окно
                        setUpdateOpened(true);//Устанавливаем флаг для того, чтобы нельзя было открыть модальное окно второй кнопкой
                    }

                }}>Удаление</button>

                {/* Кнопка для обновления карточки*/}
                <button className="card__button" onClick={() => {
                    if (!updateOpened) {
                        setUpdateCardFlagModal(true); // Устанавливаем флаг для модального окна обновления
                        setId(id)//Передаем ID
                        setVisibilityModal(true); // Показываем модальное окно
                        setDeleteOpened(true);//Устанавливаем флаг для того, чтобы нельзя было открыть модальное окно второй кнопкой
                    }

                }}>Обновление</button>
            </div>
        </div>
    );
}

export default Card;
