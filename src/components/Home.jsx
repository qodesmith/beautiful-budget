import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { changeColor } from 'actions'
import CurrencyInput from 'components/CurrencyInput'


const Home = ({ color, randomizeColor }) => (
  <Fragment>
    <header className='pv5 bg-gold black-80 tc'>
      <h1 className='mt0 mb1'>Create New App</h1>
      <div className='ttc'>by Qodesmith</div>
    </header>

    <div className="tc pt7">
      <CurrencyInput />
    </div>
  </Fragment>
)

const mapStateToProps = ({ home }) => home
const mapDispatchToProps = dispatch => ({
  randomizeColor: () => dispatch(changeColor())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
