import React from 'react'
import Statistic from './Statistic'

const Statistics = ({total, average, percentage, good, neutral, bad}) => {
        return (
            <div>
                <h1>statistics</h1>
                {total > 0 ? (
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <Statistic text="good" value={good} />
                                </tr>
                                <tr>
                                    <Statistic text="neutral" value={neutral} /> 
                                </tr>
                                <tr>
                                    <Statistic text="bad" value={bad} />
                                </tr>
                                <tr>
                                    <Statistic text="all" value={total} />
                                </tr>
                                <tr>
                                    <Statistic text="average" value={average} />
                                </tr>
                                <tr>
                                    <Statistic text="positive" value={percentage + ' %'} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No feedback given</p>
                )}
            </div>
        )
}

export default Statistics