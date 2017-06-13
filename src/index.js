import $ from 'jquery';

import * as mathjaxHelper from './mathjaxHelper.js';
import { renderMath } from './mathjaxHelper.js';

import './index.css';

mathjaxHelper.init();
renderMath(document.getElementById('test'));
