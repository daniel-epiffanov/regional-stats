import { FC } from 'react';
import List, { Props as ListProps } from '../../../dxComponents/List';

type Props = ListProps

const ListWithIcon: FC<Props> = ({ items, valueChangeHandler }) => (
  <>
    <i className="dx-icon-chevronright" data-testid="dx-icon-chevronright" />
    <List
      items={items}
      valueChangeHandler={valueChangeHandler}
    />
  </>
);

export default ListWithIcon;
