import { useEffect, useState, createContext } from 'react'; // Импортируем необходимые хуки и методы из React
import axios from 'axios'; // Импортируем axios для работы с HTTP-запросами
import Card from './Components/Card'; // Импортируем компонент Cart для отображения карточек
import ContentLoader from "react-content-loader";//Подключение библиотеки для использования карточек предзагрузки
import Modal from './Components/Modal';
// Создаем контекст для передачи данных между компонентами
export const AppContext = createContext({});

function App() {
  // Состояние для хранения списка карточек
  const [card, setCard] = useState([]);

  // Для состояния загрузки данных с сервера
  const [isLoading, setIsLoading] = useState(true);

  //Для управления кнопками модального окна
  const [updateOpened, setUpdateOpened] = useState(false);
  const [deleteOpened, setDeleteOpened] = useState(false);

  // Состояния для управления типом действия в модальном окне
  const [deleteCardFlagModal, setDeleteCardFlagModal] = useState(false); // Флаг для окна с кнопкой удаления!!
  const [updateCardFlagModal, setUpdateCardFlagModal] = useState(false); // Флаг для окна с кнопкой обновления

  // Состояние для управления видимостью модального окна
  const [visibilityModal, setVisibilityModal] = useState(false);

  //ID для обновления
  const [id, setId] = useState('');

  // Состояние для хранения объекта, для обновления карточки
  const [cartUpdateObject, setCartUpdateObject] = useState({
    id: '',
    title: '',
    description: '',
    date: '',
    time: '',
    photo: '',
  });

  // useEffect для загрузки данных для карточек с сервера при монтировании компонента
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const cartResponce = await axios.get("http://localhost:3000/seminars");
      setIsLoading(false);
      setCard(cartResponce.data);

    }
    fetchData();
  }, []);

  // Функция для удаления карточки
  const deleteCard = (id) => {
    // Удаляем карточку на сервере
    axios.delete(`http://localhost:3000/seminars/${id}`);
    // Удаляем карточку в стейте
    setCard((prev) => prev.filter((item) => item.id !== id));
  };

  // Асинхронная функция для обновления карточки
  const updateCard = async (id) => {
    try {
      //Проверяем, пустые ли поля в обхекте
      const isAnyFieldEmpty = Object.values(cartUpdateObject).some(value => value.trim() === '');
      //Если поля не пустые
      if (!isAnyFieldEmpty) {
        //Отправляем обновленные данные на сервер
        await axios.put(`http://localhost:3000/seminars/${id}`, cartUpdateObject);

        // Обновляем карточку в стейте
        setCard((prevCart) =>
          prevCart.map((item) =>
            item.id === id ? { ...item, ...cartUpdateObject } : item
          )
        );

        //Очищаем все поля объекта
        setCartUpdateObject({
          id: '',
          title: '',
          description: '',
          date: '',
          time: '',
          photo: '',
        });
      }

    } catch (error) {
      console.error("Ошибка при обновлении данных на сервере:", error);
    }
  };

  return (
    <>
      {/* Используем контекст для передачи стейтов */}
      <AppContext.Provider value={{
        deleteCardFlagModal,
        setDeleteCardFlagModal,
        visibilityModal,
        setVisibilityModal,
        updateCardFlagModal,
        setUpdateCardFlagModal,
        id,
        setId,
        updateOpened,
        setUpdateOpened,
        deleteOpened,
        setDeleteOpened
      }}>
        <div className="container">
          <div className="row">
            {/* Проверяем, загружаются ли данные */}
            {isLoading ? (
              // Если данные еще загружаются, отображаем 100 заполнителей
              [...Array(100)].map((_, index) => (
                <div className="col-3">
                  <ContentLoader
                    key={index} // Уникальный ключ для каждого заполнителя
                    speed={2} // Скорость анимации
                    width={400} // Ширина заполнителя
                    height={160} // Высота заполнителя
                    viewBox="0 0 400 160" // Параметры области рисования
                    backgroundColor="#f3f3f3" // Цвет фона
                    foregroundColor="#ecebeb" // Цвет переднего плана
                  >
                    {/* Определяем форму заполнителя с помощью прямоугольников и кругов */}
                    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
                    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
                    <rect x="0" y="53" rx="3" ry="3" width="400" height="6" />
                    <rect x="0" y="70" rx="3" ry="3" width="370" height="6" />
                    <rect x="0" y="89" rx="3" ry="3" width="150" height="5" />
                    <circle cx="20" cy="20" r="20" /> {/* Круг для аватара или изображения */}
                  </ContentLoader>
                </div>

              ))
            ) : (
              <>
                {/*Отображаем модальное окно и передаем ему параметры*/}
                <Modal
                  deleteCard={deleteCard}
                  updateCard={updateCard}
                  cartUpdateObject={cartUpdateObject}
                  setCartUpdateObject={setCartUpdateObject} />
                {/* Если данные загружены, отображаем реальные карточки */}
                {card.map((obj) => {
                  return (
                    <Card
                      key={obj.id} // Уникальный ключ для каждой карточки
                      id={obj.id} // ID карточки
                      title={obj.title} // Заголовок карточки
                      description={obj.description} // Описание карточки
                      date={obj.date} // Дата создания карточки
                      time={obj.time} // Время создания карточки
                      photo={obj.photo} // Фото карточки
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </AppContext.Provider>
    </>
  )
}

export default App
