import styles from './styles.module.scss';

export default function Estimation() {
  return (
    <div className={styles.Estimation}>
      <label>Estimation</label>
      <select className="medium user_story_increment_estimation">
        <option>- Choisissez</option>
        <option>0.5</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>5</option>
        <option>8</option>
        <option>13</option>
        <option>21</option>
        <option>34</option>
      </select>
    </div>
  )
}