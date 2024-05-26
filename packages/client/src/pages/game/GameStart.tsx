import { FC } from 'react'
import classes from './GameStart.module.scss'
import linesImg from '../../shared/assets/images/Lines.svg'
import moonsImg from '../../shared/assets/images/Moons.svg'

export const GameStart: FC = () => {
  return (
    <div className={classes.startPageWrapper}>
      <div className={classes.absoluteWrapper}>
        <div className={classes.blackCircle} />
        <div className={classes.orangeCircle} />
        <div className={classes.orangeCircleThin} />
        <div className={classes.orangeCircleThinBig} />
        <img className={classes.lines} src={linesImg} alt="pattern" />
        <img className={classes.moons} src={moonsImg} alt="moons" />
      </div>
      <a className={classes.start}>Start</a>
    </div>
  )
}