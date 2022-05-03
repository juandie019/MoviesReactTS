import React from 'react';

//helpers
import { calcTime, convertMoney} from '../../helpers';
//styles
import { Wrapper, Content } from './MovieInfoBar.styles';

type Props = {
    time: number;
    budget: number;
    revenue: number;
}

const MovieInfoBar: React.FC<Props> = ({ time, budget, revenue} ) => (
    <Wrapper>
        <Content>
            <div className="column">
                <p>Running time: {calcTime(time)}</p>
            </div>
            <div className="column">
                <p>budget: {convertMoney(budget)}</p>
            </div>
            <div className="column">
                <p>Revemue: {convertMoney(revenue)}</p>
            </div>
        </Content>
    </Wrapper>
)

export default MovieInfoBar;