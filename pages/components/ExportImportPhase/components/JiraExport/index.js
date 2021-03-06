import styles from './styles.module.scss'
import { defaultData } from '../../../../../model/defaultData'
import { incrementTypes, getIncrementTypeLabel } from '../../../../../config/increments'

const JiraExport = ({ data = defaultData }) => {
  const getNeed = () => {
    return 'h2. Besoin\n\n' +
      '*ETQ* ' + data.need.as + '\n' +
      '*JS* ' + data.need.want + '\n' +
      '*AD* ' + data.need.to + '\n\n' +

      'h2. Solution fonctionnelle\n\n' +
      (data.solution || 'Néant') + '\n\n' +

      'h2. KPIs de succès\n\n' +
      (data.kpis || 'Néant') + '\n\n' +

      'h2. Assets\n\n' +
      (data.assets || 'Néant') + '\n\n'
  }

  const getIncrement = (increment) => {
    let incrementString = getNeed()

    if (increment.criterias.length > 0) {
      incrementString += getCriterias(increment.criterias)
    }
    if (increment.notes) {
      incrementString += 'h2. Notes\n\n' + increment.notes
    }

    return (
      <div className={styles.increment}>
        <h3>{data.title} : {getIncrementTypeLabel(increment.type)} (Ticket "Story increment")</h3>
        {increment.estimation > 0 && (<div><strong>Estimation</strong> : {increment.estimation}</div>)}
        {increment.estimation > 0 && (<div><strong>ROI</strong> : {parseInt(data.value / increment.estimation)}</div>)}
        {(increment.type !== 'release') && getChecklist(increment.checklist)}
        
        <textarea className="code" value={incrementString}></textarea>
      </div>
    )
  }

  const getSprintSuggestion = (checklist) => {
    if (checklist.d && checklist.e && checklist.t) {
      if (checklist.i) {
        return 'A placer dans "Ready for sprint"'
      } else {
        return 'A placer dans "Almost ready for sprint"'
      }
    }
    return 'Laisser dans "Ready for grooming"'
  }

  const getChecklist = (checklist) => {
    return (
      <div>
        <strong>
          {checklist.d ? 'D' : '-'}
          {checklist.i ? 'I' : '-'}
          {checklist.e ? 'E' : '-'}
          {checklist.t ? 'T' : '-'}
        </strong>
        {'-> ' + getSprintSuggestion(checklist)}
        <br />
      </div>
    )
  }

  const getCriterias = (criterias) => {
    const criteriaString = criterias.map(criteria => {
      return '{panel:title=' + criteria.title + '}\n' +
        criteria.gherkin +
        '\n{panel}\n\n'
    })

    return 'h2. Critères d\'acceptation\n\n'
      + criteriaString
  }

  return (
    <div>
      <h3>{data.title} (Ticket "Story")</h3>
      <p><strong>Valeur métier :</strong> {data.value}</p>
      <div className={styles.US}>
        <textarea className="code" readOnly value={getNeed()}>
        </textarea>
      </div>
      {data.increments.map(increment => getIncrement(increment))}
    </div>
  )
}

export default JiraExport
