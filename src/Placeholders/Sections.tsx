import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { Section } from '../Sections/Sections';
import Degree from '../Generic/Degree';
import Percent from '../Generic/Percent';
import Spacer from '../Generic/Spacer';

export default function Sections(): Section[] {
  return [
    {
      alignItems: 'center',
      alignContent: 'flex-start',
      justify: 'flex-start',
      size: 12,
      items: [
        {
          size: 12,
          data: (
            <Box textAlign="center">
              <Typography variant="h1" component="span">
                {moment().format('hh:mm')}
              </Typography>
              <Spacer space={0.5} />
              <Typography variant="h3" component="span">
                {moment().format('a')}
              </Typography>
              <Spacer />
            </Box>
          ),
        },
        {
          size: 12,
          data: (
            <Box textAlign="center">
              <Typography variant="h2" component="span">
                {moment().format('Do MMMM YYYY')}
              </Typography>
            </Box>
          ),
        },
      ],
    },
    {
      alignItems: 'flex-end',
      alignContent: 'flex-end',
      justify: 'flex-start',
      size: 6,
      items: [
        {
          data: (
            <Typography variant="h4" component="span">
              Living Room
            </Typography>
          ),
          size: 3,
        },
        {
          data: (
            <Box>
              <Typography variant="h2" component="span">
                22.4
              </Typography>
              <Spacer space={0.25} />
              <Degree />
              <Spacer space={2} />
              <Typography variant="h2" component="span">
                46
              </Typography>
              <Spacer space={0.25} />
              <Percent />
            </Box>
          ),
          size: 9,
        },
        {
          data: (
            <Typography variant="h4" component="span">
              Kitchen
            </Typography>
          ),
          size: 3,
        },
        {
          data: (
            <Box>
              <Typography variant="h2" component="span">
                21.6
              </Typography>
              <Spacer space={0.25} />
              <Degree />
              <Spacer space={2} />
              <Typography variant="h2" component="span">
                54
              </Typography>
              <Spacer space={0.25} />
              <Percent />
            </Box>
          ),
          size: 9,
        },
        {
          data: (
            <Typography variant="h4" component="span">
              Outside
            </Typography>
          ),
          size: 3,
        },
        {
          data: (
            <Box>
              <Typography variant="h2" component="span">
                10.2
              </Typography>
              <Spacer space={0.25} />
              <Degree />
              <Spacer space={2} />
              <Typography variant="h2" component="span">
                46
              </Typography>
              <Spacer space={0.25} />
              <Percent />
            </Box>
          ),
          size: true,
        },
      ],
    },
  ];
}
