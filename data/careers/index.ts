import { technologyCareers } from './technology';
import { medicalCareers } from './medical';
import { businessCareers } from './business';
import { creativeCareers } from './creative';
import { engineeringCareers } from './engineering';
import { scienceCareers } from './science';
import { lawCareers } from './law';
import { otherCareers } from './other';

export const allCareers = [
  ...technologyCareers,
  ...medicalCareers,
  ...businessCareers,
  ...creativeCareers,
  ...engineeringCareers,
  ...scienceCareers,
  ...lawCareers,
  ...otherCareers,
];

export {
  technologyCareers,
  medicalCareers,
  businessCareers,
  creativeCareers,
  engineeringCareers,
  scienceCareers,
  lawCareers,
  otherCareers,
};
