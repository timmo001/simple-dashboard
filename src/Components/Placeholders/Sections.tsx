import { Section } from '../Sections/Sections';
import makeKey from '../../utils/makeKey';

export default function placeholderSections(): Section[] {
  return [
    {
      id: makeKey(16),
      alignItems: 'baseline',
      alignContent: 'flex-start',
      justify: 'center',
      size: 12,
      items: [
        {
          id: makeKey(16),
          size: 'auto',
          type: 'date',
          variant: 'h1',
          data: 'hh:mm',
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'spacer',
          space: 1,
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'date',
          variant: 'h3',
          data: 'a',
        },
        {
          id: makeKey(16),
          size: 12,
          type: 'date',
          textAlign: 'center',
          variant: 'h2',
          data: 'Do MMMM YYYY',
        },
      ],
    },
    {
      id: makeKey(16),
      alignItems: 'baseline',
      alignContent: 'flex-end',
      justify: 'flex-start',
      size: 6,
      items: [
        {
          id: makeKey(16),
          size: 3,
          type: 'text',
          variant: 'h4',
          data: 'Living Room',
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'text',
          variant: 'h2',
          data: '22.4',
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'text',
          variant: 'h4',
          alignSelf: 'flex-start',
          data: '°C',
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'spacer',
          space: 2,
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'text',
          variant: 'h2',
          data: '46',
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'spacer',
          space: 0.25,
        },
        {
          id: makeKey(16),
          size: 'auto',
          type: 'text',
          variant: 'h4',
          alignSelf: 'baseline',
          data: '%',
        },
      ],
    },
  ];
}
