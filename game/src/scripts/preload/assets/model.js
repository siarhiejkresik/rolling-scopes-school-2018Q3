import sheet_face from '../../../assets/data/model/sheet_face.png';
import sheet_hair from '../../../assets/data/model/sheet_hair.png';
import sheet_pants from '../../../assets/data/model/sheet_pants.png';
import sheet_shirts from '../../../assets/data/model/sheet_shirts.png';
import sheet_shoes from '../../../assets/data/model/sheet_shoes.png';
import sheet_skin from '../../../assets/data/model/sheet_skin.png';

import loaders from '../loaders/index.js';

export default {
  files: {
    'sheet_face.png': sheet_face,
    'sheet_hair.png': sheet_hair,
    'sheet_pants.png': sheet_pants,
    'sheet_shirts.png': sheet_shirts,
    'sheet_shoes.png': sheet_shoes,
    'sheet_skin.png': sheet_skin
  },
  loader: loaders.image
};
