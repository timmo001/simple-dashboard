import React, { ReactElement } from 'react';
import { useTheme } from '@material-ui/core/styles';

interface SpacerProps {
  spaceHigh?: number;
  spaceWide?: number;
}

export default function Spacer(props: SpacerProps): ReactElement {
  const { spaceHigh, spaceWide } = props;

  const theme = useTheme();
  return (
    <span
      style={{
        margin: theme.spacing(spaceHigh || 1, spaceWide || 1),
      }}
    />
  );
}
