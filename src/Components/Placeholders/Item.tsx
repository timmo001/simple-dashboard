import { Item } from '../Sections/Items';
import makeKey from '../../utils/makeKey';

export default function placeholderItem(): Item {
  return {
    id: makeKey(16),
    type: 'text',
    variant: 'h4',
    alignSelf: 'flex-start',
    size: 'auto',
    textAlign: 'start',
    data: 'Text',
  };
}
