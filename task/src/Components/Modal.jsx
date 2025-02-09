import { useState, useContext } from "react"; // Импорт необходимых хуков
import { AppContext } from "../App"; // Импорт контекста для использования глобального состояния

const Modal = ({ deleteCard, updateCard, cartUpdateObject, setCartUpdateObject }) => {
  // Состояние для управления видимостью формы
  const [formVisible, setFormVisible] = useState(false);

  // Извлечение стейтов из контекста
  const { deleteCardFlagModal, setDeleteCardFlagModal, visibilityModal, setVisibilityModal, deleteCardFlag, setDelCardFlag, updateCardFlagModal, setUpdateCardFlagModal, updateCardFlag, id, setId, setUpdateOpened, setDeleteOpened } = useContext(AppContext);

  // Создание объекта из формы для обновления карточки
  const handleChange = (e) => {
    setCartUpdateObject({
      ...cartUpdateObject,
      id: id,
      [e.target.name]: e.target.value
    });
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setVisibilityModal(false); // Скрываем модальное окно
    updateCard(id); // Устанавливаем флаг обновления карточки
    setFormVisible(false);//Для того, чтобы форма скрылась
    setId('');//Обнуление ID
    setUpdateCardFlagModal(false);//Изменение значения для флага обновления
    /*Скрываем обе кнопки*/
    setDeleteOpened(false);
    setUpdateOpened(false);
  };

  return (
    <div className={visibilityModal ? 'visibleModal' : 'disabledModal'}>
      {/* Если флаг удаления карточки установлен, отображаем кнопки */}
      {deleteCardFlagModal ? (
        <div className="modal">
          <p class="modal__message">Вы действительно хотите удалить карточку?</p>
          <div class="modal__options">
            <button className="modal__btn"
              onClick={() => {
                setVisibilityModal(false); // Закрываем модальное окно
                // setDelCardFlag(true); // Устанавливаем флаг удаления карточки
                deleteCard(id);
                setDeleteCardFlagModal(false); // Скрываем блок для удаления
                setId('');
                setUpdateOpened(false);
                setDeleteOpened(false);
              }}
            >
              Да
            </button>
            <button className="modal__btn"
              onClick={() => {
                setDeleteCardFlagModal(false); // Меняем значение флага для удаления на первоначальное
                setVisibilityModal(false); // Закрываем модальное окно
                setDeleteOpened(false);
                setUpdateOpened(false);
              }}
            >
              Нет
            </button>
          </div>
        </div>
      ) : (null)}

      {/* Если флаг обновления установлен и форма не видима, отображаем кнопки*/}
      {updateCardFlagModal && !formVisible ? (
        <div className="modal">
          <p class="modal__message">Вы действительно хотите обновить карточку?</p>
          <div class="modal__options">
            <button className="modal__btn"
              onClick={() => {
                setUpdateCardFlagModal(false); // Скрываем кнопки
                setFormVisible(true); // Флаг для показа формы
                setDeleteOpened(false);
                setUpdateOpened(false);
              }}
            >
              Да
            </button>
            <button className="modal__btn"
              onClick={() => {
                setVisibilityModal(false); // Закрываем модальное окно
                setUpdateCardFlagModal(false); // Скрываем флаг обновления
                setDeleteOpened(false);
                setUpdateOpened(false);
              }}
            >
              Нет
            </button>
          </div>

        </div>
      ) : (null)}

      {/* Если форма видима, отображаем поля ввода */}
      {formVisible ? (
        <div className="form-wrapper">
          <h1>Обновить</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-wrapper__form_item">
              <input
                type='text'
                id='title'
                value={cartUpdateObject.title}
                onChange={handleChange}
                name="title"
                placeholder="Название"
              />
            </div>

            <div className="form-wrapper__form_item">
              <input
                type='text'
                id='description'
                value={cartUpdateObject.description}
                onChange={handleChange}
                name="description"
                placeholder="Описание"
              />
            </div>
            <div className="form-wrapper__form_item">
              <input
                type='time'
                id='date'
                value={cartUpdateObject.date}
                onChange={handleChange}
                name="date"
              />
            </div>
            <div className="form-wrapper__form_item">
              <input
                type='date'
                id='time'
                value={cartUpdateObject.time}
                onChange={handleChange}
                name="time"
              />
            </div>
            <div className="form-wrapper__form_item">
              <input
                type='text'
                id='photo'
                value={cartUpdateObject.photo}
                onChange={handleChange}
                name="photo"
                placeholder="Ссылка на фото"
              />
            </div>
            <div className="form-wrapper__button"> <button type="submit">Обновить</button> </div>
          </form>
        </div>

      ) : (null)}
    </div>
  );
};

export default Modal;
