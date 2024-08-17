import PropTypes from 'prop-types'
const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
  }
  return (
    <div onClick={props.holdDice} className='die-face' style={styles}>
      <h2 className='die-num'>{props.number}</h2>
    </div>
  )

}

Die.propTypes = {
  number: PropTypes.number.isRequired
};

export default Die
