import { Section } from './Sections/Sections';
import { HomeAssistantEntityProps } from './HomeAssistant/HomeAssistant';

export interface Configuration {
  sections: Section[];
}

export interface BaseProps extends HomeAssistantEntityProps {
  configuration: Configuration;
  editingConfiguration: boolean;
  handleUpdateConfiguration: (config: Configuration) => void;
}
