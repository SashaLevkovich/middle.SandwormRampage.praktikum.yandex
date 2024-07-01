import classes from 'pages/errors/Errors.module.scss'

export const TestSSR = () => {
  return (
    <div className={classes.root}>
      <div className={classes.title}>Статическая страница для теста SSR</div>
      <div className={classes.text}>
        Роутер и Редакс будут настраиваться в рамках другой задачи
      </div>
    </div>
  )
}
