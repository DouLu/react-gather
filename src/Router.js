import Home from './pages/home';
import DragDemo from './pages/dnd';
import Upload from './components/Upload';
import KnowPlant from './pages/plant';
import CSS from './components/CSS';

export const routerConfig = [
  {
    path: '/home',
    title: 'home',
    content: Home,
    iconType: 'user'
  },
  {
    path: '/weather',
    title: 'weather',
    content: DragDemo,
    iconType: 'upload'
  },
  {
    path: '/upload',
    title: 'upload',
    content: Upload,
    iconType: 'upload'
  },
  {
    path: '/plant',
    title: 'plant',
    content: KnowPlant,
    iconType: 'upload'
  },
  {
    path: '/css',
    title: 'css',
    content: CSS,
    iconType: 'user'
  },
];