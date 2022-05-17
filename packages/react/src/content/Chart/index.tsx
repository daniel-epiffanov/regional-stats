import { FC } from 'react'
import styles from './styles/index.module.scss'
import { useCurValuesContext } from '../context/curValuesContext';
import Message from '../../components/Message';
import {
  Chart as DxChart,
  Series,
  ArgumentAxis,
  Legend,
  Label,
} from 'devextreme-react/chart';

type Props = Readonly<{

}>

const values = [47.27, 65.32, 84.59, 71.86];

const format = {
type: 'fixedPoint',
precision: 1,
};

const Chart: FC<Props> = () => {
	const {curStatData} = useCurValuesContext()


	if(!curStatData) return <>yo</>
	//<Message type='message' text="Please, choose a region on the map"/>

	// const curRegion = curStatData['Рязанская область']

	const values = curStatData['Рязанская область'].yearValues.map(yearValues=>yearValues.value)
	console.log({values})

	


	return (
		<div className={styles['root']}>
		 <DxChart
          // id="chart"
          dataSource={curStatData['Рязанская область'].yearValues}
          title="Population by Countries"
					size={{
						height: 200,
						width: 500
					}}
        >
          <Series
					argumentField="year"
					 valueField="value"
					/>
          <ArgumentAxis>
            <Label
              wordWrap="none"
              // overlappingBehavior={this.state.currentMode}
            />
          </ArgumentAxis>
          <Legend visible={false} />
        </DxChart>
		</div>
	)
}

export default Chart
