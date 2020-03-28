import React, { ReactElement } from 'react';
import { useTheme } from '@material-ui/core/styles';

interface SpacerProps {
  space?: number;
}

export default function Spacer(props: SpacerProps): ReactElement {
  const theme = useTheme();
  return <span style={{ margin: theme.spacing(props.space || 1) }} />;
}
