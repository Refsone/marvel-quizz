import React, { useEffect, useState } from 'react'
import Stepper from 'react-stepper-horizontal'

const Levels = ({levelNames, quizLevel}) => {

    const [level, setLevel] = useState([])

    useEffect(() => {
        const quizSteps = levelNames.map(level => ({title: level.toUpperCase()}))
        setLevel(quizSteps)
    }, [levelNames])

    return (
        <div className="levelsContainer" style={{background: 'transparent'}}>
                <Stepper 
                steps={ level } 
                activeStep={quizLevel} 
                circleTop={0}
                activeTitleColor={'#d31017'}
                activeColor={'#d31017'}
                completeTitleColor={'#E0E0E0'}
                defaultTitleColor={'#E0E0E0'}
                completeColor={'#E0E0E0'}
                completeBarColor={'#E0E0E0'}
                barStyle={'dashed'}
                size={50}
                circleFontSize={20}
                />
        </div>
    )
}

export default React.memo(Levels)
 