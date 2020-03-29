import { Section } from '../Sections/Sections';

export default function placeholderSections(): Section[] {
  return [
    {
      alignItems: 'baseline',
      alignContent: 'flex-start',
      justify: 'center',
      size: 12,
      items: [
        {
          size: 'auto',
          type: 'date',
          variant: 'h1',
          data: 'hh:mm',
        },
        {
          size: 'auto',
          type: 'spacer',
          space: 1,
        },
        {
          size: 'auto',
          type: 'date',
          variant: 'h3',
          data: 'a',
        },
        {
          size: 12,
          type: 'date',
          textAlign: 'center',
          variant: 'h2',
          data: 'Do MMMM YYYY',
        },
      ],
    },
    {
      alignItems: 'baseline',
      alignContent: 'flex-end',
      justify: 'flex-start',
      size: 6,
      items: [
        {
          size: 3,
          type: 'text',
          variant: 'h4',
          data: 'Living Room',
        },
        {
          size: 'auto',
          type: 'text',
          variant: 'h2',
          data: '22.4',
        },
        {
          size: 'auto',
          type: 'text',
          variant: 'h4',
          alignSelf: 'flex-start',
          data: '°C',
        },
        {
          size: 'auto',
          type: 'spacer',
          space: 2,
        },
        {
          size: 'auto',
          type: 'text',
          variant: 'h2',
          data: '46',
        },
        {
          size: 'auto',
          type: 'spacer',
          space: 0.25,
        },
        {
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
