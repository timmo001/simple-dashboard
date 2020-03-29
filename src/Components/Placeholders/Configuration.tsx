import { Configuration } from '../Types';
import sections from './Sections';

export default function placeholderConfiguration(): Configuration {
  return {
    sections: sections(),
  };
}
