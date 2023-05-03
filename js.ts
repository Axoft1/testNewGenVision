class UserService {
  _userName: string;
  // делаем password приватным, он не должен быть доступен извне
  #password: string;
  constructor(username: string, password: string) {
    this._userName = username;
    this.#password = password;
  }
  get userName() {
    return this._userName;
  }
  //Нет необходимости в таком методе
  // get password() {
  //   throw error
  // }
  async authenticateUser() {
    //вывести основной URL и ошибки в константы
    const URL_API_USER = "https://examples.com/api/user";
    const STATUS_OK = 200;
    let rest = false;
    const user = { username: this._userName, password: this.#password };
    // Устаревший объект XMLHttpRequest заменяем на fetch
    fetch(
      // при запросе небходимо данные хешировать, использовать JWT токены и отправлять в куках
      `${URL_API_USER}/authenticate`,
      {
        method: "POST",
        // логин и пароль отправляем в теле запроса
        body: JSON.stringify(user),
      }
    )
      .then((res) => {
        // если запрос положительный, user авторизован, возвращаем true
        if (res.status === STATUS_OK) {
          rest = true;
        } else {
        // иначе возвращаем false
          return rest;
        }
      })
      // ловим ошибки и выводим в консоль
      .catch((e) => console.log(e));
      // на случай если что то пошло не так возвращаем false
    return rest;
  }
}
// с помощью библиотеки jQuery находим форму с кнопкой id login
// вешаем событие клик .on("click",)
$("#login").on("click", async function () {
// сохраняем в переменные значения из input с помощью .val()
  const username = $("#username").val() as string;
  const password = $("#password").val() as string;
  const res = await new UserService(username, password).authenticateUser();
  if (res) {
    // при положительном ответе переходим на главную страницу
    location.replace("/home");
  } else {
    // при отрицательном оповещаем об ошибке
    alert("error");
  }
});
