import { Section } from '../Sections/Sections';
import makeKey from '../../utils/makeKey';

export default function placeholderSection(): Section {
  return {
    id: makeKey(16),
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justify: 'flex-start',
    size: 6,
    items: [],
  };
}
